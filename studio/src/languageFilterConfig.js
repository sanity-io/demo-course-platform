import {i18n} from '../../languages'

const supportedLanguages = i18n.languages.map(({id, title}) => ({id, title}))

export default {
  supportedLanguages,
  defaultLanguages: [i18n.base],
  documentTypes: [`presenter`, `course`, `labelGroup`],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('localized') || selectedLanguageIds.includes(field.name),
}
