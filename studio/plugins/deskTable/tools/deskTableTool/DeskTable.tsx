import React from 'react'
import {Text, Checkbox, Flex, Card, Stack} from '@sanity/ui'
import {SchemaTypeDefinition, useSchema, Tool} from 'sanity'

import {SchemaVisualizerConfig} from './types'
import SchemaSelector from './SchemaSelector'
import Data from './Data'
import {useRouter, useRouterState} from 'sanity/router'
import {Feedback} from 'sanity-plugin-utils'

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
  console.log(state.schemaType)

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

  const [keys, setKeys] = React.useState<string[]>([`_createdAt`, `_rev`])
  const [currentKeys, setCurrentKeys] = React.useState<string[]>([])

  const [currentSchema, setCurrentSchema] = React.useState(
    state.schemaType ?? documentTypes[0].name
  )

  // Handle change of url
  React.useEffect(() => {
    if (state.schemaType && state.schemaType !== currentSchema) {
      setCurrentSchema(state.schemaType)
    }
  }, [state.schemaType, currentSchema])

  // Handle change in schema selector
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
          <Flex align="center" justify="space-between" gap={2}>
            <SchemaSelector
              schemaTypes={documentTypes}
              onChange={handleChange}
              value={currentSchema}
            />
            <Stack space={2}>
              {keys.map((k) => {
                return (
                  <Flex key={k} as="label" align="center" gap={2}>
                    <Checkbox
                      checked={currentKeys.includes(k)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCurrentKeys([...currentKeys, k])
                        } else {
                          setCurrentKeys(currentKeys.filter((x) => x !== k))
                        }
                      }}
                    />
                    <Text size={1}>{k}</Text>
                  </Flex>
                )
              })}
            </Stack>
          </Flex>
        </Card>
        {currentSchema ? (
          <Data schemaType={currentSchema} keys={currentKeys} />
        ) : (
          <Feedback
            tone="caution"
            title="No schema selected"
            description="Select a schema from the dropdown list to view documents"
          />
        )}
      </Stack>
    </Card>
  )
}
