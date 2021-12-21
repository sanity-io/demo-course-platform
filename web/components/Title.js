import React from 'react'

export default function Title({subtitle = ``, children}) {
  return (
    <header className="grid grid-cols-1 gap-y-2 md:gap-y-4 xl:gap-y-8">
      <h1 className="text-4xl md:text-4xl xl:text-7xl max-w-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-t from-cyan-600 to-cyan-900">
        {children ?? `Untitled`}
      </h1>
      {subtitle ? (
        <h2 className="uppercase tracking-widest font-bold text-xs text-cyan-500">{subtitle}</h2>
      ) : null}
    </header>
  )
}
