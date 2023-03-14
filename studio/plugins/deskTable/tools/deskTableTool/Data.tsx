import React from 'react'
import {Cell, Feedback, Row, Table, useListeningQuery} from 'sanity-plugin-utils'
import {Stack, Box, Button, Dialog, Code, Spinner, Text} from '@sanity/ui'
import {Preview, SanityDocument, useSchema} from 'sanity'
import _ from 'lodash'

import {Form} from './form'

type DataProps = {
  type: string
  keys: string[]
}

export default function Data(props: DataProps) {
  const {type, keys = []} = props
  const schema = useSchema()
  const schemaType = schema.get(type)

  const query = [`*[_type == $type]`, `{_id, type,`, keys.join(`, `), `}`].join(``)
  const {data, loading, error} = useListeningQuery<SanityDocument[]>(query, {
    initialValue: [],
    params: {type},
  })

  const [currentId, setCurrentId] = React.useState(``)
  const onClose = React.useCallback(() => setCurrentId(``), [])

  if (loading) {
    return <Spinner />
  }

  if (error || !schemaType) {
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
                  <Preview layout="default" value={doc} schemaType={schemaType} />
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
            <Form documentType={type} documentId={currentId} />
          </Box>
        </Dialog>
      )}
    </Table>
  )
}
