import {i18n} from '../../languages'
import {cachedClientFetch} from './client'
import {
  courseQuery,
  courseSlugsQuery,
  homeQuery,
  labelsQuery,
  legalQuery,
  legalsQuery,
  lessonQuery,
  lessonSlugsQuery,
  presenterQuery,
} from './queries'

const globalParams = {
  defaultLocale: i18n.base,
}

export const getHome = ({language}: {language: string}) =>
  cachedClientFetch(homeQuery, {...globalParams, language})

export const getLabels = ({language}) => cachedClientFetch(labelsQuery, {...globalParams, language})

export const getLegals = ({language}: {language: string}) =>
  cachedClientFetch(legalsQuery, {...globalParams, language})

export const getCourse = ({slug, language}: {slug: string; language: string}) =>
  cachedClientFetch(courseQuery, {...globalParams, slug, language})

export const getLesson = ({slug, language}: {slug: string; language: string}) =>
  cachedClientFetch(lessonQuery, {...globalParams, slug, language})

export const getLegal = ({slug, language}: {slug: string; language: string}) =>
  cachedClientFetch(legalQuery, {...globalParams, slug, language})

export const getPresenter = ({slug, language}: {slug: string; language: string}) =>
  cachedClientFetch(presenterQuery, {...globalParams, slug, language})

export const getCoursesWithSlugs = () => cachedClientFetch(courseSlugsQuery)
export const getLessonsWithSlugs = () => cachedClientFetch(lessonSlugsQuery, globalParams)
