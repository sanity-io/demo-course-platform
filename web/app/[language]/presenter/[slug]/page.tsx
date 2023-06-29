import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import PresenterLayout from '@/components/PresenterLayout'
import {PreviewWrapper} from '@/components/PreviewWrapper'
import {cachedClientFetch, previewClient} from '@/sanity/client'
import {COMMON_PARAMS} from '@/sanity/loaders'
import {presenterQuery} from '@/sanity/queries'

import {i18n} from '../../../../../languages'

export default async function Page({params}) {
  const {language, slug} = params
  const queryParams = {...COMMON_PARAMS, slug, language}
  const {isEnabled: preview} = draftMode()
  const data = await cachedClientFetch(preview)(presenterQuery, queryParams)

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/presenter/${slug}`,
    title: data?.title,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <PreviewWrapper
        preview={preview}
        initialData={data}
        query={presenterQuery}
        params={queryParams}
      >
        <PresenterLayout />
      </PreviewWrapper>
    </>
  )
}
