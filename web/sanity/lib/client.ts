import {createClient} from '@sanity/client/stega'

import {apiVersion, dataset, projectId} from '../env'

export const baseConfig = {
  apiVersion,
  dataset,
  projectId,
}

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
    studioUrl: process.env.VERCEL
      ? `https://${process.env.VERCEL_BRANCH_URL?.replace(
          'demo-course-platform',
          'demo-course-platform-studio'
        )}`
      : 'http://localhost:3333',
  },
})
