import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import Flag from './Flag'

export default function TranslationLinks({translations = []}) {
  const {locale} = useRouter()

  return (
    <ul className="inline-flex items-center divide-x divide-gray-100 border border-white rounded-md overflow-hidden">
      {translations.map((version) => (
        <li
          key={version.language}
          className={`transition-colors duration-200 ${
            version.language === locale
              ? `bg-white pointer-events-none`
              : `bg-white/50 hover:bg-cyan-100`
          }`}
        >
          <Link href={version.path} locale={version.language}>
            <a className="flex items-center group leading-none">
              <span className="block p-3">
                <Flag
                  className="transition-transform duration-200 group-hover:scale-[1.8]"
                  language={version.language}
                />
              </span>
              <span className="sr-only">{version.title}</span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
