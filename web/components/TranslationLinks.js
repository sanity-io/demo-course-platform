import React, {useMemo} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import {i18n} from '../../languages'

export default function TranslationLinks({translations = []}) {
  const {locale} = useRouter()

  const availableTranslations = useMemo(
    () =>
      i18n.languages.map((language) => {
        const availableTranslation =
          translations.find((translation) => translation.language === language.id) ?? {}

        return {
          language: language.id,
          ...availableTranslation,
        }
      }),
    [translations]
  )

  return (
    <ul className="inline-flex items-center divide-x divide-gray-100 border border-white rounded-md overflow-hidden">
      {availableTranslations.map((version) => (
        <li
          key={version.language}
          className={`transition-colors duration-200 ${
            version.language === locale
              ? `bg-white pointer-events-none`
              : `bg-white/50 hover:bg-cyan-100`
          }`}
        >
          {version?.path ? (
            <Link href={version.path} locale={version.language} className="flex items-center group leading-none">

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
