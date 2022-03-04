import React from 'react'
import {useRouter} from 'next/router'

import {i18n} from '../../../languages'
import ProseableText from '../ProseableText'
import Title from '../Title'
import Layout from './Layout'

export default function Legal({data}) {
  const {title, content, legals} = data
  const {locales, asPath} = useRouter()
  const translations = locales.map((id) => ({
    language: id,
    path: id === i18n.base ? `${asPath}` : `${id}${asPath}`,
  }))

  return (
    <Layout translations={translations} legals={legals}>
      <div className="relative z-10">
        <section className="pt-16">
          <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16 flex flex-col justify-start items-start gap-4 xl:gap-8">
            {title ? <Title>{title}</Title> : null}
            {content?.length ? <ProseableText value={content} /> : null}
          </div>
        </section>
      </div>
    </Layout>
  )
}
