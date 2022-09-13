import {FiType} from 'react-icons/fi'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'labelGroup',
  title: 'Label Group',
  icon: FiType,
  type: 'document',
  fields: [
    defineField({
      name: 'labels',
      description: 'Strings of text that are used through the Website and require translation',
      type: 'array',
      of: [
        defineField({
          name: 'label',
          type: 'label',
        }),
      ],
    }),
  ],
})
