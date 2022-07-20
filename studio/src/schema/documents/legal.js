import {FiArchive} from 'react-icons/fi'

import portableText from '../objects/portableText'

export default {
  name: 'legal',
  title: 'Legal',
  icon: FiArchive,
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    },
    {
      name: 'content',
      type: 'array',
      of: [{type: 'marketContent'}, ...portableText.of],
    },
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
}
