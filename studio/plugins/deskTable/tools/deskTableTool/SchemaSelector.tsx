import React from 'react'
import {Text, Autocomplete, Flex, Button, Stack} from '@sanity/ui'
import {SchemaTypeDefinition} from 'sanity'

type SchemaSelectorProps = {
  schemaTypes: SchemaTypeDefinition<'document'>[]
  onChange: (value: string) => void
  value?: string
}

export default function SchemaSelector(props: SchemaSelectorProps) {
  const {schemaTypes, onChange, value} = props

  const renderValue = React.useCallback(
    (value: string, option?: {id: string; value: string; label: string}) => {
      return option?.label ?? value
    },
    []
  )

  const renderOption = React.useCallback(
    (option: {id: string; value: string; label: string}) => {
      const {icon} = schemaTypes.find((type) => type.name === option.value) ?? {}

      return (
        <Stack>
          <Button mode="bleed">
            <Flex align="center" gap={3}>
              <Text size={2}>
                {icon ? React.createElement(icon as React.ComponentType<{}>) : null}
              </Text>
              <Text>{option.label}</Text>
            </Flex>
          </Button>
        </Stack>
      )
    },
    [schemaTypes]
  )

  if (!schemaTypes.length) {
    return null
  }

  return (
    <Autocomplete
      id="schema-type-selector"
      // disabled={!value}
      options={schemaTypes.map((documentType) => ({
        id: documentType.name,
        value: documentType.name,
        label: documentType.title ?? documentType.name,
      }))}
      icon={schemaTypes.find((type) => type.name === value)?.icon ?? undefined}
      placeholder="Search document types"
      onChange={onChange}
      renderValue={renderValue}
      renderOption={renderOption}
      value={value}
      openButton
    />
  )
}
