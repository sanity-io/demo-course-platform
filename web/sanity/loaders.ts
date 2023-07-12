import {i18n} from '../../languages'
import {cachedClientFetch, cleanClient} from './client'
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

// Helper functions for re-used queries
export const getHome = (params: ParamsLanguage, preview = false) =>
  cachedClientFetch(preview)(homeQuery, params)

export const getLabels = (params: ParamsLanguage, preview = false) =>
  cachedClientFetch(preview)(labelsQuery, params)

export const getLegals = (params: ParamsLanguage, preview = false) =>
  cachedClientFetch(preview)(legalsQuery, params)

// "Clean client" used because we never want encoding in these fetches
export const getCoursesWithSlugs = () => cleanClient.fetch(courseSlugsQuery)
export const getLessonsWithSlugs = () => cleanClient.fetch(lessonSlugsQuery, COMMON_PARAMS)
