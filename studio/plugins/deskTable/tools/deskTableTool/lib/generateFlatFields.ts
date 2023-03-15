import {isDocumentSchemaType, ObjectSchemaType, SchemaType} from 'sanity'

export type FlatField = {
  name: string
  title?: string
}

// Take in a document schema
// Return a flat list of all fields with dot notation
export function generateFlatFields(schema: SchemaType): FlatField[] {
  if (!isDocumentSchemaType(schema)) {
    return []
  }

  let fields: FlatField[] = []

  if ('fields' in schema) {
    fields = schema.fields.map((field) => ({
      name: field.name,
      title: field?.type?.title,
    }))
  }

  return fields
}
