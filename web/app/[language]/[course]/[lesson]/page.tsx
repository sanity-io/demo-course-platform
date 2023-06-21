import {Metadata} from 'next'
import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import {LessonLayout} from '@/components/LessonLayout'
import {createLessonLinks} from '@/lib/helpers'
import {getLabels, getLesson, getLessonsWithSlugs} from '@/sanity/loaders'

export async function generateStaticParams() {
  const lessons = await getLessonsWithSlugs()

  const params = lessons.map((lesson) => ({
    ...lesson,
    // Couldn't filter down the object of slugs in the GROQ query,
    // so we filter them here instead
    course: lesson.course[lesson.language].current,
  }))

  return params
}

export const metadata: Metadata = {
  title: 'Lesson Page',
}

export default async function Page({params}) {
  const {lesson, language} = params
  const {isEnabled: preview} = draftMode()
  const data = await getLesson({slug: lesson, language}, preview)
  const labels = await getLabels({language}, preview)

  const lessonPaths = createLessonLinks(data.course.lessons, data.course.slug)
  const currentLessonIndex = lessonPaths.findIndex((versions) =>
    versions.find((lesson) => lesson.title === data.title)
  )
  const translations = lessonPaths[currentLessonIndex]

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LessonLayout data={{...data, labels}} />
    </>
  )
}
