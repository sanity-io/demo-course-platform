import {draftMode} from 'next/headers'
import {SanityDocument} from 'next-sanity'

import Header from '@/components/Header'
import {HomeLayout} from '@/components/HomeLayout'
import {LiveQueryWrapper} from '@/components/LiveQueryWrapper'
import {COMMON_PARAMS, DEFAULT_EMPTY_PARAMS} from '@/lib/constants'
import {Label} from '@/lib/types'
import {loadQuery} from '@/sanity/lib/store'
import {HOME_QUERY, LABELS_QUERY} from '@/sanity/queries'

import {i18n} from '../../../languages'

export default async function Page({params}) {
  const {language} = params
  const queryParams = {...COMMON_PARAMS, language}
  const {isEnabled} = draftMode()
  const homeInitial = await loadQuery<{courses: SanityDocument[]}>(HOME_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: {tags: ['home']},
  })
  const labelsInitial = await loadQuery<Label[]>(LABELS_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: {tags: ['labels']},
  })

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}`,
      title: lang.title,
    }
  })

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? HOME_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={homeInitial}
      >
        <HomeLayout labels={labelsInitial.data} />
      </LiveQueryWrapper>
    </>
  )
}
