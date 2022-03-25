import S from '@sanity/desk-tool/structure-builder'
import * as Structure from '@sanity/document-internationalization/lib/structure'
import {FiAward, FiType, FiUsers} from 'react-icons/fi'

import {i18n} from '../../../languages'
import markets from '../styles/markets.css?raw'
import preview from './preview'
import references from './references'
// import transifex from './transifex'

export const getDefaultDocumentNode = ({schemaType}) => {
  switch (schemaType) {
    case 'presenter':
      return S.document().views([S.view.form(), preview, references])
    case 'lesson':
    case 'course':
    case 'legal':
      return S.document().views([S.view.form(), preview])
    default:
      return S.document()
  }
}

export default () => {
  return S.list()
    .title('Content')
    .items([
      // ...Structure.getFilteredDocumentTypeListItems(),

      // Custom document-level translation structure
      S.listItem()
        .title('Lessons')
        .icon(FiAward)
        .child(
          S.documentList()
            .title('Lessons')
            .schemaType('lesson')
            .filter('__i18n_lang == $baseLanguage')
            .params({baseLanguage: i18n.base})
            .menuItems(S.documentTypeList('lesson').getMenuItems())
        ),
      S.divider(),
      // Field-level translations
      S.documentTypeListItem('course').title('Courses'),
      S.documentTypeListItem('presenter').title('Presenters').icon(FiUsers),
      S.divider(),
      // Singleton, field-level translations
      S.documentListItem().schemaType('labelGroup').icon(FiType).id('labelGroup').title('Labels'),
      S.divider(),
      // Market-specific portable text example
      S.documentTypeListItem('legal').title('Legal'),
      S.divider(),
      Structure.getMaintenanceListItem().serialize(),
    ])
}
