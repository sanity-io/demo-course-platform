import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import PresenterLayout from '@/components/PresenterLayout'
import {PreviewWrapper} from '@/components/PreviewWrapper'
import {getPresenter} from '@/sanity/loaders'
import {presenterQuery} from '@/sanity/queries'

import {i18n} from '../../../../../languages'

export default async function Page({params}) {
  const {language, slug} = params
  const {isEnabled: preview} = draftMode()
  const data = await getPresenter(params, preview)

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/presenter/${slug}`,
    title: data?.title,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <PreviewWrapper preview={preview} data={data} query={presenterQuery} params={params}>
        <PresenterLayout />
      </PreviewWrapper>
    </>
  )
}
