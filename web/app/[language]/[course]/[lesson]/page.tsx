import {Metadata} from 'next'

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
  title: 'My Page Title',
}

export default async function Page({params}) {
  const {lesson, language} = params
  const data = await getLesson({slug: lesson, language})
  const labels = await getLabels({language})

  const lessonPaths = createLessonLinks(data.course.lessons, lesson)
  const currentLessonIndex = lessonPaths.findIndex((versions) =>
    versions.find((lesson) => lesson.title === data.title)
  )
  const translations = lessonPaths[currentLessonIndex]

  return (
    <>
      <Header translations={translations} />
      <LessonLayout data={{...data, labels}} />
    </>
  )
}
