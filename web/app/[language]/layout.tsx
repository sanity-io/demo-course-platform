import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

import '@/styles/globals.css'

import {draftMode} from 'next/headers'

import ExitPreview from '@/components/ExitPreview'
import LegalLinks from '@/components/LegalLinks'
import {getLegals} from '@/sanity/loaders'

export default async function RootLayout(props) {
  const {children} = props
  const {language} = props.params
  const {isEnabled: preview} = draftMode()
  const legals = await getLegals({language})

  return (
    <html lang={language}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ogy2uky.css" />
      </head>
      <body className="font-sans bg-white text-gray-900">
        {children}
        <LegalLinks legals={legals} />
        {preview ? <ExitPreview /> : null}
      </body>
    </html>
  )
}
