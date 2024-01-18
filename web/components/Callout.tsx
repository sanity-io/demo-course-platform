import {CheckCircleIcon, ExclamationCircleIcon, XCircleIcon} from '@heroicons/react/24/outline'
import {PortableText} from '@portabletext/react'
import React from 'react'

const toneClasses = {
  default: `p-6 pr-12 border border-dashed rounded-lg flex items-start gap-4`,
  positive: 'border-green-500 bg-green-100 text-green-600 shadow-lg shadow-green-100',
  caution: 'border-yellow-500 bg-yellow-100 text-yellow-600 shadow-lg shadow-yellow-100',
  error: 'border-red-500 bg-red-100 text-red-600 shadow-lg shadow-red-100',
}

const toneIcons = {
  positive: CheckCircleIcon,
  caution: ExclamationCircleIcon,
  error: XCircleIcon,
}

export default function Callout({tone = `positive`, content = []}) {
  const classNames = [toneClasses.default, toneClasses[tone]].join(' ')

  return (
    <div className={classNames}>
      {/* {React.createElement(toneIcons[tone], {
        className: `w-6 md:w-10 h-auto scale-150 transform -rotate-[10deg]`,
      })}
      <PortableText value={content} /> */}
    </div>
  )
}
