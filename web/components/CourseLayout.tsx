'use client'

import {useParams} from 'next/navigation'
import React, {useMemo} from 'react'

import {createCourseSummary, createLessonLinks} from '@/lib/helpers'
import {Translation} from '@/lib/types'

import {i18n} from '../../languages'
import Blobs from './Blobs'
import LessonLinks from './LessonLinks'
import Title from './Title'
import TranslationLinks from './TranslationLinks'

export function CourseLayout({data}) {
  const {title, slug, presenters, lessons, labels} = data ?? {}
  const {language: currentLanguage} = useParams()

  // Render the localized title, if it exists, otherwise fallback to base
  const currentTitle = title ? title[currentLanguage] ?? title[i18n.base] : null

  // "course" documents have a field-level translated slug field
  // From this object we can create an array of all paths for this course
  const translations = useMemo(
    () =>
      i18n.languages.reduce<Translation[]>((acc, lang) => {
        const translationSlug = slug ? slug[lang.id]?.current : null
        const translationTitle = title ? title[lang.id] : currentTitle

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
      }, []),
    [currentTitle, slug, title]
  )

  // Each "course" document has an array of "lesson" references
  // "lesson" documents have document-level translations
  // Each document has a unique slug and are related by an
  // array of references stored in a separate "translation.metadata" document
  const lessonPaths = useMemo(() => createLessonLinks(lessons, slug), [lessons, slug])

  const summary = useMemo(
    () => createCourseSummary(lessons, presenters, labels),
    [lessons, presenters, labels]
  )

  return (
    <>
      <div className="relative">
        <section className="bg-gradient-to-r mix-blend-multiply from-cyan-100 via-transparent to-transparent pt-16">
          <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16 flex flex-col justify-start items-start gap-2 md:gap-4 xl:gap-8">
            <Title subtitle={summary}>{currentTitle}</Title>
          </div>
        </section>

        <TranslationLinks translations={translations} />

        <div className="p-4 md:p-8 xl:p-16 container mx-auto">
          <LessonLinks lessons={lessonPaths} openByDefault />
        </div>
      </div>
      <Blobs />
    </>
  )
}
