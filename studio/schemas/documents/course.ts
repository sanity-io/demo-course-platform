import {FiAward, FiBook, FiGlobe, FiUsers} from 'react-icons/fi'
import {defineType, defineField} from 'sanity'

import {i18n} from '../../../languages'

export default defineType({
  name: 'course',
  title: 'Course',
  icon: FiBook,
  type: 'document',
  groups: [
    {
      name: 'i18n',
      title: 'Localised',
      icon: FiGlobe,
      default: true,
    },
    {
      name: 'presenters',
      title: 'Presenters',
      icon: FiUsers,
    },
    {
      name: 'lessons',
      title: 'Lessons',
      icon: FiAward,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This is a localized string field, stored in an object',
      type: 'localizedString',
      group: ['i18n'],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'localizedSlug',
      group: ['i18n'],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'presenters',
      group: 'presenters',
      type: 'array',
      of: [
        defineField({
          name: 'presenter',
          type: 'reference',
          to: [{type: 'presenter'}],
        }),
      ],
    }),
    defineField({
      name: 'lessons',
      group: 'lessons',
      type: 'array',
      of: [
        defineField({
          name: 'lesson',
          title: 'Lesson',
          type: 'reference',
          to: [{type: 'lesson'}],
        }),
      ],
      validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
      lessonCount: 'lessons.length',
    },
    prepare({title, lessonCount}: {title: string; lessonCount: number}) {
      return {
        title,
        subtitle: lessonCount
          ? `${lessonCount} ${lessonCount === 1 ? `lesson` : `lessons`}`
          : 'No lessons',
        media: FiBook,
      }
    },
  },
})
