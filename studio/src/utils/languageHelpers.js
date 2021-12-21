import {languages} from '../../../languages'

const i18n = {
  languages: languages.map((item) => item.id),
  base: languages.find((item) => item.isDefault)?.id,
}

export default i18n
