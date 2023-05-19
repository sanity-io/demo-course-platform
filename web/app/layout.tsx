import React from 'react'
import {Metadata} from 'next'
import {i18n} from '../../languages'
import {extractLanguageFromCode} from '../lib/helpers'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function RootLayout(props) {
  const {children} = props

  return (
    <html lang={extractLanguageFromCode(this.props.lang || i18n.base)}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ogy2uky.css" />
        <meta charSet="utf-8" />
      </head>
      <body className="font-sans bg-white text-gray-900">{children}</body>
    </html>
  )
}
