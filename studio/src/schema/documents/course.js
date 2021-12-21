import {FiBook} from 'react-icons/fi'

import {i18n} from '../../../../languages'

export default {
  name: 'course',
  title: 'Course',
  icon: FiBook,
  type: 'document',
  fields: [
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
      name: 'slug',
      title: 'Slug',
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
        type: 'slug',
        fieldset: lang.isDefault ? null : 'translations',
        options: {source: `title.${lang.name}`},
      })),
    },
    {
      name: 'presenters',
      title: 'Presenters',
      type: 'array',
      of: [
        {
          name: 'presenter',
          title: 'Presenter',
          type: 'reference',
          to: [{type: 'presenter'}],
        },
      ],
    },
    {
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [
        {
          name: 'lesson',
          title: 'Lesson',
          type: 'reference',
          to: [{type: 'lesson'}],
        },
      ],
      options: {
        filter: '__i18n_lang == $base',
        filterParams: {base: i18n.base},
      },
      validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    },
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
      lessonCount: 'lessons.length',
    },
    prepare({title, lessonCount}) {
      return {
        title,
        subtitle: lessonCount
          ? `${lessonCount} ${lessonCount === 1 ? `lesson` : `lessons`}`
          : 'No lessons',
        media: FiBook,
      }
    },
  },
}
