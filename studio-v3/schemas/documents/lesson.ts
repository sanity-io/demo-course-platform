import {FiAward} from 'react-icons/fi'
import {defineField, defineType, Rule} from 'sanity'
// import sanityClient from 'part:@sanity/base/client'

import {i18n} from '../../../languages'

// const client = sanityClient.withConfig({apiVersion: `2021-05-19`})

// Allow same slugs for different language versions of the same document
// function isUniqueOutsideOfTranslations(slug, options) {
//   const {document} = options

//   const id = document._id.replace(/^drafts\./, '')
//   const published = id
//   const base = document?.__i18n_base?._ref
//   const translations = document?.__i18n_refs?.length
//     ? document.__i18n_refs.map(({_ref}) => _ref)
//     : []

//   const params = {
//     ids: [published, base, ...translations]
//       .filter(Boolean)
//       .map((lookupId) => [lookupId, `drafts.${lookupId}`])
//       .flat(),
//     type: document._type,
//     slug,
//   }

//   // Is there at least one document of the same type but not a translation that has the same slug
//   const query = `!defined(*[_type == $type && slug.current == $slug && !(_id in $ids)][0]._id)`

//   return client.fetch(query, params)
// }

export default defineType({
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
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        // isUnique: isUniqueOutsideOfTranslations
      },
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (Rule: Rule) => Rule.max(200),
    }),
    defineField({
      name: 'content',
      type: 'portableText',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: '__i18n_lang',
      translations: '__i18n_refs.length',
      media: 'image',
    },
    prepare({
      title,
      language,
      translations,
      media,
    }: {
      title: string
      language: string
      translations: number
      media: unknown
    }) {
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
})
