import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'

import resolveProductionUrl from '../resolveProductionUrl'

export const preview = S.view
  .component(Iframe)
  .options({
    url: (doc) => resolveProductionUrl(doc),
    reload: {button: true},
  })
  .title('Preview')

export default preview
