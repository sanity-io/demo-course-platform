import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {PropsWithChildren} from 'react'
import {Slug} from 'sanity'

import {clean} from './Clean'

type ReferenceProps = PropsWithChildren<{
  mark: {slug: Slug}
}>

export default function Reference(props: ReferenceProps) {
  const {mark, children} = props
  const pathname = usePathname()

  if (!children) {
    return null
  }

  // This is _crude_
  const link = mark?.slug?.current
    ? pathname.split(`/`).slice(0, -1).filter(Boolean).concat(mark.slug.current).join(`/`)
    : null

  return link ? <Link href={clean(link)}>{children}</Link> : <span>{children}</span>
}
