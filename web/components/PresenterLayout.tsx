'use client'

import {SanityImageSource} from '@sanity/asset-utils'

import Title from '@/components/Title'
import {urlFor} from '@/sanity/urlFor'

type PresenterLayoutProps = {
  data?: {
    name?: string
    title?: string
    photo?: SanityImageSource
    biography?: string
  }
}

export default function PresenterLayout(props: PresenterLayoutProps) {
  if (!props.data) {
    // console.log(`PresenterLayout data empty: ${JSON.stringify(props)}`)
    return null
  }

  const {name, title, photo, biography} = props.data

  const photoUrl = photo ? urlFor(photo).auto('format').width(500).height(500).url() : null

  return (
    <div className="relative z-10">
      <section className="pt-16">
        <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16">
          <div className="max-w-2xl flex flex-col justify-start items-start gap-4 xl:gap-8">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-48 md:w-64 h-48 md:h-64 object-cover rounded-full shadow-inner"
              />
            ) : null}
            {name ? <Title subtitle={title}>{name}</Title> : null}
            {biography ? <p className="text-lg leading-relaxed">{biography}</p> : null}
          </div>
        </div>
      </section>
    </div>
  )
}
