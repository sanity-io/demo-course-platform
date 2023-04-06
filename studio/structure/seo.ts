import {SanityClient, SanityDocumentLike} from 'sanity'
import {StructureBuilder} from 'sanity/desk'
import {SEOPane} from 'sanity-plugin-seo-pane'

import resolveProductionUrl from './resolveProductionUrl'

const getOptions = (client: any): any => ({
  url: (doc: SanityDocumentLike) => resolveProductionUrl(doc, client),
  keywords: `seo.keywords`,
  synonyms: `seo.synonyms`,
})

export default (S: StructureBuilder, client: SanityClient) =>
  S.view.component(SEOPane).options(getOptions(client)).title('SEO')
