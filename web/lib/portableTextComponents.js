/* eslint-disable react/display-name */
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'

import Callout from '../components/Callout'
import Prism from '../components/Prism'
import Reference from '../components/Reference'

import {config} from './config'

const SanityImage = ({value}) => {
  const {width, height} = getImageDimensions(value)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={urlBuilder(config).image(value).width(800).auto('format').url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}

export const portableTextComponents = {
  marks: {
    reference: (props) => <Reference {...props} />,
  },
  types: {
    code: ({value}) =>
      value?.code ? <Prism code={value.code} language={value?.language} /> : null,
    callout: ({value}) =>
      value?.content?.length ? <Callout tone={value?.tone} content={value.content} /> : null,
    image: SanityImage,
  },
}
