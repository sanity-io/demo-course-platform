import sanityClient from 'part:@sanity/base/client'

import {i18n} from '../../languages'

// A random string that both the Studio and Next.js website know
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET ?? `SANITY_STUDIO_PREVIEW_SECRET`

// URL of the Next.js website
const remoteUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL ?? `https://demo-course-platform.sanity.build`
const localUrl = `http://localhost:3000`

const client = sanityClient.withConfig({apiVersion: `2021-05-19`})

export default async function resolveProductionUrl(doc, returnProd = false) {
  const baseUrl = window.location.hostname === 'localhost' && !returnProd ? localUrl : remoteUrl

  // Setup preview pathname and add secret
  const previewUrl = new URL(`${baseUrl}/api/preview`)
  previewUrl.searchParams.set(`secret`, previewSecret)

  // Build the slug
  let slug = doc?.slug?.current ?? ``

  if (doc._type === `lesson`) {
    let baseSlug = ``

    // We may need to get the base language's slug
    if (doc.__i18n_lang !== i18n.base) {
      if (!doc?.__i18n_base?._ref) {
        throw new Error(`Lesson ${doc._id} has no slug in base language`)
      }

      baseSlug = await client.fetch(`*[_id == $baseId][0].slug.current`, {
        baseId: doc.__i18n_base._ref,
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
  } else if (doc._type === 'course') {
    slug = doc.slug[i18n.base].current
  } else if (doc._type === 'legal') {
    slug = `legal/${doc?.slug?.current}`
  }

  // Add slug for Next.js to resolve
  previewUrl.searchParams.set(`slug`, `/${slug}`)

  return previewUrl.toString()
}
