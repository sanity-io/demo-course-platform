import {SanityClient} from '@sanity/client'
import {SanityDocumentLike} from 'sanity'

import {i18n} from '../../languages'

// URL of the Next.js website
const remoteUrl =
  import.meta.env.SANITY_STUDIO_PREVIEW_URL ?? `https://demo-course-platform.sanity.build`
const localUrl = `http://localhost:3000`

type DocWithSlug = SanityDocumentLike & {
  slug?: {
    current: string | Record<string, {current: string}>
  }
  language?: string
}

export default async function resolveProductionUrl(doc: DocWithSlug, client: SanityClient) {
  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

  // Setup preview pathname
  const previewUrl = new URL(`${baseUrl}/api/preview`)

  // Build the slug
  let slug = doc?.slug?.current ?? ``

  if (doc._type === `lesson`) {
    let baseSlug = ``

    // We may need to get the base language's slug
    if (doc.language !== i18n.base) {
      if (!doc?.language?._ref) {
        throw new Error(`Lesson ${doc._id} has no slug in base language`)
      }

      baseSlug = await client.fetch(`*[_id == $baseId][0].slug.current`, {
        baseId: doc.language._ref,
      })
    }

    // Then get the course slug
    const courseQuery = `*[
        // Find the course
        _type == "course" &&
        // That has a lesson reference with this lesson's slug
        $lessonSlug in lessons[]->slug.current
        // And pick off the matching language slug
    ][0].slug[$language].current`
    const courseParams = {
      lessonSlug: baseSlug || slug,
      language: doc?.__i18n_lang ?? i18n.base,
    }

    const courseSlug = await client.fetch(courseQuery, courseParams)

    if (courseSlug) {
      slug =
        doc.__i18n_lang === i18n.base
          ? [courseSlug, slug].join(`/`)
          : [doc.__i18n_lang, courseSlug, slug].join(`/`)
    }
    // @ts-ignore
  } else if (doc._type === 'course' && i18n?.base && doc?.slug[i18n.base].current) {
    // @ts-ignore
    slug = doc.slug[i18n.base].current
  } else if (doc._type === 'legal') {
    slug = `legal/${doc?.slug?.current}`
  } else if (doc._type === 'presenter') {
    slug = `presenter/${doc?.slug?.current}`
  }

  // Add slug for Next.js to resolve
  previewUrl.searchParams.set(`slug`, `/${slug}`)

  return previewUrl.toString()
}