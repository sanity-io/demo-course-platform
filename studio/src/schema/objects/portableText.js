import {ImageIcon} from '@sanity/icons'

import {i18n} from '../../../../languages'

export default {
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [
    {
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
          {
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
          },
          {
            name: 'reference',
            title: 'Reference',
            type: 'reference',
            to: [{type: 'lesson'}],
            options: {
              filter: '__i18n_lang == $base',
              filterParams: {base: i18n.base},
              modal: {width: 'medium'},
            },
          },
        ],
      },
    },
    {type: 'image', icon: ImageIcon},
    {type: 'code'},
    {type: 'callout'},
  ],
}
