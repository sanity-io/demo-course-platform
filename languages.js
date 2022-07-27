const languages = [
  {id: 'en_US', title: 'English (US)', isDefault: true},
  {id: 'nl', title: 'Dutch'},
  {id: 'no', title: 'Norwegian'},
]

const i18n = {
  languages,
  base: languages.find((item) => item.isDefault)?.id,
}

const googleTranslateLanguages = languages.map(({id, title}) => ({id, title}))

// For v2 studio
// module.exports = {i18n, googleTranslateLanguages}

// For v3 studio
export {i18n, googleTranslateLanguages}
