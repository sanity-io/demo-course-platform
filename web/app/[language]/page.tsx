import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import {HomeLayout} from '@/components/HomeLayout'
import {COMMON_PARAMS, getHome, getLabels} from '@/sanity/loaders'

import {i18n} from '../../../languages'

export default async function Page({params}) {
  const {language} = params
  const {isEnabled: preview} = draftMode()
  const queryParams = {...COMMON_PARAMS, language}
  const home = await getHome(queryParams, preview)
  const labels = await getLabels(queryParams, preview)

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}`,
      title: lang.title,
    }
  })

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <HomeLayout {...home} labels={labels} />
    </>
  )
}
