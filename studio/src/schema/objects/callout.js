import {BulbOutlineIcon} from '@sanity/icons'

export default {
  name: 'callout',
  title: 'Callout',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    {
      name: 'tone',
      type: 'string',
      options: {
        list: [
          {value: 'positive', title: 'Positive'},
          {value: 'caution', title: 'Caution'},
        ],
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'tone',
    },
  },
}
