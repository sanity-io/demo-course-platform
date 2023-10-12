'use client'

import clsx from 'clsx'
import Link from 'next/link'
import {useParams} from 'next/navigation'
import React, {useMemo} from 'react'

import {Translation} from '@/lib/types'

import {i18n} from '../../languages'
import {clean} from './Clean'

type TranslationLinksProps = {
  translations: Translation[]
}

export default function TranslationLinks(props: TranslationLinksProps) {
  const {translations = []} = props
  const params = useParams()
  const language = Array.isArray(params.language) ? params.language[0] : params.language

  const availableTranslations = useMemo<Translation[]>(
    () =>
      i18n.languages.reduce<Translation[]>((acc, cur) => {
        const availableTranslation = translations.find(
          (translation) => translation.language === cur.id
        )
        return availableTranslation ? [...acc, availableTranslation] : acc
      }, []),
    [translations]
  )

  return (
    <ul className="inline-flex items-center divide-x divide-gray-100 border border-white rounded-md overflow-hidden">
      {availableTranslations.map((version) => (
        <li
          key={version.language}
          className={clsx(
            `transition-colors duration-200`,
            version.language === language
              ? `bg-white pointer-events-none`
              : `bg-white/50 hover:bg-cyan-100`
          )}
        >
          {version?.path ? (
            <Link
              href={clean(version.path)}
              locale={version.language}
              className="flex items-center group leading-none"
            >
              <span className="block uppercase font-mono text-xs tracking-widest py-2 px-3">
                {version.language}
              </span>
              <span className="sr-only">{version.title}</span>
            </Link>
          ) : (
            <span className="flex items-center group leading-none opacity-25 pointer-events-none">
              <span className="block uppercase font-mono text-xs tracking-widest py-2 px-3">
                {version.language}
              </span>
              <span className="sr-only">{version.title}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
