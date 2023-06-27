import {vercelStegaSplit} from '@vercel/stega'
import {SanityDocument, Slug} from 'sanity'

import {getLabelByKey} from './getLabelByKey'
import {Label, Translation} from './types'

// Return `DE` from `de`
export function extractCountryFromCode(code = ``) {
  return code && code.length > 2
    ? [...code.split(/[-_]/)]?.pop()?.toLowerCase()
    : code.toLowerCase()
}

// Return `EN` from `en_SE`
// Return `EN` from `en`
export function extractLanguageFromCode(code = ``) {
  return code.length > 2 ? [...code.split(/[-_]/)][0].toLowerCase() : code.toLowerCase()
}

// Creates an array of all language versions of this current lesson
// At this point, you might start to wonder if it wasn't better to move this logic into Sanity
// ...it's not a bad idea
type SlugObject = {
  [key: string]: Slug
}

export function createLessonLinks(
  lessons: {
    language: string
    title: string
    slug: Slug
    translations: {
      language: string
      title: string
      slug: Slug
    }[]
  }[] = [],
  courseSlug: SlugObject = {}
): Translation[][] {
  if (!lessons?.length) {
    return []
  }

  return (
    lessons
      // Each lesson must have a language
      .filter((lesson) => lesson?.language)
      .map((lesson) => {
        const translations = lesson.translations.map((ref) => {
          const lessonLang = ref.language
          const courseLangSlug = courseSlug[ref.language]?.current
          const lessonLangSlug = ref.slug.current

          return {
            language: ref.language,
            title: ref.title,
            path: '/' + [lessonLang, courseLangSlug, lessonLangSlug].join('/'),
          }
        })

        return translations
      })
  )
}

export function createCourseSummary(
  lessons: SanityDocument[] = [],
  presenters: SanityDocument[] = [],
  labels: Label[] = []
) {
  const value: (string | number)[] = []

  if (!labels.length) {
    return ``
  }

  const lessonSingular = getLabelByKey('lesson.singular', labels)
  const lessonPlural = getLabelByKey('lesson.plural', labels)
  const presenterSingular = getLabelByKey('presenter.singular', labels)
  const presenterPlural = getLabelByKey('presenter.plural', labels)

  if (lessons?.length) {
    value.push(lessons.length)
    value.push(lessons.length === 1 ? lessonSingular : lessonPlural)
  }

  if (lessons?.length && presenters?.length) {
    value.push(`//`)
  }

  if (presenters?.length) {
    value.push(presenters.length)
    value.push(presenters.length === 1 ? presenterSingular : presenterPlural)
  }

  return value
    .filter(Boolean)
    .map((part) => vercelStegaSplit(part.toString()).cleaned)
    .join(` `)
}
