import {Tool} from 'sanity'
import {StackIcon} from '@sanity/icons'

import {SchemaVisualizerConfig} from './types'
import DeskTable from './DeskTable'

export type SchemaVisualizerToolConfig = (options: SchemaVisualizerConfig) => Tool

export const deskTableTool: SchemaVisualizerToolConfig = (options: SchemaVisualizerConfig) => ({
  name: 'desk-table',
  title: 'DeskTable',
  component: DeskTable,
  icon: StackIcon,
  options,
})
