import {createClient, SanityClient} from 'next-sanity'
import {cache} from 'react'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || '6h1mv88x'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET! || 'production-v3'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION! || '2023-06-01'

const getStudioUrl = () => {
  if (process.env.NODE_ENV !== 'production') {
    return `http://localhost:3333`
  }

  let webUrl = `https://demo-course-platform-studio.sanity.build`

  console.log(`VERCEL`, process.env.VERCEL)
  console.log(`VERCEL_ENV`, process.env.VERCEL_ENV)
  console.log(`VERCEL_URL`, process.env.VERCEL_URL)
  console.log(`VERCEL_BRANCH_URL`, process.env.VERCEL_BRANCH_URL)

  if (process.env.VERCEL) {
    // Web (this) URL: https://demo-course-platform.sanity.build/
    // Studio URL:     https://demo-course-platform-studio.sanity.build/
    webUrl =
      process.env.VERCEL_ENV === 'production'
        ? process.env.VERCEL_URL!
        : process.env.VERCEL_BRANCH_URL!

    webUrl = webUrl.replace('-platform', '-platform-studio')

    return `https://${webUrl}`
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

const sourceMapConfig = {
  studioUrl: getStudioUrl(),
  encodeSourceMap: process.env.VERCEL
    ? process.env.VERCEL_ENV !== 'production'
    : process.env.NODE_ENV !== 'production',
  // logger: console,
  encodeSourceMapAtPath: handleEncodeSourceMap,
}

export const baseConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  // "as const" satisfies `createClient` below
  perspective: 'published' as const,
  ...sourceMapConfig,
}

export const client = createClient(baseConfig)

export const previewClient = createClient({
  ...baseConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
  ...sourceMapConfig,
  encodeSourceMap: true,
})

export function getClient({preview}: {preview?: {token: string}}): SanityClient {
  const client = createClient(baseConfig)
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
    })
  }
  return client
}

export const cachedClientFetch = (preview = false) =>
  preview ? cache(previewClient.fetch.bind(client)) : cache(client.fetch.bind(client))
