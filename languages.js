const languages = [
  {name: 'en_US', title: 'English (American)', isDefault: true},
  {name: 'en_GB', title: 'English (British)'},
  {name: 'no', title: 'Norwegian'},
]

const i18n = {
  languages: languages,
  base: languages.find((item) => item.isDefault)?.name,
}

const googleTranslateLanguages = languages.map(({name, title}) => ({id: name, title}))

module.exports = {i18n, googleTranslateLanguages}
