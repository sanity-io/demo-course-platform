/* eslint-disable no-nested-ternary */

import {Box, Container, Flex, Spinner} from '@sanity/ui'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {tap} from 'rxjs/operators'
import {
  FormBuilder,
  createPatchChannel,
  useDocumentStore,
  useFormState,
  useSchema,
  ObjectSchemaType,
  PatchEvent,
  toMutationPatches,
  useDocumentOperation,
  SanityDocumentLike,
  useConnectionState,
  EditStateFor,
  useDocumentPresence,
  PresenceOverlay,
  Path,
  usePresenceStore,
  useValidationStatus,
} from 'sanity'
import {prepareMutationEvent, prepareRebaseEvent} from './utils'

interface FormViewProps {
  documentId: string
  documentType: string
  editState: EditStateFor
}

const preventDefault = (ev: React.FormEvent) => ev.preventDefault()

const EMPTY_ARRAY: [] = []

export function FormView(props: FormViewProps) {
  const {documentId, documentType, editState} = props

  const connectionState = useConnectionState(documentType, documentId)
  const documentStore = useDocumentStore()
  const schema = useSchema()
  const {patch} = useDocumentOperation(documentId, documentType)
  const presence = useDocumentPresence(documentId)
  const presenceStore = usePresenceStore()
  const {validation} = useValidationStatus(documentId, documentType)

  const [focusPath, setFocusPath] = useState<Path>(() => [])

  const schemaType = schema.get(documentType) as ObjectSchemaType | undefined
  const value: SanityDocumentLike = editState?.draft ||
    editState?.published || {_type: documentType, _id: documentId}

  const formState = useFormState(schemaType!, {
    comparisonValue: null,
    focusPath,
    openPath: [],
    presence,
    validation,
    value,
  })

  const isReady = connectionState === 'connected' && editState.ready

  const patchRef = useRef<(event: PatchEvent) => void>(() => {
    throw new Error('Nope')
  })
  const patchChannel = useMemo(() => createPatchChannel(), [])
  patchRef.current = (event: PatchEvent) => {
    patch.execute(toMutationPatches(event.patches), {})
  }

  const handleChange = useCallback((event: PatchEvent) => patchRef.current(event), [])
  const handlePathOpen = useCallback(() => '', [])
  const handleOnFieldGroupSelect = useCallback(() => '', [])
  const handleOnFieldSetCollapsed = useCallback(() => '', [])
  const handleSetPathCollapsed = useCallback(() => '', [])
  const handlePathBlur = useCallback(() => setFocusPath([]), [])

  const handlePathFocus = useCallback(
    (nextFocusPath: Path) => {
      setFocusPath(nextFocusPath)
      presenceStore.setLocation([
        {
          documentId,
          lastActiveAt: new Date().toISOString(),
          path: nextFocusPath,
          type: 'document',
        },
      ])
    },
    [documentId, presenceStore, setFocusPath]
  )

  useEffect(() => {
    const sub = documentStore.pair
      .documentEvents(documentId, documentType)
      .pipe(
        tap((event) => {
          if (event.type === 'mutation') {
            patchChannel.publish(prepareMutationEvent(event))
          }

          if (event.type === 'rebase') {
            patchChannel.publish(prepareRebaseEvent(event))
          }
        })
      )
      .subscribe()

    return () => {
      sub.unsubscribe()
    }
  }, [documentId, documentStore, documentType, patchChannel])

  return (
    <Container paddingX={4} paddingY={5} sizing="border" width={1}>
      {!isReady && (
        <Flex align="center" justify="center" paddingTop={8}>
          <Spinner muted />
        </Flex>
      )}

      {isReady && (
        <PresenceOverlay>
          <Box as="form" onSubmit={preventDefault}>
            <FormBuilder
              __internal_patchChannel={patchChannel}
              changed={formState?.changed || false}
              collapsedFieldSets={{value: false}}
              collapsedPaths={{value: false}}
              focused={formState?.focused || false}
              focusPath={formState?.focusPath || EMPTY_ARRAY}
              groups={formState?.groups || EMPTY_ARRAY}
              id="root"
              members={formState?.members || EMPTY_ARRAY}
              onChange={handleChange}
              onFieldGroupSelect={handleOnFieldGroupSelect}
              onPathBlur={handlePathBlur}
              onPathFocus={handlePathFocus}
              onPathOpen={handlePathOpen}
              onSetFieldSetCollapsed={handleOnFieldSetCollapsed}
              onSetPathCollapsed={handleSetPathCollapsed}
              presence={presence}
              readOnly={formState?.readOnly}
              schemaType={formState?.schemaType!}
              validation={validation}
              value={formState?.value}
            />
          </Box>
        </PresenceOverlay>
      )}
    </Container>
  )
}
