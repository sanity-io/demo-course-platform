import {FiAward} from 'react-icons/fi'

import {i18n} from '../../../../languages'

export default {
  name: 'lesson',
  title: 'Lesson',
  icon: FiAward,
  type: 'document',
  i18n,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}, {type: 'code'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: '__i18n_lang',
      translations: '__i18n_refs.length',
      media: 'image',
    },
    prepare({title, language, translations, media}) {
      return {
        title: `${title}`,
        subtitle: `${language} | ${
          translations > 0
            ? `${translations} ${translations === 1 ? `translation` : `translations`}`
            : `No translations`
        }`,
        media,
      }
    },
  },
}
