import {Metadata} from 'next'

import Header from '@/components/Header'
import LegalLayout from '@/components/LegalLayout'
import {LessonLayout} from '@/components/LessonLayout'
import {createLessonLinks} from '@/lib/helpers'
import {getLabels, getLegal, getLesson, getLessonsWithSlugs} from '@/sanity/loaders'

import {i18n} from '../../../../../languages'

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
  title: 'Legal Page',
}

export default async function Page({params}) {
  const {language, slug} = params
  const data = await getLegal({language, slug})

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/legal/${slug}`,
    title: data.title,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LegalLayout {...data} />
    </>
  )
}
