import {UnpublishIcon} from '@sanity/icons'
import {useToast} from '@sanity/ui'
import {useState, useEffect, useCallback, useRef} from 'react'
import {DocumentActionComponent, getPublishedId, useDocumentOperation} from 'sanity'

export const UnpublishAction: DocumentActionComponent = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const {unpublish} = useDocumentOperation(getPublishedId(props.id), props.type)
  const didUnpublish = useRef<boolean>(false)
  const {push} = useToast()

  useEffect(() => {
    if (!props.published && loading) {
      if (didUnpublish.current) {
        push({title: 'Document was unpublished', status: 'success'})
        setLoading(false)

        didUnpublish.current = false
      }
    }
  }, [props.draft, loading, push, props.published])

  const handleUnpublish = useCallback(() => {
    didUnpublish.current = true
    setLoading(true)
    unpublish.execute()
  }, [unpublish])

  return {
    disabled: !props.published || loading,
    icon: UnpublishIcon,
    label: loading ? 'Unpublishing...' : 'Unpublish',
    onHandle: handleUnpublish,
    tone: 'caution',
  }
}
