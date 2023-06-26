import {SanityImageSource} from '@sanity/asset-utils'
import createImageUrlBuilder from '@sanity/image-url'

import {baseConfig} from './client'

export const urlFor = (source: SanityImageSource) => createImageUrlBuilder(baseConfig).image(source)
