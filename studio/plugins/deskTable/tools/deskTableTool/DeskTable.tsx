import React from 'react'
import {Card, Stack} from '@sanity/ui'
import {SchemaTypeDefinition, useSchema, Tool} from 'sanity'

import {SchemaVisualizerConfig} from './types'
import SchemaSelector from './SchemaSelector'
import Data from './Data'
import {useRouter, useRouterState} from 'sanity/router'

type SchemaVisualizerProps = {
  tool: Tool<SchemaVisualizerConfig>
}

const selector = (state: any) => {
  return {
    schemaType: state.schemaType,
  }
}

export default function DeskTable(props: SchemaVisualizerProps) {
  const {defaultSchemaTypes = [], hiddenSchemaTypes = []} = props?.tool?.options ?? {}

  const {navigate} = useRouter()
  const state = useRouterState<{schemaType: string}>(selector)

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

  const [currentSchema, setCurrentSchema] = React.useState(
    state.schemaType ?? documentTypes[0].name
  )

  const handleChange = React.useCallback(
    (newValue: string) => {
      setCurrentSchema(newValue)
      navigate({schemaType: newValue})
    },
    [navigate]
  )

  return (
    <Card tone="transparent" height="fill">
      <Stack space={4} padding={4}>
        <Card padding={2} border>
          <SchemaSelector
            schemaTypes={documentTypes}
            onChange={handleChange}
            value={currentSchema}
          />
        </Card>
        <Data schemaType={currentSchema} keys={['_createdAt', '_rev']} />
      </Stack>
    </Card>
  )
}
