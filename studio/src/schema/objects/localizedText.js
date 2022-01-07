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
}
