// ./components/LiveQueryData.tsx

'use client'

import {Slot} from '@radix-ui/react-slot'
import {QueryParams} from '@sanity/client'
import {QueryResponseInitial, useQuery} from '@sanity/react-loader'
import {PropsWithChildren} from 'react'

type PreviewDataProps<T = any> = PropsWithChildren<{
  initial: QueryResponseInitial<T>
  query: string
  params: QueryParams
}>

// Browser-only preview component
export function LiveQueryData<T = any>(props: PreviewDataProps<T>) {
  const {initial, query, params = {}, ...rest} = props
  const {data} = useQuery<T>(query, params, {initial})

  const previewProps = {...rest, data}

  return <Slot {...previewProps} />
}
