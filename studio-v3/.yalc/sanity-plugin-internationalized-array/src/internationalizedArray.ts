import {defineField, FieldDefinition, SchemaType} from 'sanity'

import InternationalizedArrayInput from './components/InternationalizedArrayInput'
import {AllowedType, ArrayConfig, Language, Value} from './types'

const CONFIG_DEFAULT = {name: `title`, type: `string` as AllowedType, languages: []}

export function internationalizedArray(config: ArrayConfig = CONFIG_DEFAULT): FieldDefinition {
  const {name, type, languages} = config

  const configValidation = Array.isArray(config?.validation)
    ? config.validation
    : [config?.validation]

  return defineField({
    name,
    title: config?.title ?? undefined,
    group: config?.group ?? undefined,
    hidden: config?.hidden ?? undefined,
    readOnly: config?.readOnly ?? undefined,
    type: 'array',
    components: {input: InternationalizedArrayInput},
    options: {languages},
    of: [
      {
        type: 'object',
        fields: [
          {
            name: 'value',
            type,
          },
        ],
        preview: {
          select: {title: 'value', key: '_key'},
          prepare({title, key}) {
            return {
              title,
              subtitle: key.toUpperCase(),
            }
          },
        },
      },
    ],
    validation: (Rule) => [
      languages?.length ? Rule.max(languages.length) : null,
      Rule.custom<Value[]>((value, context) => {
        const {languages: contextLanguages}: {languages: Language[]} = context?.type?.options ?? {}

        const nonLanguageKeys = value?.length
          ? value.filter((item) => !contextLanguages.find((language) => item._key === language.id))
          : []

        if (nonLanguageKeys.length) {
          return {
            message: `Array item keys must be valid languages registered to the field type`,
            paths: nonLanguageKeys.map((item) => ({_key: item._key})),
          }
        }

        // Ensure there's no duplicate `language` fields
        type KeyedValues = {
          [key: string]: Value[]
        }

        const valuesByLanguage = value?.length
          ? value
              .filter((item) => Boolean(item?._key))
              .reduce((acc, cur) => {
                if (acc[cur._key]) {
                  return {...acc, [cur._key]: [...acc[cur._key], cur]}
                }

                return {
                  ...acc,
                  [cur._key]: [cur],
                }
              }, {} as KeyedValues)
          : {}

        const duplicateValues = Object.values(valuesByLanguage)
          .filter((item) => item?.length > 1)
          .flat()

        if (duplicateValues.length) {
          return {
            message: 'There can only be one field per language',
            paths: duplicateValues.map((item) => ({_key: item._key})),
          }
        }

        return true
      }),
      ...configValidation,
    ],
  })
}
