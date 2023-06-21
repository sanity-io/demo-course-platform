import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

import '@/styles/globals.css'

import {draftMode} from 'next/headers'
import {lazy} from 'react'

import ExitPreview from '@/components/ExitPreview'
import LegalLinks from '@/components/LegalLinks'
import {getLegals} from '@/sanity/loaders'
const PreviewProvider = lazy(() => import('@/components/PreviewProvider'))

export default async function RootLayout(props) {
  const {language} = props.params
  const legals = await getLegals({language})

  const preview = draftMode().isEnabled ? process.env.SANITY_API_READ_TOKEN : undefined
  if (draftMode().isEnabled && !preview) {
    console.info(
      `Preview mode is enabled but no token was found.`,
      process.env.SANITY_API_READ_TOKEN
    )
  }

  const children = (
    <>
      {props.children}
      <LegalLinks legals={legals} />
    </>
  )

  return (
    <html lang={language}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ogy2uky.css" />
      </head>
      <body className="font-sans bg-white text-gray-900">
        {preview ? (
          <PreviewProvider token={preview}>
            {children}
            <ExitPreview />
          </PreviewProvider>
        ) : (
          children
        )}
      </body>
    </html>
  )
}
