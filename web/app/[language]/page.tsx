import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import {HomeLayout} from '@/components/HomeLayout'
import {getHome, getLabels} from '@/sanity/loaders'

import {i18n} from '../../../languages'

export default async function Page({params}) {
  const {language} = params
  const {isEnabled: preview} = draftMode()
  const home = await getHome(params, preview)
  const labels = await getLabels(params, preview)

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
