// Return `SE` from `en_SE`
// Return `DE` from `de`
export function extractCountryFromCode(code = ``) {
  return code.length > 2 ? [...code.split(/[-_]/)].pop().toLowerCase() : code.toLowerCase()
}

// Return `EN` from `en_SE`
// Return `EN` from `en`
export function extractLanguageFromCode(code = ``) {
  return code.length > 2 ? [...code.split(/[-_]/)][0].toLowerCase() : code.toLowerCase()
}

// Creates an array of all language versions of this current lesson
// At this point, you might start to wonder if it wasn't better to move this logic into Sanity
// ...it's not a bad idea
export function createLessonLinks(lessons = [], courseSlug = {}) {
  if (!lessons?.length || !courseSlug) {
    return []
  }

  return lessons
  // Each lesson must have a language
    .filter((lesson) => lesson?.language)
    .map((lesson) => {
      const courseSlugBase = courseSlug[lesson.language]?.current

      const baseLanguageLesson = {
        language: lesson.language, // Should always be i18n.base
        title: lesson.title,
        path: [courseSlugBase, lesson.slug.current].join('/'),
      }

      const translations = lesson.translations?.length && lesson.translations.map((ref) => {
        const lessonLang = ref.language
        const courseLangSlug = courseSlug[ref.language]?.current
        const lessonLangSlug = ref.slug.current

        return {
          language: ref.language,
          title: ref.title,
          path: [lessonLang, courseLangSlug, lessonLangSlug].join('/'),
        }
      })

      return [baseLanguageLesson, ...translations ? translations : []]
    })
}

function getLabelText(key = ``, labels = []) {
  return labels.find(({key: labelKey}) => labelKey === key)?.text
}

export function createCourseSummary(lessons = [], presenters = [], labels = []) {
  const value = []

  if (!labels.length) {
    return ``
  }

  const lessonSingular = getLabelText('lesson.singular', labels)
  const lessonPlural = getLabelText('lesson.plural', labels)
  const presenterSingular = getLabelText('presenter.singular', labels)
  const presenterPlural = getLabelText('presenter.plural', labels)

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

  return value.filter(Boolean).join(` `)
}
