'use client'

import {enableVisualEditing} from '@sanity/overlays'
import {useEffect} from 'react'

export default function VisualEditing() {
  useEffect(enableVisualEditing, [])

  return null
}
