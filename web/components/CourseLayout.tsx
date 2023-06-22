'use client'

import {useParams} from 'next/navigation'
import React, {useMemo} from 'react'

import Blobs from '@/components/Blobs'
import LessonLinks from '@/components/LessonLinks'
import Title from '@/components/Title'
import {createCourseSummary, createLessonLinks} from '@/lib/helpers'

import {i18n} from '../../languages'

type CourseLayoutProps = {
  data?: any
}

export function CourseLayout(props: CourseLayoutProps) {
  const {title, slug, presenters, lessons, labels} = props.data ?? {}
  const {language: currentLanguage} = useParams()

  // Render the localized title, if it exists, otherwise fallback to base
  const currentTitle = title ? title[currentLanguage] ?? title[i18n.base] : null

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

        <div className="p-4 md:p-8 xl:p-16 container mx-auto">
          <LessonLinks lessons={lessonPaths} openByDefault />
        </div>
      </div>
      <Blobs />
    </>
  )
}
