/* eslint-disable react/display-name */
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
import {PortableText} from '@portabletext/react'

import Callout from '../components/Callout'
import Prism from '../components/Prism'
import Reference from '../components/Reference'

import ProseableText from '../components/ProseableText'
import {config} from './config'

const SanityImage = ({value}) => {
  if (!value.asset) {
    return null
  }

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

const inlineComponents = {
  block: {
    normal: ({children}) =>
      children ? (
        <>
          {` `}
          <span className="bg-purple-50 ring-purple-50 text-purple-900 ring-4 rounded">
            {children}
          </span>
          {` `}
        </>
      ) : null,
  },
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
    marketContent: (props) => {
      const {isInline} = props

      const value = props?.value?.content ?? []

      if (!value.length) {
        return null
      }

      return isInline ? (
        <PortableText value={value} components={inlineComponents} />
      ) : (
        // This is deliberately highlighted for the demo
        <div className="bg-yellow-50 ring-yellow-50 text-yellow-900 ring-4 rounded">
          <ProseableText value={value} components={portableTextComponents} />
        </div>
      )
    },
  },
}
