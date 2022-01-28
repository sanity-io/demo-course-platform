/* eslint-disable react/display-name */
import Callout from '../components/Callout'
import Prism from '../components/Prism'
import Reference from '../components/Reference'

export const serializers = {
  container: ({children}) => children,
  marks: {
    reference: (props) => <Reference {...props} />,
  },
  types: {
    code: ({node}) => (node?.code ? <Prism code={node.code} language={node?.language} /> : null),
    callout: ({node}) => <Callout tone={node?.tone} content={node?.content} />,
    marketContent: ({node}) => (
      <pre className="bg-gray-100 p-8">{JSON.stringify(node, null, 2)}</pre>
    ),
  },
}
