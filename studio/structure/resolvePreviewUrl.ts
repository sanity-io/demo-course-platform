import {SanityClient} from '@sanity/client'
import {SanityDocument} from 'sanity'

import {getSecret, SECRET_ID} from './getSecret'

export default async function resolvePreviewUrl(doc: SanityDocument, client: SanityClient) {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000`
      : `https://demo-course-platform-git-next-13.sanity.build`

  const {_id} = doc

  const previewUrl = new URL(`/api/preview`, baseUrl)

  if (_id) {
    previewUrl.searchParams.set(`id`, _id.replace(`drafts.`, ``))
  }

  const secret = await getSecret(client, SECRET_ID, true)

  if (secret) {
    previewUrl.searchParams.set('secret', secret)
  }

  return previewUrl.toString()
}
