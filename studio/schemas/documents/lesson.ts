import {FiAward} from 'react-icons/fi'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'lesson',
  title: 'Lesson',
  icon: FiAward,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) =>
        rule.required().error('A slug is required to generate a page on the website'),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200).warning('Summary should be less than 200 characters'),
    }),
    defineField({
      name: 'content',
      type: 'portableText',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      media: 'image',
    },
    prepare(select) {
      const {title, language, media} = select

      return {
        title,
        subtitle: language.toUpperCase(),
        media,
      }
    },
  },
})
