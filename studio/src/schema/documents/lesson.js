/* eslint-disable camelcase */
import {FiAward} from 'react-icons/fi'

import {i18n} from '../../../../languages'

export default {
  name: 'lesson',
  title: 'Lesson',
  i18n,
  initialValue: {
    __i18n_lang: i18n.base,
    __i18n_refs: [],
  },
  icon: FiAward,
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'content',
      type: 'portableText',
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
      const subtitle = language
        ? [
            language,
            translations > 0
              ? `${translations} ${translations === 1 ? `translation` : `translations`}`
              : `No translations`,
          ]
            .filter(Boolean)
            .join(` | `)
        : ``

      return {
        title,
        subtitle,
        media,
      }
    },
  },
}
