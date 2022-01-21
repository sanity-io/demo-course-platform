import GoogleTranslateInput from 'sanity-plugin-google-translate'

import {i18n} from '../../../../languages'

export default {
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: i18n.languages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'text',
    fieldset: lang.isDefault ? null : 'translations',
    rows: 3,
  })),
  inputComponent: GoogleTranslateInput,
  options: {
    apiKey: process.env.SANITY_STUDIO_GOOGLE_TRANSLATE_API_KEY,
  },
}
