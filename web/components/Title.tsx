import {PropsWithChildren} from 'react'

import Subtitle from './Subtitle'

type TitleProps = PropsWithChildren<{
  subtitle?: string
}>

export default function Title(props: TitleProps) {
  const {subtitle = ``, children} = props

  return (
    <header className="grid grid-cols-1 gap-y-4">
      <h1 className="text-3xl md:text-4xl xl:text-7xl max-w-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-t from-cyan-600 to-cyan-900">
        {children && typeof children === 'string' ? children : `Untitled`}
      </h1>
      {subtitle ? <Subtitle subtitle={subtitle} /> : null}
    </header>
  )
}
