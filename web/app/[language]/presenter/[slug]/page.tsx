import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import {LiveQueryWrapper} from '@/components/LiveQueryWrapper'
import type {PresenterLayoutProps} from '@/components/PresenterLayout'
import PresenterLayout from '@/components/PresenterLayout'
import {COMMON_PARAMS, DEFAULT_EMPTY_PARAMS} from '@/lib/constants'
import {loadQuery} from '@/sanity/lib/store'
import {PRESENTER_QUERY} from '@/sanity/queries'

import {i18n} from '../../../../../languages'

export default async function Page({params}) {
  const {language, slug} = params
  const queryParams = {...COMMON_PARAMS, slug, language}
  const {isEnabled} = draftMode()
  const initial = await loadQuery<PresenterLayoutProps['data']>(PRESENTER_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: {tags: ['presenter']},
  })

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/presenter/${slug}`,
    title: initial.data?.title ?? ``,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? PRESENTER_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      >
        <PresenterLayout />
      </LiveQueryWrapper>
    </>
  )
}
