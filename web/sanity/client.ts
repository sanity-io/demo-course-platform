import {createClient, SanityClient} from 'next-sanity'
import {cache} from 'react'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6h1mv88x'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production-v3'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-01-01'

export const config = {
  projectId,
  dataset,
  apiVersion: 'X',
  useCdn: process.env.NODE_ENV === 'production',
  // perspective: 'published',
}

export const client = createClient(config)

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
})

export function getClient({preview}: {preview?: {token: string}}): SanityClient {
  const client = createClient(config)
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
