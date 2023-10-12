'use client'

import {CheckIcon, ChevronLeftIcon} from '@heroicons/react/24/outline'
import {useParams} from 'next/navigation'
import React, {useMemo} from 'react'

import {createLessonLinks} from '@/lib/helpers'

import {i18n} from '../../languages'
import Blobs from './Blobs'
import Button from './Button'
import LessonLinks from './LessonLinks'
import Presenters from './Presenters'
import Prose from './Prose'
import Title from './Title'

type LessonLayoutProps = {
  data?: any
  labels?: any[]
}

export function LessonLayout(props: LessonLayoutProps) {
  const {labels = []} = props
  const {title, summary, content, course} = props.data ?? {}
  const {lessons, presenters} = course ?? {}
  const params = useParams()
  const language = Array.isArray(params.language) ? params.language[0] : params.language

  const lessonPaths = useMemo(
    () => createLessonLinks(lessons, course?.slug),
    [lessons, course?.slug]
  )

  const courseSlug = course?.slug[language ?? i18n.base].current
  const coursePath = [language, courseSlug].filter(Boolean).join('/')

  // From the lessonPaths we can find the translations of this lesson
  const currentLessonIndex = lessonPaths.findIndex((versions) =>
    versions.find((lesson) => lesson.title === title)
  )
  const nextLesson =
    currentLessonIndex + 1 === lessonPaths.length
      ? null
      : lessonPaths[currentLessonIndex + 1].find((lesson) => lesson.language === language)

  const completeString = labels.find(({key}) => key === 'lesson.continue')?.text
  const backLabel = labels.find(({key}) => key === 'back')?.text

  return (
    <>
      <div className="relative z-10">
        <section className="bg-gradient-to-r mix-blend-multiply from-cyan-100 via-transparent to-transparent pt-16">
          <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16 flex flex-col justify-start items-start gap-4 xl:gap-8">
            <Title subtitle={<Presenters presenters={presenters} />}>{title}</Title>
            {coursePath && course && backLabel && (
              <Button href={`/${coursePath}`} Icon={ChevronLeftIcon} iconFirst>
                {backLabel}
              </Button>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 xl:gap-16 p-4 md:p-8 xl:p-16 container mx-auto">
          {lessons?.length > 0 ? (
            <div className="md:col-span-2 md:col-start-4 md:sticky md:top-24 self-start">
              <h2 className="font-display text-lg md:text-2xl text-cyan-800 mb-2 md:mb-4">
                {course.title[language]}
              </h2>
              <LessonLinks lessons={lessonPaths} />
            </div>
          ) : null}

          {content?.length > 0 ? (
            <div className="md:col-span-3 md:col-start-1 md:row-start-1">
              {summary ? (
                <div className="italic text-cyan-800 text-2xl lg:leading-normal mb-4 md:mb-8">
                  {summary}
                </div>
              ) : null}

              {content && content.length > 0 ? <Prose value={content} /> : null}

              {nextLesson?.path && (
                <div className="flex items-center justify-between my-8">
                  <Button href={nextLesson.path} Icon={CheckIcon}>
                    <>
                      {completeString}
                      <span className="sr-only">
                        #{currentLessonIndex + 2} {nextLesson.title}
                      </span>
                    </>
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <Blobs />
    </>
  )
}
