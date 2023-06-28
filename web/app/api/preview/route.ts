import {vercelStegaSplit} from '@vercel/stega'
import {draftMode} from 'next/headers'
import {groq} from 'next-sanity'

import {clean} from '@/components/Clean'
import {getSecret, SECRET_ID} from '@/lib/getSecret'
import {previewClient} from '@/sanity/client'

import {i18n} from '../../../../languages'

function isLinkToOurDomain(url: string) {
  let suppliedUrl = new URL(url)

  // If url is relative, the 2nd arg will act as the base domain.
  const safeOrigin = process.env.VERCEL
    ? `https://${
        process.env.VERCEL_ENV === 'production'
          ? process.env.VERCEL_URL
          : process.env.VERCEL_BRANCH_URL
      }`
    : `http://localhost:3000`
  let checkUrl = new URL(url, safeOrigin)

  // if the origins don't match we've been given a url
  // to a site that's not ours!
  return suppliedUrl.origin === checkUrl.origin
}

export async function GET(request: Request) {
  const {origin, searchParams} = new URL(request.url)

  const id = searchParams.get('id')

  if (!id) {
    return new Response('No "id" provided', {status: 401})
  } else if (id.startsWith('drafts.')) {
    return new Response('Must use a published "id"', {status: 401})
  } else if (!searchParams.get('secret')) {
    return new Response('No "secret" provided', {status: 401})
  }

  const secret = clean(await getSecret(previewClient, SECRET_ID, false))

  if (!secret) {
    return new Response('No "secret" found', {status: 401})
  } else if (searchParams.get('secret') !== secret) {
    return new Response('Invalid "secret"', {status: 401})
  }

  // Ensure this slug actually exists in the dataset
  const query = groq`*[_id == $id && defined(slug)]|order(_updatedAt desc)[0]{ _type, language, slug }`
  const doc = await previewClient.fetch(query, {id})

  if (!doc) {
    return new Response('Document not found', {status: 401})
  }

  // Create the full slug from the id
  const {_type} = doc

  let slug
  const courseSlug = `come-back-and-make-this-actually-required`

  // Build full URL based on returned document
  switch (_type) {
    case 'legal':
      slug = doc?.slug?.current ? `/legal/${doc.slug.current}` : ``
      break
    case 'presenter':
      slug = doc?.slug?.current ? `/presenter/${doc.slug.current}` : ``
      break
    case 'lesson':
      slug = doc?.slug?.current ? `/${courseSlug}/${doc.slug.current}` : ``
      break
    case 'course':
      slug = doc?.slug?.[i18n.base]?.current ? `/${doc?.slug?.[i18n.base]?.current}` : ``
      break
    default:
      break
  }

  if (!slug) {
    return new Response('Slug not found', {status: 401})
  }

  // Redirect to the newly created slug
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  const redirectUrl = new URL(slug, origin)

  if (!isLinkToOurDomain(redirectUrl.toString())) {
    return new Response(`Unsafe redirect: ${redirectUrl}`, {status: 401})
  }

  // Initialise draft mode
  draftMode().enable()

  return Response.redirect(redirectUrl.toString())
}
