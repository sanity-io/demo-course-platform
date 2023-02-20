import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {codeInput} from '@sanity/code-input'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {languageFilter} from '@sanity/language-filter'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

import {structure, defaultDocumentNode} from './structure'
import {schemaTypes} from './schemas'
import {i18n} from '../languages'
import {schemaVizualizer} from './tools/schemaVisualizer'

export default defineConfig({
  name: 'default',
  title: 'Course Platform',

  projectId: '6h1mv88x',
  dataset: 'production-v3',

  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    codeInput(),
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
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  tools: (all) => [...all, schemaVizualizer()],
})
