import {SanityImageSource} from '@sanity/asset-utils'
import createImageUrlBuilder from '@sanity/image-url'

import {config} from './client'

export const urlFor = (source: SanityImageSource) => createImageUrlBuilder(config).image(source)
