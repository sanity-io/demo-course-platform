import createImageUrlBuilder from '@sanity/image-url'

import {config} from './sanity.client'

export const urlFor = (source) => createImageUrlBuilder(config).image(source)