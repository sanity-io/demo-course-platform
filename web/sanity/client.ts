// Using Client from preview-kit for source map support
import type {SanityClient} from '@sanity/preview-kit/client'
import {createClient} from '@sanity/preview-kit/client'
import {cache} from 'react'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!

const isVercelNonProduction = () => process.env.VERCEL && process.env.VERCEL_ENV !== 'production'
const isNetlifyNonProduction = () => process.env.NETLIFY && process.env.CONTEXT !== 'production'
const isLocalDevelopment = () =>
  !process.env.VERCEL && !process.env.NETLIFY && process.env.NODE_ENV !== 'production'

const getStudioUrl = () => {
  let webUrl = `https://demo-course-platform-studio.sanity.build`

  if (process.env.VERCEL) {
    return webUrl
  } else if (process.env.NETLIFY) {
    return webUrl
  } else if (isLocalDevelopment()) {
    return `http://localhost:3333`
  }

  return webUrl
}

const handleEncodeSourceMap = (props) => {
  // Remove source map for label key values
  if (props.path[0] === 'labels' && props.path[2] === 'key') {
    return false
  }

  // Internationalized object slugs need to be ignored
  if (props.path[0] === 'slug' && props.path.includes('current')) {
    return false
  }

  if (props.path.length === 1 && props.path[0] === 'language') {
    return false
  }

  return props.filterDefault(props)
}

export const baseConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  // "as const" satisfies `createClient`
  perspective: 'published' as const,
  encodeSourceMap: isVercelNonProduction() || isNetlifyNonProduction() || isLocalDevelopment(),
  encodeSourceMapAtPath: handleEncodeSourceMap,
  studioUrl: getStudioUrl(),
}

export const client = createClient(baseConfig)

export const cleanClient = createClient({
  ...baseConfig,
  encodeSourceMap: false,
})

export const previewClient = createClient({
  ...baseConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  ignoreBrowserTokenWarning: true,
  perspective: 'previewDrafts',
})

export function getClient({preview}: {preview?: {token: string}}): SanityClient {
  const client = createClient(baseConfig)
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return previewClient
  }
  return client
}

export const cachedClientFetch = (preview = false) =>
  preview ? cache(previewClient.fetch.bind(previewClient)) : cache(client.fetch.bind(client))
