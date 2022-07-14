import {FiAward, FiBook, FiGlobe, FiUsers} from 'react-icons/fi'
import {defineType, defineField, Rule} from 'sanity'

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
      type: 'localizedString',
      group: ['i18n'],
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'localizedSlug',
      group: ['i18n'],
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'presenters',
      group: 'presenters',
      type: 'array',
      of: [
        defineField({
          name: 'presenter',
          title: 'Presenter',
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
          options: {
            disableNew: false,
            filter: '__i18n_lang == $base',
            filterParams: {base: i18n.base},
          },
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
