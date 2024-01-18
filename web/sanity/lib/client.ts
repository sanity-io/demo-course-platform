import {createClient} from '@sanity/client/stega'

import {apiVersion, dataset, projectId} from '../env'

export const baseConfig = {
  apiVersion,
  dataset,
  projectId,
}

// URL to the Studio from this front end build
const studioUrl = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? `https://${
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL?.replace(
            'demo-course-platform',
            'demo-course-platform-studio'
          )
    }`
  : 'http://localhost:3333'

console.log({studioUrl})

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true,
  // These settings will be overridden in
  // ./sanity/lib/store.ts when draftMode is enabled
  perspective: 'published',
  stega: {
    enabled: true,
    studioUrl,
  },
})
