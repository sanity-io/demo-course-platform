import React from 'react'
import Link from 'next/link'

export default function Button({href, children, Icon, iconFirst = false}) {
  if (!href) return null

  return (
    <Link href={href}>
      <a
        className={`${
          iconFirst ? `flex-row-reverse` : ``
        } inline-flex items-center gap-x-2 bg-green-500 hover:bg-green-600 border border-green-400 hover:border-green-600 transition-all group-hover:scale-105 hover:scale-105 duration-100 ease-in-out text-white font-bold p-4 rounded-md leading-none group`}
      >
        {children}
        {Icon && (
          <Icon
            className={`pointer-events-none w-4 h-auto scale-150 text-green-200 transition-transform ${
              iconFirst
                ? `translate-x-1 group-hover:-translate-x-1`
                : `-translate-x-1 group-hover:translate-x-1`
            }`}
          />
        )}
      </a>
    </Link>
  )
}
