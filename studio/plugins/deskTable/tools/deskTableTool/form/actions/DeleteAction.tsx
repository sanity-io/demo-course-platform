import {TrashIcon} from '@sanity/icons'
import {useToast} from '@sanity/ui'
import {useState, useEffect, useCallback, useRef} from 'react'
import {DocumentActionComponent, getPublishedId, useDocumentOperation} from 'sanity'

export const DeleteAction: DocumentActionComponent = (props) => {
  const [deleting, setDeleting] = useState<boolean>(false)
  const {delete: del} = useDocumentOperation(getPublishedId(props.id), props.type)
  const {push} = useToast()

  const didDelete = useRef<boolean>(false)

  // Reset states when published
  useEffect(() => {
    if (!props.draft && !props.published) {
      setDeleting(false)

      if (didDelete.current) {
        push({title: 'Document deleted', status: 'success'})
        didDelete.current = false
      }
    }
  }, [props.draft, deleting, props.published, push])

  const handleDelete = useCallback(() => {
    setDeleting(true)
    del.execute()

    didDelete.current = true
  }, [del])

  return {
    disabled: deleting || Boolean(del.disabled),
    icon: TrashIcon,
    label: deleting ? 'Deleting...' : 'Delete',
    onHandle: handleDelete,
    tone: 'critical',
  }
}
