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

  return lessons.map((lesson) => {
    const courseSlugBase = courseSlug[lesson.__i18n_lang]?.current

    const baseLanguageLesson = {
      language: lesson.__i18n_lang, // Should always be i18n.base
      title: lesson.title,
      path: `/${[courseSlugBase, lesson.slug.current].join('/')}`,
    }

    const translations = lesson.__i18n_refs.map((ref) => {
      const lessonLang = ref.__i18n_lang
      const courseLangSlug = courseSlug[ref.__i18n_lang].current
      const lessonLangSlug = ref.slug.current

      return {
        language: ref.__i18n_lang, // Should never be i18n.base
        title: ref.title,
        path: `/${[lessonLang, courseLangSlug, lessonLangSlug].join('/')}`,
      }
    })

    return [baseLanguageLesson, ...translations]
  })
}

export function createCourseSummary(lessons = [], presenters = []) {
  const value = []

  if (lessons.length) {
    value.push(lessons.length)
    value.push(lessons.length === 1 ? `Lesson` : `Lessons`)
  }

  if (presenters.length) {
    value.push(`//`)
    value.push(presenters.length)
    value.push(presenters.length === 1 ? `Presenter` : `Presenters`)
  }

  return value.join(` `)
}
