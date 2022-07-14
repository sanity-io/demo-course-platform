import T from '@sanity/base/initial-value-template-builder'

export default [
  T.template({
    id: 'lesson-language',
    title: 'Lesson: Predefined Language',
    schemaType: 'lesson',
    parameters: [{name: `language`, title: `Language`, type: `string`}],
    value: ({language}) => ({
      // eslint-disable-next-line camelcase
      __i18n_lang: language,
    }),
  }),
  ...T.defaults(),
]
