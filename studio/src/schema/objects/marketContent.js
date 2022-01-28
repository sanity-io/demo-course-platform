import {FiGlobe} from 'react-icons/fi'
import {i18n} from '../../../../languages'

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
      title: 'content',
      subtitle: 'market',
    },
  },
}
