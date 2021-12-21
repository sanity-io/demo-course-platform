import S from '@sanity/desk-tool/structure-builder'
import * as Structure from '@sanity/document-internationalization/lib/structure'
import {FiAward, FiType, FiUsers} from 'react-icons/fi'

import {i18n} from '../../../languages'
import preview from './preview'

export const getDefaultDocumentNode = ({schemaType}) => {
  if (schemaType === 'lesson') {
    return S.document().views([...Structure.getDocumentNodeViewsForSchemaType(schemaType), preview])
  } else if (schemaType === 'course') {
    return S.document().views([S.view.form(), preview])
  }

  return S.document()
}

const items = [
  // S.documentTypeListItem('lesson').title('Lessons All'),
  // Document-level translations
  S.listItem()
    .title('Lessons')
    .icon(FiAward)
    .child(
      S.documentList()
        .title('Lessons')
        .filter(`__i18n_lang == $baseLanguage`)
        .params({baseLanguage: i18n.base})
    ),
  // Field-level translations
  S.documentTypeListItem('course').title('Courses'),
  S.documentTypeListItem('presenter').title('Presenters').icon(FiUsers),
  S.divider(),
  // Singleton, field-level
  S.documentListItem().schemaType(`labelGroup`).icon(FiType).id(`labelGroup`).title(`Labels`),
  S.divider(),
  S.documentTypeListItem('legal').title('Legal Pages'),
  S.divider(),
  Structure.getMaintenanceListItem().serialize(),
]

export default () => {
  // const itemsFromPlugin = Structure.getFilteredDocumentTypeListItems().map((item) =>
  //   item.serialize ? item.serialize() : item
  // )

  return (
    S.list()
      .title('Content')
      // .items(itemsFromPlugin)
      .items(items)
  )
}
