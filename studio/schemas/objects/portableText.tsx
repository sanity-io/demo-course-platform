import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [
    defineField({
      name: 'block',
      type: 'block',
      styles: [
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          defineField({
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          }),
          defineField({
            name: 'reference',
            type: 'reference',
            to: [{type: 'lesson'}],
          }),
        ],
      },
      of: [{type: 'marketContent', title: 'Inline Market Content'}],
    }),
    defineField({name: 'image', type: 'image', icon: ImageIcon}),
    defineField({name: 'callout', type: 'callout'}),
  ],
})
