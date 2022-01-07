/* eslint-disable react/display-name */
import Callout from '../components/Callout'
import Prism from '../components/Prism'

export const serializers = {
  container: ({children}) => children,
  types: {
    code: ({node}) => (node?.code ? <Prism code={node.code} language={node?.language} /> : null),
    callout: ({node}) => <Callout tone={node?.tone} content={node?.content} />,
  },
}
