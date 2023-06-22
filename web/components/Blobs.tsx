import {GlobeAltIcon, LanguageIcon} from '@heroicons/react/24/outline'
import React from 'react'

export default function Blobs() {
  return (
    <div className="absolute md:fixed top-0 right-0 -z-[1] opacity-50 text-white overflow-hidden h-screen w-screen pointer-events-none">
      <div className="absolute top-12 right-48 animate-breathe-1 mix-blend-multiply bg-pink-400 w-48 md:w-96 aspect-square rotate-12 blur-lg">
        <LanguageIcon className="w-full h-full" />
      </div>
      <div className="absolute top-40 right-12 animate-breathe-2 mix-blend-multiply bg-cyan-400 w-48 h-48 md:w-96 md:h-96 rounded-full blur-lg">
        <GlobeAltIcon className="w-full h-full" />
      </div>
      <div className="absolute top-12 right-12 animate-breathe-3 mix-blend-multiply bg-yellow-400 w-32 h-32 md:w-64 md:h-64 rounded-full blur-lg" />
    </div>
  )
}
