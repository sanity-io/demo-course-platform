import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import ReactCountryFlag from 'react-country-flag'
import emojiSupport from 'detect-emoji-support'

import {extractCountryFromCode} from '../lib/helpers'

const canUseEmoji = emojiSupport()

/**
 * Accepts a language or language_country string and returns a flag emoji or SVG
 *
 * @param {string} props.language The language and possibly also the country code
 */
export default function Flag({language, className}) {
  const country = useMemo(() => extractCountryFromCode(language), [language])

  return (
    <ReactCountryFlag
      className={`scale-150 ${className}`}
      countryCode={country}
      aria-label={language}
      svg={!canUseEmoji}
    />
  )
}

Flag.propTypes = {
  language: PropTypes.string.isRequired,
}
