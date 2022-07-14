// Import the plugin versions of built-in actions
import {
  PublishWithi18nAction,
  DeleteWithi18nAction,
  DuplicateWithi18nAction,
} from '@sanity/document-internationalization/lib/actions'

// Import the default actions for comparison
import defaultResolve, {
  PublishAction,
  DuplicateAction,
  DeleteAction,
} from 'part:@sanity/base/document-actions'

// Instead of checking for the document type,
// we'll check for the presence of the `i18n` key on the document type's schema
import schema from 'part:@sanity/base/schema'

export default function resolveDocumentActions(props) {
  const defaultActions = defaultResolve(props)
  const documentSchema = schema.get(props.type)

  if (documentSchema.i18n) {
    const actionsWithoutDefaults = defaultActions.filter(
      (action) => ![PublishAction, DuplicateAction, DeleteAction].includes(action)
    )

    return [
      PublishWithi18nAction,
      ...actionsWithoutDefaults,
      DuplicateWithi18nAction,
      DeleteWithi18nAction,
    ]
  }

  return defaultActions
}
