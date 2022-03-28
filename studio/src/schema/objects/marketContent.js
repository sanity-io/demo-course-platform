import React from 'react'
import {FiGlobe} from 'react-icons/fi'

import {i18n} from '../../../../languages'
import Flag from '../../components/Flag'

const defaults = {nonTextBehavior: 'asdf'}

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
      title: 'Market',
      type: 'string',
      options: {
        layout: 'select',
        list: i18n.languages.map((lang) => ({value: lang.id, title: lang.title})),
      },
      initialValue: i18n.base,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
  ],
  preview: {
    select: {
      content: 'content',
      market: 'market',
    },
    prepare({content, market}) {
      const title = blocksToText(content)

      return {
        title,
        subtitle: market,
        media: <Flag market={market} />,
      }
    },
  },
}
