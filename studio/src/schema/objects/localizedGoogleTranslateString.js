import GoogleTranslateInput from 'sanity-plugin-google-translate'

export default {
  name: 'localizedGoogleTranslateString',
  title: 'Localized String',
  type: 'localizedString',
  inputComponent: GoogleTranslateInput,
  options: {
    apiKey: process.env.SANITY_STUDIO_GOOGLE_TRANSLATE_API_KEY,
  },
}
