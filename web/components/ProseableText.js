/* eslint-disable react/forbid-prop-types */
import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {PortableText} from '@portabletext/react'

import {portableTextComponents} from '../lib/portableTextComponents'
/**
 * Use Tailwind CSS's `prose` classes with Portable Text
 * But escape `prose` styling for custom components (or `types`)
 */
export default function ProseableText({value = []}) {
  // Before grouping, inline any marketContent _type blocks
  // ...if you want to, I don't because I want to highlight them for demo purposes
  // const inlinedValue = useMemo(
  //   () =>
  //     value.reduce((acc, item) => {
  //       if (item._type === 'marketContent' && item?.content?.length) {
  //         return [...acc, ...item.content]
  //       }

  //       return [...acc, item]
  //     }, []),
  //   [value]
  // )

  // Group together standard `_type === "block"`  blocks
  // eg <p>, <li>, etc – and separate out everyone else
  const valueGroups = useMemo(
    () =>
      value.reduce(
        (acc, item) => {
          const lastIdx = acc.length - 1

          if (
            // We don't have items in this group yet
            acc[lastIdx].length === 0 ||
            // The last group has the same `type`
            acc[lastIdx][0]._type === item._type
          ) {
            acc[lastIdx].push(item)
          } else {
            // Time to create a new group, because the `type` is different compared to last group
            acc.push([item])
          }

          return acc
        },
        [[]]
      ),
    [value]
  )

  if (!valueGroups?.length) return null

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8">
      {valueGroups.map((group) =>
        group[0]._type === 'block' ? (
          <div
            key={group[0]._key}
            className="prose prose-slate md:prose-lg lg:prose-xl w-full prose-h2:text-cyan-800 prose-h3:text-cyan-700 prose-a:text-cyan-500 prose-a:transition-colors prose-a:duration-200 hover:prose-a:text-pink-500 prose-code:text-pink-700 prose-h2:font-display prose-h3:font-display"
          >
            <PortableText components={portableTextComponents} value={group} />
          </div>
        ) : (
          <PortableText key={group[0]._key} components={portableTextComponents} value={group} />
        )
      )}
    </div>
  )
}

ProseableText.propTypes = {
  value: PropTypes.array.isRequired,
}
