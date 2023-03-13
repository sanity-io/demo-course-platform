import {FiAward, FiType, FiUsers} from 'react-icons/fi'
import {StructureResolver, DefaultDocumentNodeResolver} from 'sanity/desk'

import {i18n} from '../../languages'
import preview from './preview'
import references from './references'
import transifex from './transifex'

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
                  .schemaType('lesson')
                  .icon(FiAward)
                  .child(
                    S.documentList()
                      .id(language.id)
                      .title(`${language.title} Lessons`)
                      .schemaType('lesson')
                      .filter('_type == "lesson" && language == $language')
                      .params({language: language.id})
                      .initialValueTemplates([
                        S.initialValueTemplateItem('lesson-language', {
                          id: 'lesson-language',
                          language: language.id,
                        }),
                      ])
                      .canHandleIntent((intentName, params) => {
                        console.log({intentName}, params)

                        // TODO: Handle **existing** documents (like search results when clicked)
                        // to return `true` on the correct language list!
                        if (intentName === 'edit') {
                          // return params?.language === language.id
                          return false
                        }

                        // Not an initial value template
                        if (!params.template) {
                          return true
                        }

                        // Template name structure example: "lesson-en"
                        const [_, languageValue] = params?.template?.split(`-`)

                        return languageValue === language.id
                      })
                  )
              ),
              // I have only added this item so that search results when clicked will load this list
              // If the intent checker above could account for it, I'd remove this item
              S.divider(),
              S.listItem()
                .title(`All Lessons`)
                .schemaType('lesson')
                .icon(FiAward)
                .child(
                  S.documentList()
                    .id(`all-lessons`)
                    .title(`All Lessons`)
                    .schemaType('lesson')
                    .filter('_type == "lesson"')
                    // Load this pane for existing `lesson` documents
                    // or new documents that aren't using an initial value template
                    .canHandleIntent(
                      (intentName, params) => intentName === 'edit' || params.template === `lesson`
                    )
                ),
            ])
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
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType, getClient}) => {
  const client = getClient({apiVersion: `2023-01-01`})

  switch (schemaType) {
    case 'presenter':
      return S.document().views([S.view.form(), preview(S, client), references(S)])
    case 'course':
      return S.document().views([S.view.form(), preview(S, client), transifex(S)])
    case 'lesson':
      return S.document().views([S.view.form(), preview(S, client)])
    case 'legal':
      return S.document().views([S.view.form(), preview(S, client)])
    default:
      return S.document()
  }
}
