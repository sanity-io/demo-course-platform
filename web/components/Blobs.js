import React from 'react'
import {GlobeAltIcon, TranslateIcon} from '@heroicons/react/outline'

export default function Blobs() {
  return (
    <div className="absolute md:fixed top-0 right-0 -z-[1] opacity-50 text-white overflow-hidden h-screen w-screen pointer-events-none">
      <div className="absolute top-12 right-48 animate-breathe-1 mix-blend-multiply bg-pink-400 w-96 aspect-square rotate-12 blur-lg">
        <TranslateIcon className="w-full h-full" />
      </div>
      <div className="absolute top-40 right-12 animate-breathe-2 mix-blend-multiply bg-cyan-400 w-96 h-96 rounded-full blur-lg">
        <GlobeAltIcon className="w-full h-full" />
      </div>
      <div className="absolute top-12 right-12 animate-breathe-3 mix-blend-multiply bg-yellow-400 w-64 h-64 rounded-full blur-lg" />
    </div>
  )
}
