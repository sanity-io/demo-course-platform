import React, {useMemo} from 'react'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'

import {i18n} from '../../languages'

export default function LessonLinks({lessons = []}) {
  const {asPath, locale} = useRouter()

  const localeLessons = useMemo(
    () =>
      lessons
        // Filter list down to either the current locale or the base language
        .map((lessonGroup) => {
          return (
            lessonGroup.find((lesson) => lesson.language === locale) ??
            lessonGroup.find((lesson) => lesson.language === i18n.base)
          )
        })
        // Add an `active` key for styling
        .map((lesson) => {
          return {
            ...lesson,
            active:
              locale === i18n.base
                ? asPath === lesson.path
                : asPath === lesson.path.replace(`/${locale}`, ''),
          }
        }),
    [lessons, locale]
  )

  if (!localeLessons?.length) {
    return null
  }

  return (
    <ul className="text-cyan-500 font-medium grid grid-cols-1 gap-1">
      {localeLessons.map((lesson, index) => (
        <li key={lesson.path} className="flex items-center">
          <Link href={lesson.path} locale={lesson.language}>
            <a
              className={`rounded-md flex w-full items-center p-3 transition-colors duration-300 border ${
                lesson.active
                  ? `bg-cyan-100 border-cyan-200/80`
                  : `bg-white/80 border-white hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-100`
              }`}
            >
              <span className="flex-1 flex items-center gap-x-4">
                <span className="font-display font-bold text-sm text-pink-400">
                  {String(index + 1).padStart(2, 0)}
                </span>
                <span>{lesson.title}</span>
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

LessonLinks.propTypes = {
  lessons: PropTypes.array,
}
