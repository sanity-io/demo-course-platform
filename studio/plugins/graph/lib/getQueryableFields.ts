import {SchemaType} from '@sanity/types'
import schema from 'part:@sanity/base/schema'

import {toTitleCase} from './toTitleCase'

const {types}: {types: SchemaType[]} = schema._original

interface SelectableField {
  field: SchemaType
  fieldPath: string
  title: string
  level: number
}

function getChildren(field: SchemaType): SchemaType[] {
  console.log(`getChildren`, field.type)

  if (field.type === `object` && field?.fields?.length) {
    // Skip image fields
    if (field.name === `image`) {
      return []
    }

    return field.fields
  }

  if (field.type === `array` && field?.of?.length) {
    return field.of
  }

  // Native `reference`, dereference schema fields
  if (field?.type === 'reference') {
    const dereferencedFields = field?.to?.length
      ? field.to.map((to) => schema.get(to.type)).filter(Boolean)
      : null

    // TODO: Support more than one field type in an aray
    return dereferencedFields.length ? dereferencedFields[0].fields : []
  }

  // TODO: Exit early if an in-built type

  // Registered Schema Object with fields
  const registeredSchema = types.find((type) => type.name === field.type)
  if (registeredSchema?.fields) {
    return registeredSchema.fields
  }

  return []
}

function processField(field: SchemaType, parent: SelectableField) {
  let fieldPath = ``
  let title = ``

  const shouldSkipField = typeof field.type === 'string' && field.type === 'document'

  // When we come across a `document` type, it is skipped over
  const level = shouldSkipField ? parent.level : parent.level + 1

  if (typeof field.type === 'string' && typeof parent.field.type === 'string') {
    switch (parent.field.type) {
      case 'array':
        fieldPath = parent.fieldPath.endsWith(`[]`) ? parent.fieldPath : `${parent.fieldPath}[]`
        // fieldPath = `${parent.fieldPath}`
        title = `${parent.title}, Array of ${createFieldTitle(field)}`
        // title = `Array of ${createFieldTitle(field)}`
        break
      case 'reference':
        fieldPath = parent.fieldPath
        title = `${createFieldTitle(parent.field)} Reference`
        break
      case 'document':
        fieldPath = `${parent.fieldPath}->${field.name ?? field.type}`
        title = [
          parent.title,
          // `to`,
          // parent?.field?.title ?? toTitleCase(parent.field.name),
          `->`,
          createFieldTitle(field),
        ].join(' ')

        break
      default:
        fieldPath =
          level > 1 ? `${parent.fieldPath}.${field.name ?? field.type.name}` : parent.fieldPath
        title =
          level > 1 ? `${parent.title} . ${field.title ?? toTitleCase(field.name)}` : parent.title
        break
    }
  }

  return {
    field,
    fieldPath,
    title,
    level,
  }
}

function createFieldTitle(field: SchemaType) {
  return field.name ? field.title ?? toTitleCase(field.name) : toTitleCase(field?.type)
}

function getInnerFields(childFields: any[], parent: any): SelectableField[] {
  return childFields.reduce((acc: any, cur: any) => {
    const child = processField(cur, parent)
    const children = getChildren(cur)

    if (children.length) {
      const innerFields = getInnerFields(children, child)

      // Document type is not queryable
      if (innerFields.length) {
        return cur.type === 'document' ? [...acc, ...innerFields] : [...acc, child, ...innerFields]
      }
    }

    return [...acc, child]
  }, [])
}

export function getQueryableFields(fields: Array<SchemaType> = []): SelectableField[] {
  if (!fields.length) return []

  const selectable = fields.reduce((acc: any, field: any) => {
    const fieldPath = field.name ?? field.type
    const title = createFieldTitle(field)
    const level = 0
    const initialParent = {field, fieldPath, title, level}

    const parent = processField(field, initialParent)
    const children = getChildren(field)

    if (children.length) {
      const innerFields = getInnerFields(children, parent)

      if (innerFields.length) {
        return [...acc, parent, ...innerFields]
      }
    }

    return [...acc, parent]
  }, [])

  return selectable
}
