import {CheckmarkIcon, EditIcon, PublishIcon} from '@sanity/icons'
import {Box, Card, CardTone, Flex, Spinner, Text, Tooltip} from '@sanity/ui'
import {useState, useEffect, useLayoutEffect, useMemo} from 'react'
import {useSyncState, useTimeAgo, EditStateFor} from 'sanity'

interface SyncIndicatorProps {
  documentId: string
  documentType: string
  editState: EditStateFor
}

export function StatusIndicator(props: SyncIndicatorProps) {
  const {documentId, documentType, editState} = props
  const {isSyncing} = useSyncState(documentId, documentType)
  const [status, setStatus] = useState<'syncing' | 'saved' | null>(null)
  const lastUpdated = editState.draft?._updatedAt

  const draftTimeAgo = useTimeAgo(lastUpdated || '', {agoSuffix: true})
  const publishedTimeAgo = useTimeAgo(editState.published?._updatedAt || '', {agoSuffix: true})

  useEffect(() => {
    if (status === 'syncing' && !isSyncing) {
      const timerId = setTimeout(() => setStatus('saved'), 400)
      return () => clearTimeout(timerId)
    }
    if (status === 'saved') {
      const timerId = setTimeout(() => setStatus(null), 3000)
      return () => clearTimeout(timerId)
    }
  }, [status, isSyncing])

  useLayoutEffect(() => {
    setStatus(null)
  }, [documentId])

  useLayoutEffect(() => {
    if (isSyncing) {
      setStatus('syncing')
    }
  }, [isSyncing])

  const statusInfo = useMemo(() => {
    if (status === 'syncing') {
      return {
        title: 'Syncing',
        icon: <Spinner muted size={1} />,
        tone: 'transparent',
      }
    }

    if (status === 'saved') {
      return {
        title: 'Saved',
        icon: (
          <Text size={1}>
            <CheckmarkIcon />
          </Text>
        ),
        tone: 'positive',
      }
    }

    if (lastUpdated) {
      return {
        title: draftTimeAgo,
        icon: (
          <Text size={1}>
            <EditIcon />
          </Text>
        ),
        tone: 'caution',
        tooltip: 'The document has unpublished changes',
      }
    }

    return null
  }, [status, lastUpdated, draftTimeAgo])

  return (
    <Flex gap={2}>
      {editState.published && (
        <Tooltip
          portal
          placement="bottom"
          content={
            <Box padding={2}>
              <Text size={1}>The document is published</Text>
            </Box>
          }
        >
          <Card padding={3} sizing="border" tone="positive" radius={2}>
            <Flex align="center" gap={2}>
              <Text size={1}>{publishedTimeAgo}</Text>
              <Text size={1}>
                <PublishIcon />
              </Text>
            </Flex>
          </Card>
        </Tooltip>
      )}

      {statusInfo && (
        <Tooltip
          portal
          placement="bottom"
          disabled={!statusInfo.tooltip}
          content={
            <Box padding={2}>
              <Text size={1}>{statusInfo.tooltip}</Text>
            </Box>
          }
        >
          <Card padding={3} sizing="border" tone={statusInfo.tone as CardTone} radius={2}>
            <Flex align="center" gap={2}>
              <Text size={1}>{statusInfo.title}</Text>
              {statusInfo.icon}
            </Flex>
          </Card>
        </Tooltip>
      )}
    </Flex>
  )
}
