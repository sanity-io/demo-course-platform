import S from '@sanity/desk-tool/structure-builder'
import {TranslationsTab, defaultFieldLevelConfig} from 'sanity-plugin-transifex'

export default S.view.component(TranslationsTab).title('Transifex').options(defaultFieldLevelConfig)
