import {FiArchive} from 'react-icons/fi'
import {defineType, defineField} from 'sanity'

import portableText from '../objects/portableText'

export default defineType({
  name: 'legal',
  title: 'Legal',
  icon: FiArchive,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'marketContent'}, ...portableText.of],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: `/legal/${slug}`,
        media: FiArchive,
      }
    },
  },
})
