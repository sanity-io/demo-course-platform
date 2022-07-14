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
      title: 'Labels',
      description: 'Strings of text that are used through the Website and require translation',
      type: 'array',
      of: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'object',
          fields: [
            defineField({
              name: 'key',
              title: 'Key',
              type: 'string',
              description: `This will be used to identify the label in the code. It should be unique and contain only lowercase letters and periods`,
              validation: (Rule) =>
                Rule.regex(/^[a-z.]+$/).error(
                  'The key should contain only lowercase letters and periods'
                ),
            }),
            defineField({name: 'text', type: 'localizedGoogleTranslateString'}),
          ],
          preview: {
            select: {
              text: 'text',
              subtitle: 'key',
            },
            prepare({text, subtitle}: {text: {[key: string]: string}; subtitle: string}) {
              const title =
                text && Object.keys(text).filter((key) => key !== '_type').length
                  ? Object.keys(text)
                      .filter((key) => key !== '_type')
                      .map((lang) => text[lang])
                      .join(', ')
                  : `[No translated text strings]`

              return {
                title,
                subtitle,
              }
            },
          },
        }),
      ],
    }),
  ],
})
