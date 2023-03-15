import React from 'react'
import {Text, Checkbox, Flex, Card, Stack} from '@sanity/ui'
import {SchemaTypeDefinition, useSchema, Tool, SchemaType} from 'sanity'

import {SchemaVisualizerConfig} from './types'
import SchemaSelector from './SchemaSelector'
import Data from './Data'
import {useRouter, useRouterState} from 'sanity/router'
import {Feedback} from 'sanity-plugin-utils'
import {FlatField, generateFlatFields} from './lib/generateFlatFields'

type SchemaVisualizerProps = {
  tool: Tool<SchemaVisualizerConfig>
}

const selector = (state: any) => {
  return {
    schemaType: state.schemaType,
  }
}

export default function DeskTable(props: SchemaVisualizerProps) {
  const {hiddenSchemaTypes = []} = props?.tool?.options ?? {}

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

  const [currentSchema, setCurrentSchema] = React.useState<SchemaType | undefined>(
    state.schemaType ? schema.get(state.schemaType) : schema.get(documentTypes[0].name)
  )

  // Handle change of url
  React.useEffect(() => {
    if (state.schemaType && state.schemaType !== currentSchema?.name) {
      const newSchema = schema.get(state.schemaType)
      if (newSchema) {
        setCurrentSchema(newSchema)
      }
    }
  }, [state.schemaType, schema, currentSchema])

  // Handle change in schema selector
  const handleChange = React.useCallback(
    (newValue: string) => {
      const newSchema = schema.get(newValue)

      if (newValue) {
        setCurrentSchema(newSchema)
        navigate({schemaType: newValue})
        setCurrentFields([])
      }
    },
    [navigate, schema]
  )

  // Handle selectable fields
  const [fields, setFields] = React.useState<FlatField[]>([])
  const [currentFields, setCurrentFields] = React.useState<FlatField[]>([])

  React.useEffect(() => {
    if (currentSchema) {
      setFields(generateFlatFields(currentSchema))
    }
  }, [currentSchema])

  return (
    <Card tone="transparent" height="fill">
      <Stack space={4} padding={4}>
        <Card padding={2} border>
          <Flex align="center" justify="space-between" gap={2}>
            <SchemaSelector
              schemaTypes={documentTypes}
              onChange={handleChange}
              value={currentSchema?.name}
            />
            <Stack space={2}>
              {fields.map((field) => {
                return (
                  <Flex key={field.name} as="label" align="center" gap={2}>
                    <Checkbox
                      checked={currentFields.find((c) => c.name === field.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCurrentFields([...currentFields, field])
                        } else {
                          setCurrentFields(currentFields.filter((x) => x.name !== field.name))
                        }
                      }}
                    />
                    <Text size={1}>{field.title || field.name}</Text>
                  </Flex>
                )
              })}
            </Stack>
          </Flex>
        </Card>
        {currentSchema ? (
          <Data schemaType={currentSchema.name} fields={currentFields} />
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
