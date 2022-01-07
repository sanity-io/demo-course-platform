import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import course from './documents/course'
import labelGroup from './documents/labelGroup'
import legal from './documents/legal'
import lesson from './documents/lesson'
import presenter from './documents/presenter'

import seo from './objects/seo'
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'
import localizedSlug from './objects/localizedSlug'
import callout from './objects/callout'
import googleTranslateString from './objects/googleTranslateString'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // documents
    course,
    labelGroup,
    legal,
    lesson,
    presenter,

    // objects
    seo,
    callout,
    localizedString,
    localizedText,
    localizedSlug,
    googleTranslateString,
  ]),
})
