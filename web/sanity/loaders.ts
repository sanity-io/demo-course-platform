import {i18n} from '../../languages'
import {cachedClientFetch} from './client'
import {courseSlugsQuery, homeQuery, labelsQuery, legalsQuery, lessonSlugsQuery} from './queries'

type CommonParams = {
  defaultLocale: string
}

type ParamsLanguage = CommonParams & {
  language: string
}

export const COMMON_PARAMS = {
  defaultLocale: i18n.base,
}

// Helper functions for re-used or non-preview queries
export const getHome = (params: ParamsLanguage, preview = false) =>
  cachedClientFetch(preview)(homeQuery, params)

export const getLabels = (params: ParamsLanguage, preview = false) =>
  cachedClientFetch(preview)(labelsQuery, params)

export const getLegals = (params: ParamsLanguage, preview = false) =>
  cachedClientFetch(preview)(legalsQuery, params)

export const getCoursesWithSlugs = (preview = false) => cachedClientFetch(preview)(courseSlugsQuery)
export const getLessonsWithSlugs = (preview = false) =>
  cachedClientFetch(preview)(lessonSlugsQuery, COMMON_PARAMS)
