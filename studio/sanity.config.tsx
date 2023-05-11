import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {codeInput} from '@sanity/code-input'
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
      fieldTypes: ['string', 'text'],
    }),
    languageFilter({
      supportedLanguages: i18n.languages,
      defaultLanguages: [i18n.base],
      documentTypes: [`presenter`, `course`, `labelGroup`],
      filterField: (enclosingType: any, field: any, selectedLanguageIds: any) =>
        !enclosingType.name.startsWith('localized') || selectedLanguageIds.includes(field.name),
    }),
    googleTranslate(),
    visionTool(),
    codeInput(),
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
  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

    if (isAdmin) {
      return prev
    }

    return prev.filter((tool) => tool.name !== 'vision')
  },
})
