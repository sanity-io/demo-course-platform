import {SanityClient} from '@sanity/client'
import {SanityDocumentLike} from 'sanity'

// URL of the Next.js website
const remoteUrl =
  import.meta.env.SANITY_STUDIO_PREVIEW_URL ?? `https://demo-course-platform.sanity.build`
const localUrl = `http://localhost:3000`

type DocWithSlug = SanityDocumentLike & {
  slug?: any
  language?: string
}

export default async function resolveProductionUrl(doc: DocWithSlug, client: SanityClient) {
  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

  const {_id} = doc

  const previewUrl = new URL(`${baseUrl}/api/preview`)

  if (_id) {
    previewUrl.searchParams.set(`id`, _id.replace(`drafts.`, ``))
  }

  return previewUrl.toString()
}
