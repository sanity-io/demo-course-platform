import Link from 'next/link'

export function ListLink(props) {
  const {href, children, ...rest} = props

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}
