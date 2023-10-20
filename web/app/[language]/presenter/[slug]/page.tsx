import LiveQuery from '@sanity/preview-kit/live-query'
import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import type {PresenterLayoutProps} from '@/components/PresenterLayout'
import PresenterLayout from '@/components/PresenterLayout'
import {sanityFetch} from '@/sanity/client'
import {COMMON_PARAMS} from '@/sanity/loaders'
import {presenterQuery} from '@/sanity/queries'

import {i18n} from '../../../../../languages'

export default async function Page({params}) {
  const {language, slug} = params
  const queryParams = {...COMMON_PARAMS, slug, language}
  const previewDrafts = draftMode().isEnabled
  const data = await sanityFetch<PresenterLayoutProps['data']>({
    query: presenterQuery,
    params: queryParams,
    tags: ['presenter'],
    previewDrafts,
  })

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/presenter/${slug}`,
    title: data?.title ?? ``,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQuery
        enabled={previewDrafts}
        initialData={data}
        query={presenterQuery}
        params={queryParams}
      >
        <PresenterLayout />
      </LiveQuery>
    </>
  )
}
