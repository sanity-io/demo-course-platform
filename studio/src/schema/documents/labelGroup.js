import {FiType} from 'react-icons/fi'

export default {
  name: 'labelGroup',
  title: 'Label Group',
  icon: FiType,
  type: 'document',
  fields: [
    {
      name: 'labels',
      title: 'Labels',
      description: 'Strings of text that are used through the Website and require translation',
      type: 'array',
      of: [
        {
          name: 'label',
          title: 'Label',
          type: 'object',
          fields: [
            {
              name: 'key',
              title: 'Key',
              type: 'string',
              description: `This will be used to identify the label in the code. It should be unique and contain only lowercase letters and periods`,
              validation: (Rule) =>
                Rule.regex(/^[a-z.]+$/).error(
                  'The key should contain only lowercase letters and periods'
                ),
            },
            {name: 'text', type: 'localizedString'},
          ],
          preview: {
            select: {
              text: 'text',
              subtitle: 'key',
            },
            prepare({text, subtitle}) {
              const title = Object.keys(text)
                .filter((key) => key !== '_type')
                .map((lang) => text[lang])
                .join(', ')

              return {
                title,
                subtitle,
              }
            },
          },
        },
      ],
    },
  ],
}
