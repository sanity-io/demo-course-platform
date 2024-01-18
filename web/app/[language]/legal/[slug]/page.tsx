import {Metadata} from 'next'
import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import LegalLayout, {LegalLayoutProps} from '@/components/LegalLayout'
import {LiveQueryWrapper} from '@/components/LiveQueryWrapper'
import {COMMON_PARAMS, DEFAULT_EMPTY_PARAMS} from '@/lib/constants'
import {loadQuery} from '@/sanity/lib/store'
import {LEGAL_QUERY} from '@/sanity/queries'

import {i18n} from '../../../../../languages'

export const metadata: Metadata = {
  title: 'Legal Page',
}

export default async function Page({params}) {
  const {language, slug} = params
  const queryParams = {...COMMON_PARAMS, slug, language}
  const {isEnabled} = draftMode()
  const initial = await loadQuery<LegalLayoutProps['data']>(LEGAL_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: {tags: ['legal']},
  })

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/legal/${slug}`,
    title: initial.data?.title ?? ``,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? LEGAL_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      >
        <LegalLayout data={initial.data} />
      </LiveQueryWrapper>
    </>
  )
}
