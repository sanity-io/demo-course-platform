import Header from '@/components/Header'
import PresenterLayout from '@/components/PresenterLayout'
import {getPresenter} from '@/sanity/loaders'

import {i18n} from '../../../../../languages'

export default async function Page({params}) {
  const {language, slug} = params
  const data = await getPresenter({language, slug})

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/presenter/${slug}`,
    title: data?.title,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <PresenterLayout {...data} />
    </>
  )
}
