import {FiUser, FiGlobe, FiUsers, FiMapPin} from 'react-icons/fi'
import {defineField, defineType, Rule} from 'sanity'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

import {i18n} from '../../../languages'

export default defineType({
  name: 'presenter',
  title: 'Presenter',
  icon: FiUser,
  type: 'document',
  groups: [
    {
      name: 'common',
      title: 'Common',
      icon: FiUsers,
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
    defineField({
      name: 'name',
      group: 'common',
      type: 'string',
    }),
    internationalizedArray({
      name: 'title',
      type: 'string',
      languages: i18n.languages,
      group: 'localized',
      hidden: ({document}) => Boolean(!document?.name),
    }),
    internationalizedArray({
      name: 'biography',
      type: 'text',
      languages: i18n.languages,
      group: 'localized',
      hidden: ({document}) => Boolean(!document?.name),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      hidden: ({document}) => Boolean(!document?.name),
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      group: 'common',
      type: 'image',
      options: {hotspot: true},
      hidden: ({document}) => Boolean(!document?.title),
    }),
    defineField({
      name: 'availability',
      group: 'markets',
      type: 'array',
      hidden: ({document}) => Boolean(!document?.name),
      options: {
        layout: 'tags',
        list: i18n.languages.map((lang) => ({value: lang.id, title: lang.title})),
      },
      of: [{type: 'string'}],
    }),
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
})
