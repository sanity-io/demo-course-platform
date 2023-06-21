'use client'

import {Slot} from '@radix-ui/react-slot'
import {QueryParams} from '@sanity/client'
import {useLiveQuery} from '@sanity/preview-kit'
import {PropsWithChildren} from 'react'

// T default to any
type PreviewWrapperProps<T> = PropsWithChildren<{
  preview?: boolean
  initialData: T
  query: string | null
  params: QueryParams | null
}>

// Suspense boundary prevents useLiveQuery from running on the server
// Component just renders children if preview mode is not enabled
export function PreviewWrapper<T>(props: PreviewWrapperProps<T>) {
  const {
    // Is preview mode active?
    preview = false,
    // If so, listen to this query
    query = null,
    // With these params
    params = {},
    // Separate remaining props to pass to the child
    ...rest
  } = props

  return !preview || !query ? (
    // Render child, with the wrapper's initial data and props
    <Slot {...rest} />
  ) : (
    <PreviewData<typeof props.initialData>
      initialData={props.initialData}
      query={query}
      params={params ?? {}}
    >
      {props.children}
    </PreviewData>
  )
}

type PreviewDataProps<T = any> = PropsWithChildren<{
  initialData: T
  query: string
  params: QueryParams
}>

// Browser-only preview component
function PreviewData<T = any>(props: PreviewDataProps<T>) {
  const {initialData, query, params = {}, ...rest} = props
  const [data] = useLiveQuery(initialData, query, params)

  const previewProps = {...rest, data}

  return <Slot {...previewProps} />
}
