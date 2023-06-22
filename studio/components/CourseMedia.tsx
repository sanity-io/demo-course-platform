import React, {useEffect, useState} from 'react'
import {Reference, SanityDocument, useClient} from 'sanity'
import {SanityImageObjectStub} from '@sanity/asset-utils'
import styled from 'styled-components'
import {Box, Flex} from '@sanity/ui'

import {useImageUrlBuilder} from '../hooks/useImageUrlBuilder'

const SquareFlex = styled(Flex)`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;

  & div {
    border: 2px solid white;
    border-radius: 8px;
    z-index: 5;
    width: 50%;
    height: 50%;
    position: absolute;
    bottom: -2px;
    right: -2px;
  }

  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    object-fit: cover;
    z-index: 1;
  }
`

const options = {apiVersion: `2023-03-01`}

type CourseMediaType = {
  image: SanityImageObjectStub
  presenters?: Reference[]
}

export default function CourseMedia(props: CourseMediaType) {
  const {presenters = []} = props
  const [presenterDocs, setPresenterDocs] = useState<SanityDocument[]>([])
  const client = useClient(options)

  useEffect(() => {
    if (!presenterDocs.length && presenters.length) {
      client
        .fetch(`*[_type == "presenter" && _id in $ids]{_id, photo}`, {
          ids: presenters.map((presenter) => presenter._ref),
        })
        .then((data) => {
          setPresenterDocs(data)
        })
    }
  }, [client, presenters, presenterDocs])

  const builder = useImageUrlBuilder(options)

  const image = props.image
    ? builder?.image(props.image).width(400).height(400).auto('format').toString()
    : null

  const presenterImages = presenterDocs.reduce<string[]>((acc, doc) => {
    if (!builder || !doc.photo) {
      return acc
    }

    return [...acc, builder.image(doc.photo).width(100).height(100).auto('format').toString()]
  }, [])

  return (
    <SquareFlex align="center" justify="center">
      {image ? <img alt="" src={image} /> : null}

      {presenterImages.length > 0 ? (
        <Box>
          <img alt="" src={presenterImages[0]} />
        </Box>
      ) : null}
    </SquareFlex>
  )
}
