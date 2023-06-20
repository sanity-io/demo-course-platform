import {Metadata} from 'next'

import {CourseLayout} from '@/components/CourseLayout'
import Header from '@/components/Header'
import {Translation} from '@/lib/types'
import {getCourse, getCoursesWithSlugs} from '@/sanity/loaders'

import {i18n} from '../../../../languages'

export const metadata: Metadata = {
  title: 'Course Page',
}

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

  const currentTitle = data?.title ? data.title[language] ?? data.title[i18n.base] : null

  const translations = i18n.languages.reduce<Translation[]>((acc, lang) => {
    const translationSlug = data?.slug ? data.slug[lang.id]?.current : null
    const translationTitle = data?.title ? data.title[lang.id] : currentTitle

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
      <CourseLayout data={data} />
    </>
  )
}
