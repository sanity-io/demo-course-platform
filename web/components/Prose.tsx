import {PortableText} from '@portabletext/react'
import {TypedObject} from 'sanity'

import {portableTextComponents} from '@/sanity/portableTextComponents'

type ProseProps = {
  value: TypedObject[]
}

export default function Prose(props: ProseProps) {
  const {value} = props

  if (!value || !value.length) {
    return null
  }

  return (
    <div className="prose prose-slate md:prose-lg lg:prose-xl w-full prose-h2:text-cyan-800 prose-h3:text-cyan-700 prose-a:text-cyan-500 prose-a:transition-colors prose-a:duration-200 hover:prose-a:text-pink-500 prose-code:text-pink-700 prose-h2:font-display prose-h3:font-display">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  )
}
