import {QueryParams, SanityDocument} from 'next-sanity'

import {Label} from '@/lib/types'

import {i18n} from '../../languages'
import {cleanClient, sanityFetch} from './client'
import {courseSlugsQuery, homeQuery, labelsQuery, legalsQuery, lessonSlugsQuery} from './queries'

export const COMMON_PARAMS = {
  defaultLocale: i18n.base,
}

// Helper functions for re-used queries
export async function getHome(params: QueryParams) {
  return sanityFetch<{courses: SanityDocument[]}>({
    query: homeQuery,
    params,
    tags: ['home'],
  })
}

export async function getLabels(params: QueryParams) {
  return sanityFetch<Label[]>({
    query: labelsQuery,
    params,
    tags: ['labels'],
  })
}

export async function getLegals(params: QueryParams) {
  return sanityFetch<SanityDocument[]>({
    query: legalsQuery,
    params,
    tags: ['legals'],
  })
}

// "Clean client" used because we never want encoding in these fetches
export const getCoursesWithSlugs = () => cleanClient.fetch(courseSlugsQuery)
export const getLessonsWithSlugs = () => cleanClient.fetch(lessonSlugsQuery, COMMON_PARAMS)
