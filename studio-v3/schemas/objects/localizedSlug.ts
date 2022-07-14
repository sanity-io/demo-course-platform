import {defineField, defineType} from 'sanity'

import {i18n} from '../../../languages'

export default defineType({
  name: 'localizedSlug',
  title: 'Localized Slug',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: i18n.languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'slug',
      fieldset: lang.isDefault ? undefined : 'translations',
      options: {
        source: `title.${lang.id}`,
      },
    })
  ),
})
