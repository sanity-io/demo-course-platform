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

type ParamsLanguage = {
  language: string
}

type ParamsSlugLanguage = {
  slug: string
  language: string
}

const globalParams = {
  defaultLocale: i18n.base,
}

export const getHome = (params: ParamsLanguage, preview = false) =>
  cachedClientFetch(preview)(homeQuery, {...globalParams, ...params})

export const getLabels = (params: ParamsLanguage, preview = false) =>
  cachedClientFetch(preview)(labelsQuery, {...globalParams, ...params})

export const getLegals = (params: ParamsLanguage, preview = false) =>
  cachedClientFetch(preview)(legalsQuery, {...globalParams, ...params})

export const getCourse = (params: ParamsSlugLanguage, preview = false) =>
  cachedClientFetch(preview)(courseQuery, {...globalParams, ...params})

export const getLesson = (params: ParamsSlugLanguage, preview = false) =>
  cachedClientFetch(preview)(lessonQuery, {...globalParams, ...params})

export const getLegal = (params: ParamsSlugLanguage, preview = false) =>
  cachedClientFetch(preview)(legalQuery, {...globalParams, ...params})

export const getPresenter = (params: ParamsSlugLanguage, preview = false) =>
  cachedClientFetch(preview)(presenterQuery, {...globalParams, ...params})

export const getCoursesWithSlugs = (preview = false) => cachedClientFetch(preview)(courseSlugsQuery)
export const getLessonsWithSlugs = (preview = false) =>
  cachedClientFetch(preview)(lessonSlugsQuery, globalParams)
