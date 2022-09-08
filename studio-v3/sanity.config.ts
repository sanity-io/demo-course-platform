import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {codeInput} from '@sanity/code-input'
import {documentI18n} from '@sanity/document-internationalization'
import {languageFilter} from '@sanity/language-filter'

import {structure, defaultDocumentNode} from './structure'
import {schemaTypes} from './schemas'
import {i18n} from '../languages'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {schemaVizualizer} from './tools/schemaVisualizer'

export default createConfig({
  name: 'default',
  title: 'Course Platform',

  projectId: '6h1mv88x',
  dataset: 'production',

  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    codeInput(),
    documentI18n({
      languages: i18n.languages,
    }),
    internationalizedArray({}),
    languageFilter({
      supportedLanguages: i18n.languages,
      defaultLanguages: [i18n.base],
      documentTypes: [`presenter`, `course`, `labelGroup`],
      filterField: (enclosingType: any, field: any, selectedLanguageIds: any) =>
        !enclosingType.name.startsWith('localized') || selectedLanguageIds.includes(field.name),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  tools: (all) => [schemaVizualizer(), ...all],
})
