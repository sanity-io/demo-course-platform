import {defineType} from 'sanity'

export default defineType({
  name: 'localizedGoogleTranslateString',
  title: 'Localized String',
  type: 'localizedString',
  options: {
    apiKey: process.env.SANITY_STUDIO_GOOGLE_TRANSLATE_API_KEY,
    translate: true,
  },
})
