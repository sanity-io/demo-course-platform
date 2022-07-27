import {Rule} from '@sanity/types'

export type Language = {
  id: string
  title: string
}

export type AllowedType = 'string' | 'number' | 'boolean' | 'text'

export type ArrayConfig = {
  name: string
  type: AllowedType
  languages: Language[]
  title?: string
  group?: string
  hidden?: boolean | (() => boolean)
  readOnly?: boolean | (() => boolean)
  validation?: Rule | Rule[]
}

export type Value = {
  _key: string
  value?: string
}

export type PluginConfig = {
  languages: Language[]
}
