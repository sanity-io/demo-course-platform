import React from 'react'
import {Flex, Card, Text, Code, Box} from '@sanity/ui'
import schema from 'part:@sanity/base/schema'
import Xarrow from 'react-xarrows'

import {getQueryableFields} from './lib/getQueryableFields'
import {toTitleCase} from './lib/toTitleCase'

export default function Graph() {
  const documentSchemas = schema._original.types.filter(({type}) => type === `document`)
  // console.log(documentSchemas)

  const flatFields = documentSchemas
    .filter((sch) => sch.name === `course`)
    .map((sch) => getQueryableFields(sch.fields))
    .pop()
  console.log(flatFields)

  return (
    <Flex gap={4} padding={5} align="flex-start" style={{overflow: `scroll`}}>
      <Card>
        {flatFields.map((flat, flatIndex) => (
          <Box key={`${flat.fieldPath}-${flatIndex}`}>{flat.fieldPath}</Box>
        ))}
      </Card>

      {/* {documentSchemas
        .filter((documentSchema) => !documentSchema.name.startsWith(`sanity.`))
        .map((documentSchema) => (
          <Card key={documentSchema.name} radius={3} shadow={2}>
            <Card padding={3} radiusTop={3} tone="primary" id={`doc-${documentSchema.name}`}>
              <Text weight="semibold">{documentSchema.title}</Text>
            </Card>

            {documentSchema.fields.map((field) => (
              <Field key={field.name} {...field} level={0} />
            ))}
          </Card>
        ))} */}
    </Flex>
  )
}

function Field({name, title, type, of, to, level}) {
  const id = `${name}-${level}`
  let fieldTitle = `NO TITLE`

  if (title) {
    fieldTitle = title
  } else if (name) {
    fieldTitle = toTitleCase(name)
  }

  return (
    <Box paddingLeft={level * 2} id={id}>
      <Card radiusBottom={3} padding={3} borderTop>
        <Flex justify="space-between" align="center" gap={4}>
          <Text>{fieldTitle}</Text>
          <Code size={0}>{type}</Code>
        </Flex>
      </Card>
      {type === `array` && of?.length > 0
        ? of.map((field) => <Field level={level + 1} key={field.name} {...field} />)
        : null}

      {type === `reference` && to?.length > 0
        ? to.map((ref) => (
            <Xarrow key={ref.type} start={id} end={`doc-${ref.type}`} startAnchor="right" />
          ))
        : null}
    </Box>
  )
}
