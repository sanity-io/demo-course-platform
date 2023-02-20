import React from 'react'
import {useRouter} from 'next/router'

import {i18n} from '../../../languages'
import {urlFor} from '../../lib/urlFor'
import Title from '../Title'
import Layout from './Layout'

export default function Presenter({data}) {
  const {name, title, photo, biography, legals} = data
  const {locales, asPath} = useRouter()
  const translations = locales.map((id) => ({
    language: id,
    path: id === i18n.base ? `${asPath}` : `${id}${asPath}`,
  }))

  const photoUrl = photo ? urlFor(photo).auto('format').width(500).height(500).url() : null

  return (
    <Layout translations={translations} legals={legals}>
      <div className="relative z-10">
        <section className="pt-16">
          <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16">
            <div className="max-w-2xl flex flex-col justify-start items-start gap-4 xl:gap-8">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-48 md:w-64 w-48 md:h-64 object-cover rounded-full shadow-inner"
                />
              ) : null}
              {name ? <Title subtitle={title}>{name}</Title> : null}
              {biography ? <p className="text-lg leading-relaxed">{biography}</p> : null}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
