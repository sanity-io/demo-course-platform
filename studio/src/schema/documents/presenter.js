import {FiUser} from 'react-icons/fi'

import {i18n} from '../../../../languages'

export default {
  name: 'presenter',
  title: 'Presenter',
  icon: FiUser,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fieldsets: [
        {
          title: 'Translations',
          name: 'translations',
          options: {collapsible: true},
        },
      ],
      fields: i18n.languages.map((lang) => ({
        ...lang,
        type: 'string',
        fieldset: lang.isDefault ? null : 'translations',
      })),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title.en_US',
      media: 'image',
    },
  },
}
