export * from './internationalizedArray'

/**
 * Because of the complexity of the field, there's no utility currently to using the plugin framework
 * We need to register:
 * - an array field which
 * - only has a single object field with
 * - a single inner field and
 * - an array of languages
 * ...this is easier with a helper function
 */

// import React from 'react'
// import {createPlugin} from 'sanity'

// import InternationalizedArrayInput from './components/InternationalizedArrayInput'
// import {PluginConfig} from './types'

// const CONFIG_DEFAULT = {languages: []}

// export const internationalizedArray = createPlugin<PluginConfig>((config = CONFIG_DEFAULT) => {
//   return {
//     name: 'sanity-plugin-internationalized-array',
//     form: {
//       renderInput: (inputProps: unknown, next: unknown) => {
//         if (
//           config.languages.length &&
//           inputProps?.schemaType?.jsonType === 'array' &&
//           inputProps?.schemaType?.options.i18n === true
//         ) {
//           if (inputProps.schemaType.of.length > 1) {
//             return <div>Cannot have more than one field type in the array</div>
//           }

//           if (inputProps.schemaType.of[0].jsonType !== 'object') {
//             return <div>Single Field in the Array must be an object</div>
//           }

//           if (inputProps.schemaType.of[0].fields[0].name !== 'value') {
//             return <div>Single Field in the Object must be named `value`</div>
//           }

//           console.log({inputProps})
//           return <InternationalizedArrayInput inputProps={inputProps} {...config} />
//         }

//         return null
//       },
//     },
//   }
// })
