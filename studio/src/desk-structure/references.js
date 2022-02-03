import S from '@sanity/desk-tool/structure-builder'
import DocumentsPane from 'sanity-plugin-documents-pane'

export default S.view
  .component(DocumentsPane)
  .options({
    query: `*[!(_id in path("drafts.**")) && references($id)]`,
    params: {id: `_id`},
    useDraft: false,
    debug: true,
  })
  .title('Courses')
