// ./components/LiveQueryWrapper.tsx

import {Slot} from '@radix-ui/react-slot'
import {QueryParams} from '@sanity/client'
import {QueryResponseInitial} from '@sanity/react-loader'
import {PropsWithChildren} from 'react'

import {LiveQueryData} from '@/components/LiveQueryData'

type PreviewWrapperProps<T> = PropsWithChildren<{
  initial: QueryResponseInitial<T>
  isEnabled?: boolean
  query?: string
  params?: QueryParams
}>

// Component just renders its children if preview mode is not enabled
export function LiveQueryWrapper<T>(props: PreviewWrapperProps<T>) {
  const {
    // Is live query mode active?
    isEnabled = false,
    // If so, listen to this query
    query = null,
    // With these params
    params = {},
    // Separate remaining props to pass to the child
    ...rest
  } = props

  // Render child, with the wrapper's initial data and props
  if (!isEnabled || !query) {
    const nonPreviewProps = {...rest, data: props.initial.data}

    return <Slot {...nonPreviewProps} />
  }

  // Swap initialData for live data
  return (
    <LiveQueryData<typeof props.initial.data> initial={props.initial} query={query} params={params}>
      {props.children}
    </LiveQueryData>
  )
}
