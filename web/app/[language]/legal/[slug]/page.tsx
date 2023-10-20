import LiveQuery from '@sanity/preview-kit/live-query'
import {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {SanityDocument} from 'next-sanity'

import Header from '@/components/Header'
import LegalLayout, {LegalLayoutProps} from '@/components/LegalLayout'
import {sanityFetch} from '@/sanity/client'
import {COMMON_PARAMS} from '@/sanity/loaders'
import {legalQuery} from '@/sanity/queries'

import {i18n} from '../../../../../languages'

export const metadata: Metadata = {
  title: 'Legal Page',
}

export default async function Page({params}) {
  const {language, slug} = params
  const queryParams = {...COMMON_PARAMS, slug, language}
  const previewDrafts = draftMode().isEnabled
  const data = await sanityFetch<LegalLayoutProps['data']>({
    query: legalQuery,
    params: queryParams,
    tags: ['legal'],
    previewDrafts,
  })

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/legal/${slug}`,
    title: data?.title ?? ``,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQuery enabled={previewDrafts} initialData={data} query={legalQuery} params={queryParams}>
        <LegalLayout data={data} />
      </LiveQuery>
    </>
  )
}
