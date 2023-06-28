import {SanityClient} from '@sanity/client'
import {SanityDocument} from 'sanity'

import {getSecret, SECRET_ID} from './getSecret'

export default async function resolvePreviewUrl(doc: SanityDocument, client: SanityClient) {
  let baseUrl = `http://localhost:3000`

  // Use public vars because Studio is all client-side
  if (process.env.SANITY_STUDIO_VERCEL_ENV) {
    // This is the URL of the Studio deployment, not the web deployment
    baseUrl =
      process.env.SANITY_STUDIO_VERCEL_ENV === 'production'
        ? `https://demo-course-platform.sanity.build`
        : // This should work, but doesn't
          // the env seems to be `undefined` in vercel
          // : process.env.SANITY_STUDIO_VERCEL_BRANCH_URL
          // So I'm DIY-ing a branch URL for the web deployment
          `https://demo-course-platform-git-${process.env.SANITY_STUDIO_VERCEL_GIT_COMMIT_REF}.sanity.build`
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
