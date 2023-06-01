import React from 'react'
import {Metadata} from 'next'
import {i18n} from '../../languages'
import {extractLanguageFromCode} from '../lib/helpers'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

import './_styles/globals.css'
import {Layout} from './_components/Layout'
import {getLegals} from './_data/loaders'

export default async function RootLayout(props) {
  const {children} = props
  const legals = await getLegals()

  return (
    <html
      lang={extractLanguageFromCode(
        // TODO: re-add current locale
        i18n.base
      )}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ogy2uky.css" />
        <meta charSet="utf-8" />
      </head>
      <body className="font-sans bg-white text-gray-900">
        <Layout translations={[]} legals={legals}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
