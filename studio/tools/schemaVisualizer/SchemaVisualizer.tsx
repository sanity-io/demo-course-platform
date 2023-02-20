import React from 'react'
import {Button, Box, Stack, Flex, Card, Text} from '@sanity/ui'
import {useSchema} from 'sanity'
import {useXarrow} from 'react-xarrows'

import Field from './Field'
import {motion} from 'framer-motion'

export default function SchemaVisualizer() {
  const schemaTypes = useSchema()?._original?.types || []
  const documentTypes = schemaTypes.filter(
    ({type, name}) => type === 'document' && !name.startsWith(`sanity.`)
  )
  const updateXarrow = useXarrow()
  // console.log(documentTypes)

  const [filters, setFilters] = React.useState<string[]>([])
  const handleFilter = React.useCallback(
    (type: string) => {
      setFilters((current) =>
        current.includes(type) ? current.filter((t) => t !== type) : [...current, type]
      )
      updateXarrow()
    },
    [updateXarrow]
  )

  return (
    <Flex flex={1} height="fill" justify="center" align="center" style={{overflow: 'scroll'}}>
      <div style={{position: `absolute`, pointerEvents: `none`, bottom: 0}}>
        <Flex gap={2} padding={4} style={{pointerEvents: `auto`}}>
          {documentTypes.map((type) => (
            <Button
              fontSize={1}
              icon={type?.icon}
              key={type.name}
              tone={filters.includes(type.name) ? `default` : `primary`}
              mode={filters.includes(type.name) ? `ghost` : `default`}
              text={type.title}
              onClick={() => handleFilter(type.name)}
            />
          ))}
        </Flex>
      </div>
      {documentTypes?.length > 0 ? (
        <Flex gap={5} padding={5} align="flex-start">
          {documentTypes
            .filter((type) => !filters.includes(type.name))
            .map((type) => (
              <motion.div
                key={type.name}
                drag
                // onDrag={updateXarrow}
                onDragEnd={updateXarrow}
                dragMomentum={false}
              >
                <Card
                  id={`document-${type.name}`}
                  radius={4}
                  shadow={2}
                  style={{minWidth: 300, overflow: `hidden`}}
                >
                  <Stack>
                    <Card padding={3} paddingY={4} borderBottom tone="primary">
                      <Flex>
                        <Box flex={1}>
                          <Text weight="semibold">{type.title}</Text>
                        </Box>
                        {type?.icon ? React.createElement(type.icon) : null}
                      </Flex>
                    </Card>
                    {type?.fields?.length > 0 ? (
                      <Stack>
                        {type.fields.map((field, fieldIndex) => (
                          <Field key={field.name} {...field} isFirst={fieldIndex === 0} />
                        ))}
                      </Stack>
                    ) : null}
                  </Stack>
                </Card>
              </motion.div>
            ))}
        </Flex>
      ) : null}
    </Flex>
  )
}
