import {SanityClient, SanityDocument} from 'sanity'
import Iframe from 'sanity-plugin-iframe-pane'
import {StructureBuilder} from 'sanity/structure'

import resolvePreviewUrl from './resolvePreviewUrl'

export default (S: StructureBuilder, client: SanityClient) =>
  S.view
    .component(Iframe)
    .options({
      url: (doc: SanityDocument) => resolvePreviewUrl(doc, client),
      reload: {button: true},
    })
    .title('Preview')
