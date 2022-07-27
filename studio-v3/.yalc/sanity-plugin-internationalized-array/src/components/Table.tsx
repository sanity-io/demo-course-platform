import React from 'react'
import styled, {css} from 'styled-components'
import {Box, BoxProps, Card, CardProps} from '@sanity/ui'

// Wrappers required because of bug with passing down "as" prop
// https://github.com/styled-components/styled-components/issues/2449

// Table
const TableWrapper = (props = {}) => {
  return <Box as="table" {...props} />
}

const StyledTable = styled(TableWrapper)(
  () =>
    css`
      display: table;
      width: 100%;

      &:not([hidden]) {
        display: table;
      }
    `
)

type TableProps = BoxProps & {
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Table(props: TableProps) {
  const {children, ...rest} = props

  return <StyledTable {...rest}>{children}</StyledTable>
}

// Row
const RowWrapper = (props = {}) => {
  return <Card as="tr" {...props} />
}

const StyledRow = styled(RowWrapper)(
  () =>
    css`
      display: table-row;

      &:not([hidden]) {
        display: table-row;
      }
    `
)

type TableRowProps = CardProps & {
  children: React.ReactNode
  style?: React.CSSProperties
}

export function TableRow(props: TableRowProps) {
  const {children, ...rest} = props

  return <StyledRow {...rest}>{children}</StyledRow>
}

// Cell
const CellWrapper = (props = {}) => {
  return <Box as="td" {...props} />
}

const StyledCell = styled(CellWrapper)(
  () =>
    css`
      display: table-cell;

      &:not([hidden]) {
        display: table-cell;
      }
    `
)

type TableCellProps = BoxProps & {
  children: React.ReactNode
  style?: React.CSSProperties
}

export function TableCell(props: TableCellProps) {
  const {children, ...rest} = props

  return <StyledCell {...rest}>{children}</StyledCell>
}
