import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

import '@/styles/globals.css'

import {draftMode} from 'next/headers'
import {lazy} from 'react'

import ExitPreview from '@/components/ExitPreview'
import LegalLinks from '@/components/LegalLinks'
import VisualEditing from '@/components/VisualEditing'
import {token} from '@/sanity/client'
import {COMMON_PARAMS, getLegals} from '@/sanity/loaders'
const PreviewProvider = lazy(() => import('@/components/PreviewProvider'))

export default async function RootLayout(props) {
  const queryParams = {...COMMON_PARAMS, language: props.params.language}
  const legals = await getLegals(queryParams)
  const preview = draftMode().isEnabled

  const children = (
    <>
      {props.children}
      <LegalLinks legals={legals} />
    </>
  )

  const enableVisualEditing =
    (process.env.NETLIFY && process.env.CONTEXT !== 'production') ||
    process.env.NODE_ENV === 'development'

  return (
    <html lang={props.params.language}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ogy2uky.css" />
      </head>
      <body className="font-sans bg-white text-gray-900">
        {preview ? (
          <PreviewProvider token={token!}>
            {children}
            <ExitPreview />
          </PreviewProvider>
        ) : (
          children
        )}
        {enableVisualEditing ? <VisualEditing /> : null}
      </body>
    </html>
  )
}
