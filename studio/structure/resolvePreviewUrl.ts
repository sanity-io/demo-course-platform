import {SanityClient} from '@sanity/client'
import {SanityDocument} from 'sanity'

import {getSecret, SECRET_ID} from './getSecret'

export default async function resolvePreviewUrl(doc: SanityDocument, client: SanityClient) {
  let baseUrl = `http://localhost:3000`

  // Use public vars because Studio is all client-side
  if (process.env.SANITY_STUDIO_VERCEL_ENV) {
    // This is the URL of the Studio deployment, not the web deployment
    baseUrl = `https://${
      process.env.SANITY_STUDIO_VERCEL_ENV === 'production'
        ? process.env.SANITY_STUDIO_VERCEL_URL
        : process.env.SANITY_STUDIO_VERCEL_BRANCH_URL
    }`

    // Remove `-studio` from the URL origin
    baseUrl = baseUrl.replace(`-studio.`, ``)
  }

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
