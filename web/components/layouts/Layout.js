import React from 'react'
import {TranslateIcon} from '@heroicons/react/outline'

import Link from 'next/link'
import TranslationLinks from '../TranslationLinks'
import Meta from '../Meta'

export default function Layout({translations, children}) {
  return (
    <>
      <Meta translations={translations} />

      <header className="bg-cyan-100/50 border-b border-cyan-50 text-cyan-900 font-bold fixed top-0 w-screen h-header flex items-center backdrop-blur z-20">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
          <h1 className="mr-auto">
            <Link href="/">
              <a className="block transition-colors duration-200 font-display font-bold group relative z-0">
                <span className="flex items-center relative z-10 group-hover:text-cyan-700">
                  <TranslateIcon className="text-cyan-500 group-hover:text-pink-400 w-6 h-6 mr-2" />
                  Course Platform
                </span>
                <span className="pointer-events-none absolute inset-0 rounded-md -my-2 group-hover:scale-110  bg-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </a>
            </Link>
          </h1>
          <TranslationLinks translations={translations} />
        </div>
      </header>
      {children}
    </>
  )
}
