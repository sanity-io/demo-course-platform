import Iframe from 'sanity-plugin-iframe-pane'
import {StructureBuilder} from 'sanity/desk'

// import resolveProductionUrl from '../resolveProductionUrl'

export default (S: StructureBuilder) =>
  S.view
    .component(Iframe)
    .options({
      // url: (doc) => resolveProductionUrl(doc),
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      reload: {button: true},
    })
    .title('Preview')
