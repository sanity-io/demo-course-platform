import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

import '@/styles/globals.css'

import {draftMode} from 'next/headers'
import {SanityDocument} from 'next-sanity'

import LegalLinks from '@/components/LegalLinks'
import VisualEditing from '@/components/VisualEditing'
import {COMMON_PARAMS} from '@/lib/constants'
import {loadQuery} from '@/sanity/lib/store'
import {LEGALS_QUERY} from '@/sanity/queries'

export default async function RootLayout(props) {
  const queryParams = {...COMMON_PARAMS, language: props.params.language}
  const {isEnabled} = draftMode()
  const initial = await loadQuery<SanityDocument[]>(LEGALS_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
  })

  return (
    <html lang={props.params.language}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ogy2uky.css" />
      </head>
      <body className="font-sans bg-white text-gray-900">
        {props.children}
        <LegalLinks data={initial.data} />
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
