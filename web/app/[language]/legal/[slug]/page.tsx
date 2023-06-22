import {Metadata} from 'next'
import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import LegalLayout from '@/components/LegalLayout'
import {PreviewWrapper} from '@/components/PreviewWrapper'
import {cachedClientFetch} from '@/sanity/client'
import {COMMON_PARAMS} from '@/sanity/loaders'
import {legalQuery} from '@/sanity/queries'

import {i18n} from '../../../../../languages'

export const metadata: Metadata = {
  title: 'Legal Page',
}

export default async function Page({params}) {
  const {language, slug} = params
  const {isEnabled: preview} = draftMode()
  const queryParams = {...COMMON_PARAMS, slug, language}
  const data = await cachedClientFetch(preview)(legalQuery, queryParams)

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/legal/${slug}`,
    title: data.title,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <PreviewWrapper preview={preview} initialData={data} query={legalQuery} params={queryParams}>
        <LegalLayout />
      </PreviewWrapper>
    </>
  )
}
