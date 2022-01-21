import S from '@sanity/desk-tool/structure-builder'
import {TranslationsTab, defaultDocumentLevelConfig} from 'sanity-plugin-transifex'

export default S.view
  .component(TranslationsTab)
  .title('Transifex')
  .options(defaultDocumentLevelConfig)
