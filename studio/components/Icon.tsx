import {Card} from '@sanity/ui'
import {TranslateIcon} from '@sanity/icons'
import styled from 'styled-components'

export const SquareCard = styled(Card)`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: var(--card-link-color);
  color: var(--card-bg2-color);
`

export default function Icon() {
  return (
    <SquareCard>
      <TranslateIcon />
    </SquareCard>
  )
}
