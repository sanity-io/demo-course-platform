import {localizeInput} from 'sanity-plugin-google-translate'
import {googleTranslateLanguages} from '../../../../languages'

const localizedString = localizeInput({
  name: 'localizedString',
  type: {
    type: 'string',
  },
  title: 'Localized String',
  languages: googleTranslateLanguages,
  isCollapsible: false,
  isCollapsed: false,
  apiKey: process.env.SANITY_STUDIO_GOOGLE_TRANSLATE_API_KEY,
})

export default localizedString
