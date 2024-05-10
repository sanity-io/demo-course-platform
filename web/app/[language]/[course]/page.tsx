import {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import {SanityDocument} from 'next-sanity'

import {CourseLayout} from '@/components/CourseLayout'
import Header from '@/components/Header'
import {LiveQueryWrapper} from '@/components/LiveQueryWrapper'
import {COMMON_PARAMS, DEFAULT_EMPTY_PARAMS} from '@/lib/constants'
import {Translation} from '@/lib/types'
import {getCoursesWithSlugs} from '@/sanity/fetchers'
import {loadQuery} from '@/sanity/lib/store'
import {COURSE_QUERY} from '@/sanity/queries'

import {i18n} from '../../../../languages'

export const metadata: Metadata = {
  title: 'Course Page',
}

// Static params for every course, in every language
export async function generateStaticParams() {
  let courses = await getCoursesWithSlugs()
  courses = Array.isArray(courses) ? courses : []

  const params: {language: string; course: string}[] = courses
    .map((course) =>
      i18n.languages
        .map((language) =>
          course?.[language.id]?.current
            ? {course: course[language.id].current, language: language.id}
            : null
        )
        .filter(Boolean)
    )
    .flat()

  return params
}

export default async function Page({params}) {
  const {course, language} = params
  const queryParams = {...COMMON_PARAMS, slug: course, language}
  const {isEnabled} = draftMode()
  const initial = await loadQuery<SanityDocument>(COURSE_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: {tags: ['course']},
  })

  if (!initial.data) {
    notFound()
  }

  const currentTitle = initial.data?.title
    ? initial.data.title[language] ?? initial.data.title[i18n.base]
    : null

  const translations = i18n.languages.reduce<Translation[]>((acc, lang) => {
    const translationSlug = initial?.data?.slug ? initial?.data.slug[lang.id]?.current : null
    const translationTitle = initial?.data?.title ? initial?.data.title[lang.id] : currentTitle

    return translationSlug && translationTitle
      ? [
          ...acc,
          {
            language: lang.id,
            path: '/' + lang.id + '/' + translationSlug,
            title: translationTitle,
          },
        ]
      : acc
  }, [])

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? COURSE_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      >
        <CourseLayout />
      </LiveQueryWrapper>
    </>
  )
}
