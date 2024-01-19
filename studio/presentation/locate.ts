import groq from 'groq'
import {map} from 'rxjs'
import {ListenQueryOptions} from 'sanity'
import type {DocumentLocationResolver} from 'sanity/presentation'

const DEFAULT_LANG = 'en'

// See: https://www.sanity.io/docs/configuring-the-presentation-tool#7dce82cbe90b
export const locate: DocumentLocationResolver = (params, context) => {
  let doc$ = null
  const queryParams = {...params, lang: DEFAULT_LANG}
  const listenOptions: ListenQueryOptions = {perspective: 'previewDrafts'}

  if (params.type === 'presenter') {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
            slug,
            "title": name
        }`,
      queryParams,
      listenOptions
    )

    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.slug?.current) {
          return null
        }

        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/${DEFAULT_LANG}/presenter/${doc.slug.current}`,
            },
          ],
        }
      })
    )
  } else if (params.type === 'legal') {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{slug, title}`,
      queryParams,
      listenOptions
    )

    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.slug?.current) {
          return null
        }

        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/${DEFAULT_LANG}/legal/${doc.slug.current}`,
            },
          ],
        }
      })
    )
  } else if (params.type === 'course') {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
            "slug": slug[$lang],
            "title": title[$lang]
          }`,
      queryParams,
      listenOptions
    )

    return doc$.pipe(
      map((doc) => {
        console.log(doc)
        if (!doc || !doc.slug?.current) {
          return null
        }

        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/${DEFAULT_LANG}/${doc.slug.current}`,
            },
            {
              title: 'Home',
              href: `/${DEFAULT_LANG}`,
            },
          ],
        }
      })
    )
  } else if (params.type === 'lesson') {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
              slug,
              // TODO: Perform lookup for non-base-language lessons to lookup metadata document
              "courseSlug": *[_type == "course" && references(^._id)][0].slug,
              title,
              language
          }`,
      queryParams,
      listenOptions
    )

    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc?.language || !doc.slug?.current || !doc.courseSlug) {
          return null
        }

        // Cannot retrieve values in GROQ dynamically based on the value of a field
        const courseSlug = doc.courseSlug[doc.language] || doc.courseSlug[DEFAULT_LANG]

        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/${doc.language}/${courseSlug.current}/${doc.slug.current}`,
            },
          ],
        }
      })
    )
  }

  return null
}
