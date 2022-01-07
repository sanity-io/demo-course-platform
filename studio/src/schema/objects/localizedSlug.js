import {i18n} from '../../../../languages'

export default {
  name: 'localizedSlug',
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
    type: 'slug',
    fieldset: lang.isDefault ? null : 'translations',
    options: {
      source: `title.${lang.id}`,
    },
  })),
}
