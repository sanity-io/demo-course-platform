import {Metadata} from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

import '@/styles/globals.css'

import LegalLinks from '@/components/LegalLinks'
import {getLegals} from '@/sanity/loaders'

export default async function RootLayout(props) {
  const {children} = props
  const {language} = props.params

  const legals = await getLegals({language})

  return (
    <html lang={language}>
      <body className="font-sans bg-white text-gray-900">
        {children}
        <LegalLinks legals={legals} />
      </body>
    </html>
  )
}
