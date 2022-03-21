import React from 'react'
import {ImageIcon} from '@sanity/icons'

import {i18n} from '../../../../languages'

const MarketTextRender = ({market, children}) => <span data-market-text={market}>{children}</span>

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
          {
            name: 'marketText',
            type: 'object',
            blockEditor: {
              render: MarketTextRender,
            },
            fields: [
              {
                name: 'market',
                title: 'Market',
                type: 'string',
                options: {
                  layout: 'select',
                  list: i18n.languages.map((lang) => ({value: lang.id, title: lang.title})),
                },
                initialValue: i18n.base,
              },
            ],
          },
        ],
      },
    },
    {type: 'image', icon: ImageIcon},
    {type: 'code'},
    {type: 'callout'},
  ],
}
