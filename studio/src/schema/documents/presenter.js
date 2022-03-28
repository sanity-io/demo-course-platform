import {FiUser, FiGlobe, FiUsers, FiMapPin} from 'react-icons/fi'
import {i18n} from '../../../../languages'

export default {
  name: 'presenter',
  title: 'Presenter',
  icon: FiUser,
  type: 'document',
  groups: [
    {
      name: 'common',
      title: 'Common',
      icon: FiUsers,
      // default: true,
    },

    {
      name: 'localized',
      title: 'Localized',
      icon: FiGlobe,
    },
    {
      name: 'markets',
      title: 'Markets',
      icon: FiMapPin,
    },
  ],
  fields: [
    {
      name: 'name',
      group: 'common',
      type: 'string',
    },

    {
      name: 'title',
      type: 'localizedGoogleTranslateString',
      group: 'localized',
      hidden: ({document}) => !document.name,
    },
    {
      name: 'biography',
      group: 'localized',
      type: 'localizedText',
      hidden: ({document}) => !document.title,
    },
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      hidden: ({document}) => !document.name,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'photo',
      group: 'common',
      type: 'image',
      options: {hotspot: true},
      hidden: ({document}) => !document.title,
    },
    {
      name: 'availability',
      group: 'markets',
      type: 'array',
      hidden: ({document}) => !document.name,
      options: {
        layout: 'tags',
        list: i18n.languages.map((lang) => ({value: lang.id, title: lang.title})),
      },
      of: [{type: 'string'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title.en_US',
      media: 'photo',
    },
  },
}
