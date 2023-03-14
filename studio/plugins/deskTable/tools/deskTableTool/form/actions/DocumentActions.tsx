import {Button, Flex} from '@sanity/ui'
import {DocumentActionComponent, EditStateFor, useWorkspace} from 'sanity'

function Action(props: {action: DocumentActionComponent; editState: EditStateFor}) {
  const {action, editState} = props
  const {draft, id, liveEdit, published, ready, transactionSyncLock, type} = editState

  const actionProps = action({
    draft,
    id,
    liveEdit,
    onComplete: () => '',
    published,
    ready,
    revision: draft?._rev,
    transactionSyncLock,
    type,
  })

  const {disabled, icon, label, onHandle, tone} = actionProps || {}

  return (
    <Button
      disabled={disabled}
      fontSize={1}
      icon={icon}
      mode="bleed"
      onClick={onHandle}
      text={label}
      tone={tone}
    />
  )
}

interface DocumentActionsProps {
  editState: EditStateFor
  documentId: string
  documentType: string
}

export function DocumentActions(props: DocumentActionsProps) {
  const {documentId, documentType, editState} = props
  const {document} = useWorkspace()
  const documentActions = document.actions({schemaType: documentType, documentId: documentId})

  return (
    <Flex align="center" gap={1}>
      {documentActions.map((action) => {
        return <Action action={action} key={action.name} editState={editState} />
      })}
    </Flex>
  )
}
