import S from '@sanity/desk-tool/structure-builder'
import * as Structure from '@sanity/document-internationalization/lib/structure'
import {FiAward, FiType, FiUsers} from 'react-icons/fi'

import {i18n} from '../../../languages'
import preview from './preview'
import references from './references'
import transifex from './transifex'

export const getDefaultDocumentNode = ({schemaType}) => {
  switch (schemaType) {
    case 'presenter':
      return S.document().views([S.view.form(), preview, references])
    case 'course':
      return S.document().views([S.view.form(), preview, transifex])
    case 'lesson':
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
      // Custom document-level translation structure
      S.listItem()
        .title('Lessons')
        .icon(FiAward)
        .child(
          S.list()
            .title('Lessons')
            .items(
              i18n.languages.map((language) =>
                S.listItem()
                  .title(
                    `Lessons (${language.id.toLocaleUpperCase()}) ${
                      language.isDefault ? `(Base)` : ``
                    }`
                  )
                  .icon(FiAward)
                  .child(
                    S.documentList()
                      .id(language.id)
                      .title(`${language.title} Lessons`)
                      .schemaType('lesson')
                      .filter('_type == "lesson" && __i18n_lang == $language')
                      .params({language: language.id})
                      // .initialValueTemplates([
                      //   S.initialValueTemplateItem('lesson-language', {
                      //     language: language.id,
                      //   }),
                      // ])
                      .canHandleIntent(S.documentTypeList(`lesson`).getCanHandleIntent())
                  )
              )
            )
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
