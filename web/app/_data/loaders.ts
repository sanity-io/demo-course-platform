import {cachedClientFetch} from '../../lib/sanity.client'
import {labelsQuery, homeQuery, legalsQuery, courseQuery} from './queries'
import {i18n} from '../../../languages'
import {Label} from '../types'

const globalParams = {
  defaultLocale: i18n.base,
}

export const getHome = ({language = ''}: {language: string}) =>
  cachedClientFetch(homeQuery, {...globalParams, language})

export const getLabels = ({language = ''}) =>
  cachedClientFetch(labelsQuery, {...globalParams, language})

export const getLegals = ({language = ''}: {language: string}) =>
  cachedClientFetch(legalsQuery, {...globalParams, language})

export const getCourse = ({slug = ''}: {slug: string}) =>
  cachedClientFetch(courseQuery, {...globalParams, slug})
