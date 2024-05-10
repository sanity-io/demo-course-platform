import get from 'lodash/get'
import {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import {SanityDocument} from 'next-sanity'

import Header from '@/components/Header'
import {LessonLayout} from '@/components/LessonLayout'
import {LiveQueryWrapper} from '@/components/LiveQueryWrapper'
import {COMMON_PARAMS, DEFAULT_EMPTY_PARAMS} from '@/lib/constants'
import {createLessonLinks} from '@/lib/helpers'
import {Label} from '@/lib/types'
import {getLessonsWithSlugs} from '@/sanity/fetchers'
import {loadQuery} from '@/sanity/lib/store'
import {LABELS_QUERY, LESSON_QUERY} from '@/sanity/queries'

export async function generateStaticParams() {
  let lessons = await getLessonsWithSlugs()
  lessons = Array.isArray(lessons) ? lessons : []

  const params: {language: string; course: string; lesson: string}[] = lessons
    .map((lesson) => ({
      ...lesson,
      // Couldn't filter down the object of slugs in the GROQ query,
      // so we filter them here instead
      course: lesson.language ? get(lesson, [`course`, lesson.language, `current`], null) : null,
    }))
    .filter((lesson) => lesson.course)

  return params
}

export const metadata: Metadata = {
  title: 'Lesson Page',
}

export default async function Page({params}) {
  const {lesson, language} = params
  const queryParams = {...COMMON_PARAMS, slug: lesson, language}
  const {isEnabled} = draftMode()
  const initial = await loadQuery<SanityDocument>(LESSON_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: {tags: ['lesson']},
  })
  const labelsInitial = await loadQuery<Label[]>(LABELS_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
  })

  if (!initial.data) {
    notFound()
  }

  const lessonPaths = createLessonLinks(initial.data.course.lessons, initial.data.course.slug)
  const currentLessonIndex = lessonPaths.findIndex((versions) =>
    versions.find((lesson) => lesson.title === initial.data.title)
  )
  const translations = lessonPaths[currentLessonIndex]

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? LESSON_QUERY : ``}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      >
        <LessonLayout labels={labelsInitial.data} />
      </LiveQueryWrapper>
    </>
  )
}
