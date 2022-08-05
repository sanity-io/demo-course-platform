import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {codeInput} from '@sanity/code-input'
import {documentI18n} from '@sanity/document-internationalization'
import {languageFilter} from 'sanity-plugin-language-filter'

import {structure, defaultDocumentNode} from './structure'
import {schemaTypes} from './schemas'
import {i18n} from '../languages'

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
    languageFilter({
      languages: i18n.languages,
      schemaTypes: ['course'],
      parentFieldNameStartsWith: `localized`,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
