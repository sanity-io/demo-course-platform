import {Metadata} from 'next'
import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import {getLegal} from '@/sanity/loaders'

import {i18n} from '../../../../../languages'

export const metadata: Metadata = {
  title: 'Legal Page',
}

export default async function Page({params}) {
  const {language, slug} = params
  const {isEnabled: preview} = draftMode()
  const data = await getLegal({language, slug}, preview)

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/legal/${slug}`,
    title: data.title,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LegalLayout {...data} />
    </>
  )
}
