import {NodeValidation} from 'sanity/form'
import {CardTone} from '@sanity/ui'

export function getToneFromValidation(validations: NodeValidation[]): CardTone {
  if (!validations.length) {
    return `default`
  }

  const validationLevels = validations.map((v) => v.level)

  if (validationLevels.includes('error')) {
    return `critical`
  } else if (validationLevels.includes('warning')) {
    return `caution`
  }

  return `default`
}
