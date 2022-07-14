import {BulbOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'tone',
      type: 'string',
      options: {
        list: [
          {value: 'positive', title: 'Positive'},
          {value: 'caution', title: 'Caution'},
        ],
      },
      initialValue: 'positive',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'tone',
    },
  },
})
