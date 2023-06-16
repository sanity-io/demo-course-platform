import {CourseLayout} from '@/components/CourseLayout'
import Header from '@/components/Header'
import {createLessonLinks} from '@/lib/helpers'
import {getCourse, getCoursesWithSlugs} from '@/sanity/loaders'

import {i18n} from '../../../../languages'

// Static params for every course, in every language
export async function generateStaticParams() {
  const courses = await getCoursesWithSlugs()

  const params = courses
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
  const data = await getCourse({slug: course, language})

  const lessonPaths = data?.lessons.length > 0 ? createLessonLinks(data.lessons, course?.slug) : []
  const currentLessonIndex = lessonPaths.findIndex((versions) =>
    versions.find((lesson) => lesson.title === data.title)
  )
  const translations = lessonPaths[currentLessonIndex]

  return (
    <>
      <Header translations={translations} />
      <CourseLayout data={data} />
    </>
  )
}
