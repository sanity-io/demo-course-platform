import {PublishIcon} from '@sanity/icons'
import {useToast} from '@sanity/ui'
import {useState, useEffect, useCallback, useRef} from 'react'
import {DocumentActionComponent, getPublishedId, useDocumentOperation} from 'sanity'

export const PublishAction: DocumentActionComponent = (props) => {
  const [publishing, setPublishing] = useState<boolean>(false)
  const {publish} = useDocumentOperation(getPublishedId(props.id), props.type)
  const didPublish = useRef<boolean>(false)
  const {push} = useToast()

  useEffect(() => {
    if (!props.draft) {
      setPublishing(false)

      if (didPublish.current) {
        push({title: 'Document published', status: 'success'})

        didPublish.current = false
      }
    }
  }, [props.draft, publishing, push])

  const handlePublish = useCallback(() => {
    setPublishing(true)
    publish.execute()
    didPublish.current = true
  }, [publish])

  return {
    disabled: !props.draft || publishing,
    icon: PublishIcon,
    label: publishing ? 'Publishing...' : 'Publish',
    onHandle: handlePublish,
    tone: 'positive',
  }
}
