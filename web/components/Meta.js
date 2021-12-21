import React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'

export default function Meta({translations = []}) {
  const {locale} = useRouter()

  const siteName = `Course Platform`
  const title = translations.length
    ? translations.find(({language}) => language === locale)?.title
    : null

  return (
    <Head>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
    </Head>
  )
}
