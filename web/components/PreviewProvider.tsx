'use client'

import {LiveQueryProvider} from '@sanity/preview-kit'

import {client} from '@/sanity/client'

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode
  token: string
}) {
  return (
    <LiveQueryProvider client={client} token={token}>
      {children}
    </LiveQueryProvider>
  )
}
