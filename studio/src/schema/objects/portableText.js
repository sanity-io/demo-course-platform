import React from 'react'
import {ImageIcon} from '@sanity/icons'

import {FiGlobe} from 'react-icons/fi'
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
      of: [{type: 'marketContent', title: 'Inline Market Content'}],
    },
    {type: 'image', icon: ImageIcon},
    {type: 'code'},
    {type: 'callout'},
  ],
}
