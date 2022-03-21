import React from 'react'

export default function Title({subtitle = ``, children}) {
  return (
    <header className="grid grid-cols-1 gap-y-4">
      <h1 className="text-3xl md:text-4xl xl:text-7xl max-w-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-t from-cyan-600 to-cyan-900">
        {children && typeof children === 'string' ? children : `Untitled`}
      </h1>
      {subtitle && typeof subtitle === 'string' ? (
        <h2 className="uppercase md:tracking-widest font-bold text-xs md:text-sm text-cyan-500">
          {subtitle}
        </h2>
      ) : null}
    </header>
  )
}
