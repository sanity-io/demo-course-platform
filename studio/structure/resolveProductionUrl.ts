import {SanityClient} from '@sanity/client'
import {SanityDocumentLike} from 'sanity'

// URL of the Next.js website
export const WEBSITE_URL_DEV = 'http://localhost:3000'
// export const WEBSITE_URL_PROD = "https://demo-course-platform.sanity.build";
export const WEBSITE_URL_PROD = 'https://demo-course-platform-git-seo-pane.sanity.build'

type DocWithSlug = SanityDocumentLike & {
  slug?: any
  language?: string
}

export default async function resolveProductionUrl(doc: DocWithSlug, client: SanityClient) {
  const baseUrl = window.location.hostname === 'localhost' ? WEBSITE_URL_DEV : WEBSITE_URL_PROD

  const {_id} = doc

  const previewUrl = new URL(`${baseUrl}/api/preview`)

  if (_id) {
    previewUrl.searchParams.set(`id`, _id)
  }

  return previewUrl.toString()
}
