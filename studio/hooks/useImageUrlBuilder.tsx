import createImageUrlBuilder from '@sanity/image-url'
import {useMemo} from 'react'
import type {ImageUrlBuilder, SourceClientOptions} from 'sanity'
import {useClient} from 'sanity'

export function useImageUrlBuilder(clientOptions?: SourceClientOptions): ImageUrlBuilder | null {
  const client = useClient(clientOptions)
  const builder = useMemo(() => createImageUrlBuilder(client), [client])

  return builder
}
