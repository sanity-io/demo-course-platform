'use client'

import {useParams} from 'next/navigation'
import React, {PropsWithChildren, useMemo} from 'react'

import Blobs from '@/components/Blobs'
import LessonLinks from '@/components/LessonLinks'
import Title from '@/components/Title'
import {createLessonLinks} from '@/lib/helpers'

import {i18n} from '../../languages'
import Presenters from './Presenters'
import Prose from './Prose'

type CourseLayoutProps = PropsWithChildren<{
  data?: any
}>

export function CourseLayout(props: CourseLayoutProps) {
  const {title, slug, presenters, lessons} = props.data ?? {}

  // Render the localized title, if it exists, otherwise fallback to base
  const {language: currentLanguage} = useParams()
  const titleLanguage = Array.isArray(currentLanguage) ? currentLanguage[0] : currentLanguage
  const currentTitle = title ? title[titleLanguage] ?? title[i18n.base] : null

  // Each "course" document has an array of "lesson" references
  // "lesson" documents have document-level translations
  // Each document has a unique slug and are related by an
  // array of references stored in a separate "translation.metadata" document
  const lessonPaths = useMemo(() => createLessonLinks(lessons, slug), [lessons, slug])

  return (
    <>
      <div className="relative">
        <section className="bg-gradient-to-r mix-blend-multiply from-cyan-100 via-transparent to-transparent pt-16">
          <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16 flex flex-col justify-start items-start gap-2 md:gap-4 xl:gap-8">
            <Title subtitle={<Presenters presenters={presenters} />}>{currentTitle}</Title>
          </div>
        </section>

        <div className="p-4 md:p-8 xl:p-16 container mx-auto">
          {lessonPaths.length > 0 ? (
            <LessonLinks lessons={lessonPaths} openByDefault />
          ) : (
            <Prose>{props.children}</Prose>
          )}
        </div>
      </div>
      <Blobs />
    </>
  )
}
