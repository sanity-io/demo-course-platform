import {defineConfig, isKeyedObject} from 'sanity'
import {structureTool} from 'sanity/structure'
import {assist} from '@sanity/assist'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {documentInternationalization} from '@sanity/document-internationalization'
import {languageFilter} from '@sanity/language-filter'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {schemaVisualizer} from 'sanity-plugin-schema-visualizer'
import {googleTranslate} from 'sanity-plugin-google-translate'

import {structure, defaultDocumentNode} from './structure'
import {schemaTypes} from './schemas'
import {i18n} from '../languages'
import Logo from './components/Logo'
import {enableUrl, locate} from './presentation'

export default defineConfig({
  name: 'default',
  title: 'Course Platform',
  projectId: '6h1mv88x',
  dataset: 'production-v3',

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: enableUrl,
        },
      },
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
    googleTranslate(),
    visionTool(),
    schemaVisualizer({
      defaultSchemaTypes: ['course', 'lesson', 'presenter'],
      hiddenSchemaTypes: ['translation.metadata'],
    }),
    assist({
      translate: {
        field: {
          documentTypes: ['presenter'],
          languages: i18n.languages,
        },
      },
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
