import {getEmojiFlag} from '@cprecioso/country-flag-emoji'
import {supportedEmojiFlagCodes} from './supportedEmojiFlagCodes'

// Get flag from a valid country code
export const getFlag = (code = ``) => {
  if (!code) {
    return ``
  }

  const flagCode = getFlagCode(code)

  if (!supportedEmojiFlagCodes.includes(flagCode.toUpperCase())) {
    return ``
  }

  const emoji = getEmojiFlag(flagCode)

  return emoji
}

// Convert some language codes to country codes
export const getFlagCode = (code = ``) => {
  if (!code) {
    return ``
  }

  // Get last element if code contains - or _
  const codeLocation = code.split(new RegExp(`[-_]`)).pop()

  switch (codeLocation) {
    case `en`:
      return `gb`

    default:
      return codeLocation
  }
}
