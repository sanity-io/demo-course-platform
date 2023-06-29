import {clsx} from 'clsx'
import Link from 'next/link'
import React, {PropsWithChildren} from 'react'

import {clean} from './Clean'

type ButtonProps = PropsWithChildren<{
  href: string
  className?: string
  Icon?: React.ComponentType<{className?: string}>
  iconFirst?: boolean
  prefetch?: boolean
}>

export default function Button(props: ButtonProps) {
  const {href, children, className = ``, Icon, iconFirst = false, prefetch = true} = props
  if (!href) return null

  return (
    <Link
      prefetch={prefetch}
      href={clean(href)}
      className={clsx(
        iconFirst && `flex-row-reverse`,
        `inline-flex items-center gap-x-2 bg-green-500 hover:bg-green-600 border border-green-400 hover:border-green-600 transition-all duration-100 ease-in-out text-white font-bold p-4 rounded-md leading-none group whitespace-nowrap`,
        className
      )}
    >
      {children}
      {Icon && (
        <Icon
          className={clsx(
            `pointer-events-none w-4 h-auto scale-150 text-green-200 transition-transform`,
            iconFirst
              ? `translate-x-1 group-hover:-translate-x-1`
              : `-translate-x-1 group-hover:translate-x-1`
          )}
        />
      )}
    </Link>
  )
}
