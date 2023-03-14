import React from 'react'
import {Flex, Button, Card, Stack} from '@sanity/ui'
import {SchemaTypeDefinition, useSchema, Tool} from 'sanity'

import {SchemaVisualizerConfig} from './types'
import Data from './Data'

type SchemaVisualizerProps = {
  tool: Tool<SchemaVisualizerConfig>
}

export default function DeskTable(props: SchemaVisualizerProps) {
  const {defaultSchemaTypes = [], hiddenSchemaTypes = []} = props?.tool?.options ?? {}

  const schema = useSchema()
  const schemaTypes = schema?._original?.types
  const documentTypes = React.useMemo<SchemaTypeDefinition<'document'>[]>(
    () =>
      schemaTypes
        ? schemaTypes
            .filter(({type, name}) => type === 'document' && !name.startsWith(`sanity.`))
            .filter(({name}) => !hiddenSchemaTypes.includes(name))
        : [],
    [schemaTypes, hiddenSchemaTypes]
  )
  const [currentSchema, setCurrentSchema] = React.useState(documentTypes[0].name)

  return (
    <Card tone="transparent" height="fill">
      <Stack space={4} padding={4}>
        <Flex gap={2}>
          {documentTypes.map((type) => (
            <Button
              key={type.name}
              text={type.title}
              icon={type.icon}
              mode={type.name === currentSchema ? 'default' : 'ghost'}
              tone={type.name === currentSchema ? 'primary' : 'default'}
              onClick={() => setCurrentSchema(type.name)}
            />
          ))}
        </Flex>
        <Data type={currentSchema} keys={['_createdAt', '_rev']} />
      </Stack>
    </Card>
  )
}
