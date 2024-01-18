import {createClient} from '@sanity/client/stega'

import {apiVersion, dataset, projectId} from '../env'

export const baseConfig = {
  apiVersion,
  dataset,
  projectId,
}

// URL for the Studio from this front end build
const studioUrl = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? `https://${
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? 'demo-course-platform-studio.sanity.build' // I don't understand why the primary domain doesn't have a variable
        : process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL?.replace(
            'demo-course-platform',
            'demo-course-platform-studio'
          )
    }`
  : 'http://localhost:3333'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true,
  // These settings will be overridden in
  // ./sanity/lib/store.ts when draftMode is enabled
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl,
  },
})
