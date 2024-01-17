import DocumentsPane from 'sanity-plugin-documents-pane'
import {StructureBuilder} from 'sanity/structure'

export default (S: StructureBuilder) =>
  S.view
    .component(DocumentsPane)
    .options({
      query: `*[!(_id in path("drafts.**")) && references($id)]`,
      params: {id: `_id`},
      useDraft: false,
      debug: true,
    })
    .title('Courses')
