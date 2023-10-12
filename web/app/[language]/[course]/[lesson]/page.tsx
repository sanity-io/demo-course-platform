import {LiveQuery} from '@sanity/preview-kit/live-query'
import get from 'lodash/get'
import {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {SanityDocument} from 'next-sanity'

import Header from '@/components/Header'
import {LessonLayout} from '@/components/LessonLayout'
import {createLessonLinks} from '@/lib/helpers'
import {sanityFetch} from '@/sanity/client'
import {COMMON_PARAMS, getLabels, getLessonsWithSlugs} from '@/sanity/loaders'
import {lessonQuery} from '@/sanity/queries'

export async function generateStaticParams() {
  const lessons = await getLessonsWithSlugs()

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
  const data = await sanityFetch<SanityDocument>({
    query: lessonQuery,
    params: queryParams,
    tags: ['lesson'],
  })

  const labels = await getLabels(queryParams)

  const lessonPaths = createLessonLinks(data.course.lessons, data.course.slug)
  const currentLessonIndex = lessonPaths.findIndex((versions) =>
    versions.find((lesson) => lesson.title === data.title)
  )
  const translations = lessonPaths[currentLessonIndex]

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQuery
        enabled={draftMode().isEnabled}
        initialData={data}
        query={lessonQuery}
        params={queryParams}
      >
        <LessonLayout labels={labels} />
      </LiveQuery>
    </>
  )
}
