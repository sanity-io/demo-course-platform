import React from 'react'
import {TypedObject} from 'sanity'

import Prose from './Prose'
import Title from './Title'

type LegalLayoutProps = {
  title: string
  content: TypedObject[]
}

export default function LegalLayout(props: LegalLayoutProps) {
  const {title, content = []} = props

  return (
    <section className="pt-16">
      <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16 flex flex-col justify-start items-start gap-4 xl:gap-8">
        {title ? <Title>{title}</Title> : null}
        {content && content.length > 0 ? <Prose value={content} /> : null}
      </div>
    </section>
  )
}
