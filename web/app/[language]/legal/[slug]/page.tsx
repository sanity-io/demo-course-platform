import {Metadata} from 'next'
import {draftMode} from 'next/headers'

import Header from '@/components/Header'
import LegalLayout from '@/components/LegalLayout'
import {PreviewWrapper} from '@/components/PreviewWrapper'
import {getLegal} from '@/sanity/loaders'
import {legalQuery} from '@/sanity/queries'

import {i18n} from '../../../../../languages'

export const metadata: Metadata = {
  title: 'Legal Page',
}

export default async function Page({params}) {
  const {language, slug} = params
  const {isEnabled: preview} = draftMode()
  const data = await getLegal(params, preview)

  const translations = i18n.languages.map((lang) => ({
    language: lang.id,
    path: `/${lang.id}/legal/${slug}`,
    title: data.title,
  }))

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <PreviewWrapper preview={preview} initialData={data} query={legalQuery} params={params}>
        <LegalLayout />
      </PreviewWrapper>
    </>
  )
}
