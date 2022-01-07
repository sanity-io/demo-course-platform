import {Menu} from '@headlessui/react'
import React, {useMemo, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {useWindowSize} from 'usehooks-ts'

import {ChevronDownIcon} from '@heroicons/react/outline'
import {i18n} from '../../languages'

const buttonClasses = {
  default: `rounded-md flex w-full items-center p-3 transition-colors duration-300 border`,
  current: `bg-cyan-100/80 border-cyan-200/80 text-cyan-900`,
  notCurrent: `bg-white/80 border-white hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-100`,
  active: `border-red-500`,
  notActive: ``,
}

function ListLink(props) {
  const {href, children, ...rest} = props

  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

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
            current:
              locale === i18n.base
                ? asPath === lesson.path
                : asPath === lesson.path.replace(`/${locale}`, ''),
          }
        }),
    [lessons, locale]
  )

  const {width} = useWindowSize()
  const [menuOpen, setMenuOpen] = useState(width > 768)

  // Show/hide the menu on resize
  useEffect(() => setMenuOpen(width > 768), [width])

  // Show/hide on navigation on mobile when item clicked
  useEffect(() => (width <= 768 ? setMenuOpen(false) : null), [asPath])

  if (!localeLessons?.length) {
    return null
  }

  return (
    <Menu as="div" className="grid grid-cols-1 gap-1" open={menuOpen}>
      <button
        type="button"
        className={[`md:hidden`, buttonClasses.default, buttonClasses.current].join(` `)}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="flex-1 flex items-center gap-x-4">
          <span className="text-pink-400 w-6">
            <ChevronDownIcon className="w-6 h-auto" />
          </span>
          <span className="text-cyan-500 font-medium">{localeLessons.length} Lessons</span>
        </span>
      </button>

      <Menu.Items static as="ul" className="text-cyan-500 font-medium grid grid-cols-1 gap-1">
        {menuOpen &&
          localeLessons.map((lesson, index) => (
            <Menu.Item as="li" key={lesson.path} className="flex items-center">
              {({active}) => (
                <ListLink
                  href={lesson.path}
                  locale={lesson.language}
                  className={[
                    buttonClasses.default,
                    lesson.current ? buttonClasses.current : buttonClasses.notCurrent,
                    active ? buttonClasses.active : buttonClasses.notActive,
                  ].join(` `)}
                >
                  <span className="flex-1 flex items-center gap-x-4">
                    <span className="font-display font-bold text-sm text-pink-400 w-6">
                      {String(index + 1).padStart(2, 0)}
                    </span>
                    <span>{lesson.title}</span>
                  </span>
                </ListLink>
              )}
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  )
}

LessonLinks.propTypes = {
  lessons: PropTypes.array,
}
