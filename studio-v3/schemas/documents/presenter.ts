import {FiUser, FiGlobe, FiUsers, FiMapPin} from 'react-icons/fi'
import {defineField, defineType, Rule} from 'sanity'
// import {internationalizedArrayField} from 'sanity-plugin-internationalized-array'

import {i18n} from '../../../languages'

export default defineType({
  name: 'presenter',
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
    }),
    defineField({
      name: 'biography',
      type: 'internationalizedArrayText',
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
  // preview: {
  //   select: {
  //     title: 'name',
  //     subtitle: 'title',
  //     media: 'photo',
  //   },
  //   prepare({title, subtitle, media}: {title: any; subtitle: any; media: any}) {
  //     const subtitleText = subtitle?.length ? subtitle?.find((v) => v?._key === 'en')?.value : ``

  //     return {
  //       title,
  //       subtitle: subtitleText ?? ``,
  //       media,
  //     }
  //   },
  // },
})
