import {Label} from './types'

export function getLabelByKey(key: string, labels: Label[] = []) {
  if (!key || !labels.length) {
    return ``
  }

  return labels.find((label) => label.key === key)?.text ?? ``
}
