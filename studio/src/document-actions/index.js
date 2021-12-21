import defaultResolve from 'part:@sanity/base/document-actions'

export default function resolveDocumentActions(props) {
  const defaultActions = defaultResolve(props)

  return defaultActions
}
