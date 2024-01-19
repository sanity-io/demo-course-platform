import {FiUser, FiGlobe, FiUsers, FiMapPin} from 'react-icons/fi'
import {defineField, defineType, KeyedObject} from 'sanity'

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
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      group: 'localized',
      hidden: (context) => context?.document?.name === undefined,
      options: {
        aiWritingAssistance: {
          translateAction: true,
        },
      },
    }),
    defineField({
      name: 'biography',
      type: 'internationalizedArrayText',
      group: 'localized',
      hidden: (context) => context?.document?.name === undefined,
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      hidden: (context) => context?.document?.name === undefined,
    }),
    defineField({
      name: 'photo',
      group: 'common',
      type: 'image',
      options: {hotspot: true},
      hidden: (context) => context?.document?.title === undefined,
    }),
    defineField({
      name: 'availability',
      group: 'markets',
      type: 'array',
      hidden: (context) => context?.document?.name === undefined,
      options: {
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
      const subtitleText = subtitle?.length
        ? subtitle?.find((v: KeyedObject) => v?._key === 'en')?.value
        : ``

      return {
        title,
        subtitle: subtitleText ?? ``,
        media,
      }
    },
  },
})
