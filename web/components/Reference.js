import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function Reference({children, mark}) {
  const {asPath} = useRouter()

  if (!children) {
    return null
  }

  // This is _crude_
  const link = mark?.slug?.current
    ? asPath.split(`/`).slice(0, -1).filter(Boolean).concat(mark.slug.current).join(`/`)
    : null

  return link ? (
    <Link href={link}>
      {children}
    </Link>
  ) : (
    <span>{children}</span>
  )
}
