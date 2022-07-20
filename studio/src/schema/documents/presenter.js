import {internationalizedArray} from 'sanity-plugin-internationalized-array'
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
    internationalizedArray({
      name: 'title',
      type: 'string',
      languages: i18n.languages,
      group: 'localized',
      hidden: ({document}) => !document.name,
      // readOnly: true,
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          const businessItems = value.filter((v) => v.value?.startsWith(`Business`))
          if (businessItems.length) {
            return {
              message: `No business`,
              paths: businessItems.map((v) => ({_key: v._key})),
            }
          }

          return true
        }),
    }),
    internationalizedArray({
      name: 'biography',
      type: 'text',
      languages: i18n.languages,
      group: 'localized',
      hidden: ({document}) => !document.name,
    }),
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
      subtitle: 'title',
      media: 'photo',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle?.length ? subtitle.find((s) => s._key === `en_US`).value : ``,
        media,
      }
    },
  },
}
