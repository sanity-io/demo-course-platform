import {FiAward, FiType, FiUsers} from 'react-icons/fi'
import {StructureResolver, DefaultDocumentNodeResolver} from 'sanity/desk'

import preview from './preview'
// import references from './references'
import {i18n} from '../../languages'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Custom document-level translation structure
      S.listItem()
        .title('Lessons')
        .icon(FiAward)
        .child(
          S.list()
            .title('Lessons')
            .items([
              ...i18n.languages.map((language) =>
                S.listItem()
                  .title(`Lessons (${language.id.toLocaleUpperCase()})`)
                  .icon(FiAward)
                  .child(
                    S.documentList()
                      .id(language.id)
                      .title(`${language.title} Lessons`)
                      .schemaType('lesson')
                      .filter('_type == "lesson" && language == $language')
                      .params({language: language.id})
                      .initialValueTemplates([
                        S.initialValueTemplateItem(`lesson-with-language`, {
                          languageId: language.id,
                        }),
                      ])
                    // .canHandleIntent(S.documentTypeList(`lesson`).getCanHandleIntent())
                  )
              ),
              S.listItem()
                .title(`Lessons (Without Language)`)
                .icon(FiAward)
                .child(
                  S.documentList()
                    .id(`without-language`)
                    .title(`Lessons without Language`)
                    .schemaType('lesson')
                    .filter('_type == "lesson" && !defined(language)')
                ),
            ])
            .menuItems(
              i18n.languages.map(({id, title}) =>
                S.menuItem()
                  .title(`${title} Lesson`)
                  .intent({
                    type: 'create',
                    params: [
                      // Template name
                      {type: 'lesson-with-language'},
                      // Template params
                      {languageId: id},
                    ],
                  })
              )
            )
        ),
      // .menuItems(
      //   S.menuItemsFromInitialValueTemplateItems([
      //     S.initialValueTemplateItem('beer', {isCraft: true}),
      //     S.initialValueTemplateItem('cider', {isCraft: true}),
      //   ])
      // )
      // .canHandleIntent(S.documentTypeList(`lesson`).getCanHandleIntent())
      S.documentTypeListItem('translation.metadata').title('Translations'),
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
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType, client}) => {
  switch (schemaType) {
    case 'presenter':
      return S.document().views([
        S.view.form(),
        preview(S, client),
        // TODO: Re-add References Pane
        // references(S),
      ])
    case 'lesson':
    case 'course':
    case 'legal':
      return S.document().views([S.view.form(), preview(S, client)])
    default:
      return S.document()
  }
}
