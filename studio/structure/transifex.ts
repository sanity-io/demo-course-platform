import {StructureBuilder} from 'sanity/desk'
import {TranslationsTab, defaultFieldLevelConfig} from 'sanity-plugin-transifex'

export default (S: StructureBuilder) =>
  S.view.component(TranslationsTab).title('Transifex').options(defaultFieldLevelConfig)
