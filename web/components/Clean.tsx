import {vercelStegaSplit} from '@vercel/stega'
import React from 'react'

export function clean(value?: string | null): string {
  return value ? vercelStegaSplit(value).cleaned : ``
}

type CleanProps = {
  value: string
  as?: 'div' | 'span'
}

export default function Clean({value, as}: CleanProps) {
  const {cleaned, encoded} = vercelStegaSplit(value)
  const Element = as ?? React.Fragment

  return encoded ? (
    <Element>
      {cleaned}
      <span style={{display: 'none'}}>{encoded}</span>
    </Element>
  ) : (
    cleaned
  )
}
