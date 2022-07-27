import Iframe, {IframeOptions} from 'sanity-plugin-iframe-pane'
import {StructureBuilder} from 'sanity/desk'

import resolveProductionUrl from './resolveProductionUrl'

const options: IframeOptions = {
  // url: (doc: SanityDocumentLike) => resolveProductionUrl(doc),
  url: `http://usehooks-ts.com`,
  defaultSize: 'mobile',
  reload: {button: true},
}

export default (S: StructureBuilder) => S.view.component(Iframe).options(options).title('Preview')
