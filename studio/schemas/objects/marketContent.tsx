import {FiGlobe} from 'react-icons/fi'
import {PortableTextTextBlock, defineField, defineType} from 'sanity'

import {i18n} from '../../../languages'

const defaults = {nonTextBehavior: ''}

function blocksToText(blocks: PortableTextTextBlock[], opts = {}) {
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

export default defineType({
  name: 'marketContent',
  title: 'Market Content',
  icon: FiGlobe,
  type: 'object',
  fields: [
    defineField({
      name: 'market',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: i18n.languages.map((lang) => ({value: lang.id, title: lang.title})),
      },
      initialValue: i18n.base,
    }),
    defineField({
      name: 'content',
      type: 'portableText',
    }),
  ],
  preview: {
    select: {
      content: 'content',
      market: 'market',
    },
    prepare({content, market}: {content: Block[]; market: string}) {
      const title = blocksToText(content)

      return {
        title,
        subtitle: market,
      }
    },
  },
})
