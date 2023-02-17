// import GoogleTranslateInput from 'sanity-plugin-google-translate'
import {defineType} from 'sanity'

export default defineType({
  name: 'localizedGoogleTranslateString',
  title: 'Localized String',
  type: 'localizedString',
  // inputComponent: GoogleTranslateInput,
  // options: {
  //   apiKey: process.env.SANITY_STUDIO_GOOGLE_TRANSLATE_API_KEY,
  // },
})
