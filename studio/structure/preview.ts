import {SanityDocumentLike} from 'sanity'
import Iframe, {IframeOptions} from 'sanity-plugin-iframe-pane'
import {StructureBuilder} from 'sanity/desk'
import {SanityClient} from 'sanity/lib/dts/src/datastores'

import resolveProductionUrl from './resolveProductionUrl'

const getOptions = (client: any): IframeOptions => ({
  url: (doc: SanityDocumentLike) => resolveProductionUrl(doc, client),
  reload: {button: true},
})

export default (S: StructureBuilder, client: SanityClient) =>
  S.view.component(Iframe).options(getOptions(client)).title('Preview')
