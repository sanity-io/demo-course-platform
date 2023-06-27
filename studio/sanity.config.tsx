import {defineConfig, isKeyedObject} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {languageFilter} from '@sanity/language-filter'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {schemaVisualizer} from 'sanity-plugin-schema-visualizer'
import {googleTranslate} from 'sanity-plugin-google-translate'
// @ts-ignore
import {theme} from 'https://themer.sanity.build/api/hues?preset=tw-cyan&positive=lightest:eefdf5&caution=lightest:fefbea&critical=lightest:fdf2f2&lightest=ffffff'

import {structure, defaultDocumentNode} from './structure'
import {schemaTypes} from './schemas'
import {i18n} from '../languages'
import Logo from './components/Logo'
import {vercelWidget} from 'sanity-plugin-dashboard-widget-vercel'
import {dashboardTool} from '@sanity/dashboard'

export default defineConfig({
  name: 'default',
  title: 'Course Platform',
  theme,
  projectId: '6h1mv88x',
  dataset: 'production-v3',

  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: ['lesson'],
    }),
    internationalizedArray({
      languages: i18n.languages,
      defaultLanguages: [i18n.base],
      fieldTypes: ['string', 'text'],
    }),
    languageFilter({
      supportedLanguages: i18n.languages,
      defaultLanguages: [i18n.base],
      documentTypes: [`presenter`, `course`, `labelGroup`],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        // Filter internationalized arrays
        if (
          enclosingType.jsonType === 'object' &&
          enclosingType.name.startsWith('internationalizedArray') &&
          'kind' in member
        ) {
          const language = isKeyedObject(member.field.path[1]) ? member.field.path[1]._key : null

          return language ? selectedLanguageIds.includes(language) : false
        }

        // Filter internationalized objects
        // `localeString` must be registered as a custom schema type
        if (enclosingType.jsonType === 'object' && enclosingType.name.startsWith('locale')) {
          return selectedLanguageIds.includes(member.name)
        }

        return true
      },
    }),
    dashboardTool({
      widgets: [vercelWidget()],
    }),
    googleTranslate(),
    visionTool(),
    schemaVisualizer({
      defaultSchemaTypes: ['course', 'lesson', 'presenter'],
      hiddenSchemaTypes: ['translation.metadata'],
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => {
      const prevFiltered = prev.filter((template) => template.id !== 'lesson')

      return [
        ...prevFiltered,
        {
          id: 'lesson-language',
          title: 'Lesson with Language',
          schemaType: 'lesson',
          parameters: [{name: 'language', type: 'string'}],
          value: (params: {language: string}) => ({
            language: params.language,
          }),
        },
      ]
    },
  },
  studio: {
    components: {
      logo: () => <Logo />,
    },
  },
  form: {
    components: {
      field: (props) => {
        // if (props.path.length === 1) {
        //   return (
        //     <div style={{border: '1px solid red', padding: 30}}>{props.renderDefault(props)}</div>
        //   )
        // }

        return props.renderDefault(props)
      },
    },
  },
  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

    if (isAdmin) {
      return prev
    }

    return prev.filter((tool) => tool.name !== 'vision')
  },
})
