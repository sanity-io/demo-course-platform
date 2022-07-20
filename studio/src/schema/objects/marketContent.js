import React from 'react'
import {FiGlobe} from 'react-icons/fi'

import {i18n} from '../../../../languages'
import Flag from '../../components/Flag'

const defaults = {nonTextBehavior: ''}

function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map((child) => child.text).join('')
    })
    .join('\n\n')
}

export default {
  name: 'marketContent',
  title: 'Market Content',
  icon: FiGlobe,
  type: 'object',
  fields: [
    {
      name: 'market',
      type: 'string',
      options: {
        layout: 'select',
        list: i18n.languages.map((lang) => ({value: lang.id, title: lang.title})),
      },
      initialValue: i18n.base,
    },
    {
      name: 'content',
      type: 'array',
      of: [{type: 'block', styles: [], lists: [], marks: {}}],
      validation: (Rule) =>
        Rule.custom((value, {path}) => {
          // Inline blocks can only have one line of content
          if (value && value.length > 1 && path.length > 3) {
            return `This content must be a single line`
          }

          return true
        }),
    },
  ],
  preview: {
    select: {
      content: 'content',
      market: 'market',
    },
    prepare({content, market}) {
      const title = content ? blocksToText(content) : `<Empty Content>`

      return {
        title,
        subtitle: market,
        media: <Flag market={market} />,
      }
    },
  },
}
