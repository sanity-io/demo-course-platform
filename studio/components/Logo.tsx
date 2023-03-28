import React from 'react'
import {TranslateIcon} from '@sanity/icons'
import {Flex} from '@sanity/ui'
import {TextWithTone} from 'sanity'

export default function Logo() {
  return (
    <Flex align="center" gap={2} paddingX={2} paddingY={3}>
      <TextWithTone size={3} tone="primary">
        <TranslateIcon />
      </TextWithTone>
      <TextWithTone tone="primary" weight="bold">
        Course Platform
      </TextWithTone>
    </Flex>
  )
}
