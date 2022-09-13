import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {codeInput} from '@sanity/code-input'
import {
  // documentI18n,
  documentInternationalization,
} from '@sanity/document-internationalization'
// import {languageFilter} from '@sanity/language-filter'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

import {structure, defaultDocumentNode} from './structure'
import {schemaTypes} from './schemas'
import {i18n} from '../languages'
import {schemaVizualizer} from './tools/schemaVisualizer'

export default createConfig({
  name: 'default',
  title: 'Course Platform',

  projectId: '6h1mv88x',
  dataset: 'production-v3',

  plugins: [
    codeInput(),
    // v0 Plugin
    // documentI18n({
    //   languages: i18n.languages,
    // }),
    // v1 Plugin
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: [`lesson`],
      // languageField: `__i18n_lang`,
    }),
    internationalizedArray({
      languages: i18n.languages,
      fieldTypes: ['string', 'text'],
    }),
    // languageFilter({
    //   supportedLanguages: i18n.languages,
    //   defaultLanguages: [i18n.base],
    //   documentTypes: [`presenter`, `course`, `labelGroup`],
    //   filterField: (enclosingType: any, field: any, selectedLanguageIds: any) =>
    //     !enclosingType.name.startsWith('localized') || selectedLanguageIds.includes(field.name),
    // }),
    deskTool({
      structure,
      defaultDocumentNode,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  tools: (all) => [...all, schemaVizualizer()],
})
