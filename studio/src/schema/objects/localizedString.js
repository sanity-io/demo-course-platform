import {i18n} from '../../../../languages'

export default {
  name: 'localizedString',
  title: 'Localized String',
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
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
