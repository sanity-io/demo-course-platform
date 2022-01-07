import {localizeInput} from 'sanity-plugin-google-translate'
import {googleTranslateLanguages} from '../../../../languages'

export default localizeInput({
  name: 'googleTranslateString',
  type: {
    type: 'string',
  },
  title: 'Localized String',
  languages: googleTranslateLanguages,
  collapsible: true,
  collapsed: false,
  apiKey: process.env.SANITY_STUDIO_GOOGLE_TRANSLATE_API_KEY,
})
