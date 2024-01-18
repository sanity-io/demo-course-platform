import Link from 'next/link'
import {SanityDocument} from 'next-sanity'
import React from 'react'

import {clean} from './Clean'

type LegalLinksProps = {
  data?: SanityDocument[]
}

export default function LegalLinks(props: LegalLinksProps) {
  const {data: legals = []} = props

  return legals && legals?.length > 0 ? (
    <footer className="container mx-auto p-4 md:p-8 xl:p-16 flex flex-col md:flex-row md:flex-wrap justify-end gap-4 align-middle">
      {legals.map((legal) =>
        legal?.slug?.current ? (
          <Link
            key={legal._id}
            href={`/legal/${clean(legal.slug.current)}`}
            className="text-cyan-500 hover:text-pink-500 font-medium text-sm"
          >
            {legal.title}
          </Link>
        ) : (
          <span key={legal._id} className="text-gray-500 font-medium text-sm">
            {legal.title}
          </span>
        )
      )}
    </footer>
  ) : null
}
