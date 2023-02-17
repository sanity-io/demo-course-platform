import React from 'react'
import {CardTone, Stack, Flex, Card, Text, Code} from '@sanity/ui'
import {SchemaTypeDefinition} from 'sanity'
import Arrows from './Arrows'

function titleCase(str: string) {
  return str
    ? str
        .toLowerCase()
        .split(' ')
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
    : str
}

export default function Field(props: SchemaTypeDefinition) {
  const {title, name, type, to, of, fields, depth = 0, path = [], isFirst} = props
  const innerFields = of || fields || []
  const isPortableText = of?.length && of?.find((item) => item.type === 'block')
  const referenceTypes =
    type === 'reference' && to?.length ? to.map(({type}: {type: string}) => type) : []
  const newPath = [...path, name]
  const [cardTone, setCardTone] = React.useState<CardTone>(`default`)

  return (
    <>
      {name ? (
        <Card
          id={newPath.join(`.`)}
          borderTop={!isFirst}
          tone={cardTone}
          paddingX={3}
          paddingY={3}
          onMouseEnter={() => setCardTone('positive')}
          onMouseLeave={() => setCardTone('default')}
        >
          <Flex justify="space-between" gap={3} align="flex-end">
            <Text size={2}>{title || titleCase(name)}</Text>
            <Code size={1}>{isPortableText ? `portableText` : type}</Code>
            <Arrows types={referenceTypes} path={newPath} />
          </Flex>
        </Card>
      ) : null}
      {!isPortableText && innerFields.length > 0 ? (
        <Stack paddingLeft={2}>
          {innerFields.map((field) => (
            <Field key={field.name} {...field} depth={depth + 1} path={newPath} />
          ))}
        </Stack>
      ) : null}
    </>
  )
}
