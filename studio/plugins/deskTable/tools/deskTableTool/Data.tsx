import React from 'react'
import {Cell, Feedback, Row, Table, useListeningQuery} from 'sanity-plugin-utils'
import {Stack, Box, Button, Dialog, Code, Spinner} from '@sanity/ui'
import {Preview, SanityDocument, useSchema} from 'sanity'
import _ from 'lodash'

import {Form} from './form'
import {FlatField} from './lib/generateFlatFields'
import RenderValue from './RenderValue'

type DataProps = {
  schemaType: string
  fields: FlatField[]
}

export default function Data(props: DataProps) {
  const {schemaType, fields = []} = props
  const schema = useSchema()
  const fullSchema = schema.get(schemaType)
  const projection = [{name: `_id`}, {name: `_type`}, ...fields]

  const query = [
    `*[_type == $schemaType]`,
    `{`,
    projection
      .map((field) => (field.name.includes(`.`) ? `"${field.name}": ${field.name}` : field.name))
      .join(`, `),
    `}`,
  ].join(``)
  const {data, loading, error} = useListeningQuery<SanityDocument[]>(query, {
    initialValue: [],
    params: {schemaType},
  })

  const [currentId, setCurrentId] = React.useState(``)
  const onClose = React.useCallback(() => setCurrentId(``), [])

  if (loading) {
    return (
      <Feedback>
        <Spinner />
      </Feedback>
    )
  }

  if (error || !fullSchema) {
    return <Feedback title="Error" tone="critical" />
  }

  if (!data?.length) {
    return <Feedback title="No documents found" tone="caution" />
  }

  return (
    <Table shadow={2}>
      <thead>
        <Row>
          <Cell padding={3}>
            <Code size={1}>document</Code>
          </Cell>
          {fields.map((fieldValue) => (
            <Cell key={fieldValue.name} paddingY={3}>
              <Code size={1}>{fieldValue.name}</Code>
            </Cell>
          ))}
        </Row>
      </thead>
      <tbody>
        {data.map((doc) => (
          <Row key={doc._id}>
            <Cell padding={2} borderTop>
              <Stack style={{minWidth: 300}}>
                <Button onClick={() => setCurrentId(doc._id)} padding={1} mode="bleed">
                  <Preview layout="default" value={doc} schemaType={fullSchema} />
                </Button>
              </Stack>
            </Cell>
            {fields.map((fieldValue) => (
              <Cell key={fieldValue.name} paddingY={2} borderTop>
                <RenderValue value={_.get(doc, fieldValue.name)} />
              </Cell>
            ))}
          </Row>
        ))}
      </tbody>
      {currentId && (
        <Dialog header="Example" id="dialog-example" onClose={onClose} zOffset={1000} width={2}>
          <Box padding={4}>
            <Form documentType={schemaType} documentId={currentId.replace(`drafts.`, ``)} />
          </Box>
        </Dialog>
      )}
    </Table>
  )
}
