const languages = [
  {id: 'en_US', title: 'English (American)', isDefault: true},
  {id: 'en_GB', title: 'English (British)'},
  {id: 'no', title: 'Norwegian'},
]

const i18n = {
  languages: languages,
  base: languages.find((item) => item.isDefault)?.id,
}

const googleTranslateLanguages = languages.map(({id, title}) => ({id, title}))

module.exports = {i18n, googleTranslateLanguages}
