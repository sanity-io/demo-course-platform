import Link from 'next/link'

import {clean} from '../Clean'

export function ListLink(props) {
  const {href, children, ...rest} = props

  return (
    <Link href={clean(href)} {...rest}>
      {children}
    </Link>
  )
}
