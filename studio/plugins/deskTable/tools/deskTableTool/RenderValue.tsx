import React from 'react'
import {Text} from '@sanity/ui'

type RenderValueProps = {
  value: any
}
export default function RenderValue(props: RenderValueProps) {
  const {value} = props

  if (typeof value === 'string') {
    return <Text size={1}>{value}</Text>
  }

  return <Text size={1}>{JSON.stringify(value)}</Text>
}
