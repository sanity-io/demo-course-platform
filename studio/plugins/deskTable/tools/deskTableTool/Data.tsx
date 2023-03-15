import React from 'react'
import {Cell, Feedback, Row, Table, useListeningQuery} from 'sanity-plugin-utils'
import {Stack, Box, Button, Dialog, Code, Spinner, Text} from '@sanity/ui'
import {Preview, SanityDocument, useSchema} from 'sanity'
import _ from 'lodash'

import {Form} from './form'

type DataProps = {
  schemaType: string
  keys: string[]
}

export default function Data(props: DataProps) {
  const {schemaType, keys = []} = props
  const schema = useSchema()
  const fullSchema = schema.get(schemaType)
  const projection = [`_id`, `_type`, ...keys]

  const query = [
    `*[_type == $schemaType]`,
    `{`,
    projection.map((k) => (k.includes(`.`) ? `"${k}": ${k}` : k)).join(`, `),
    `}`,
  ].join(``)
  const {data, loading, error} = useListeningQuery<SanityDocument[]>(query, {
    initialValue: [],
    params: {schemaType},
  })

  const [currentId, setCurrentId] = React.useState(``)
  const onClose = React.useCallback(() => setCurrentId(``), [])

  if (loading) {
    return <Spinner />
  }

  if (error || !fullSchema) {
    return <Feedback title="Error" tone="critical" />
  }

  if (!data?.length) {
    return <Feedback title="No documents found" tone="caution" />
  }

  return (
    <Table shadow={2} radius={2} padding={1}>
      <thead>
        <Row>
          <Cell padding={2}>
            <Code size={1}>Document</Code>
          </Cell>
          {keys.map((keyValue) => (
            <Cell key={keyValue} padding={2}>
              <Code size={1}>{keyValue}</Code>
            </Cell>
          ))}
        </Row>
      </thead>
      <tbody>
        {data.map((doc) => (
          <Row key={doc._id}>
            <Cell padding={2} borderTop>
              <Stack>
                <Button onClick={() => setCurrentId(doc._id)} padding={0} mode="bleed">
                  <Preview layout="default" value={doc} schemaType={fullSchema} />
                </Button>
              </Stack>
            </Cell>
            {keys.map((keyValue) => (
              <Cell key={keyValue} padding={2} borderTop>
                <Text size={1}>{_.get(doc, keyValue) as string}</Text>
              </Cell>
            ))}
          </Row>
        ))}
      </tbody>
      {currentId && (
        <Dialog header="Example" id="dialog-example" onClose={onClose} zOffset={1000} width={2}>
          <Box padding={4}>
            <Form documentType={schemaType} documentId={currentId} />
          </Box>
        </Dialog>
      )}
    </Table>
  )
}
