import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {codeInput} from '@sanity/code-input'

import {structure, defaultDocumentNode} from './structure'
import {schemaTypes} from './schemas'

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
  ],

  schema: {
    types: schemaTypes,
  },
})
