import {definePlugin} from 'sanity'

import {deskTableTool} from './tools/deskTableTool'

export default definePlugin({
  name: 'sanity-plugin-desk-table',
  tools: [deskTableTool({})],
})
