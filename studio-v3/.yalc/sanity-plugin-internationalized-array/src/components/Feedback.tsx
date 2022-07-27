import {Text, Card, Stack, Code} from '@sanity/ui'
import React from 'react'

const schemaExample = {
  languages: [
    {id: 'en', title: 'English'},
    {id: 'no', title: 'Norsk'},
  ],
}

export default function Feedback() {
  return (
    <Card tone="caution" border radius={2} padding={3}>
      <Stack space={4}>
        <Text>
          An array of language objects must be passed into the <code>internationalizedArray</code>{' '}
          helper function, each with an <code>id</code> and <code>title</code> field. Example:
        </Text>
        <Card padding={2} border radius={2}>
          <Code size={1} language="javascript">
            {JSON.stringify(schemaExample, null, 2)}
          </Code>
        </Card>
      </Stack>
    </Card>
  )
}
