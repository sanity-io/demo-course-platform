import React from 'react'
import {Card, Flex} from '@sanity/ui'

// eslint-disable-next-line import/no-unresolved, no-unused-vars
import {getFlag} from './getFlag'

const style = {width: `100%`, height: `100%`}

export default function Flag({market}: {market?: string}) {
  const flagEmoji = React.useMemo(() => (market ? getFlag(market) : ``), [market])

  if (!market) {
    return null
  }

  return (
    <Card tone="default" style={style}>
      <Flex align="center" justify="center" style={style}>
        <div className="media-flag">{flagEmoji}</div>
      </Flex>
    </Card>
  )
}
