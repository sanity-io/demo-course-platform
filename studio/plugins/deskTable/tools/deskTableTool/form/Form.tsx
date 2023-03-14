import {Flex, Card, Box, Text, TextSkeleton} from '@sanity/ui'
import {useMemo} from 'react'
import {useEditState, useSchema} from 'sanity'
import {DocumentActions} from './actions'
import {FormView} from './FormView'
import {StatusIndicator} from './StatusIndicator'

interface FormProps {
  documentType: string
  documentId: string
}

export function Form(props: FormProps) {
  const {documentType, documentId} = props
  const editState = useEditState(documentId, documentType)
  const {draft, published, ready} = editState
  const schema = useSchema()

  const preview = schema.get(documentType)?.preview
  const selectTitle = preview?.select?.title

  const title = useMemo(() => {
    if (draft && selectTitle) {
      return draft?.[selectTitle] as string
    }

    if (published && selectTitle) {
      return published?.[selectTitle] as string
    }

    return 'Untitled'
  }, [draft, published, selectTitle])

  console.log('editState', editState)

  return (
    <Flex flex={1} direction="column">
      <>
        <Card borderBottom>
          <Flex align="center" style={{height: 49}} padding={2} paddingX={3} sizing="border">
            <Flex align="center" flex={1}>
              {ready && <Text weight="semibold">{title}</Text>}
              {!ready && <TextSkeleton style={{width: 150}} animated />}
            </Flex>

            <StatusIndicator
              documentId={documentId}
              documentType={documentType}
              editState={editState}
            />
          </Flex>
        </Card>

        <Box overflow="auto" flex={1}>
          <FormView documentId={documentId} documentType={documentType} editState={editState} />
        </Box>

        <Card padding={2} borderTop>
          <Flex align="center">
            <Box flex={1} />

            <DocumentActions
              documentId={documentId}
              documentType={documentType}
              editState={editState}
            />
          </Flex>
        </Card>
      </>
    </Flex>
  )
}
