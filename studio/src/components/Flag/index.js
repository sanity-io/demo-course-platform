import PropTypes from 'prop-types'
import React from 'react'
import emoji from 'react-easy-emoji'
import {Card, Flex} from '@sanity/ui'

// eslint-disable-next-line import/no-unresolved, no-unused-vars
import mediaFlag from './media-flag.css?raw'
import {getFlag} from './getFlag'

const style = {width: `100%`, height: `100%`}

export default function Flag({market}) {
  const flagEmoji = React.useMemo(
    () =>
      market
        ? emoji(getFlag(market), {
            baseUrl: 'https://twemoji.maxcdn.com/2/svg/',
            ext: '.svg',
            size: '',
          })
        : ``,
    [market]
  )

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

Flag.propTypes = {
  market: PropTypes.string.isRequired,
}
