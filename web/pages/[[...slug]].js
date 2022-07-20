import {groq} from 'next-sanity'
import dynamic from 'next/dynamic'

import {i18n} from '../../languages'

import {usePreviewSubscription} from '../lib/sanity'
import {getClient} from '../lib/sanity.server'
import {courseQuery, homeQuery, legalQuery, lessonQuery, presenterQuery} from '../lib/queries'

const Course = dynamic(() => import('../components/layouts/Course'))
const Home = dynamic(() => import('../components/layouts/Home'))
const Legal = dynamic(() => import('../components/layouts/Legal'))
const Lesson = dynamic(() => import('../components/layouts/Lesson'))
const Presenter = dynamic(() => import('../components/layouts/Presenter'))

export default function Page({data: initialData, layout, query, queryParams, preview}) {
  const {data} = usePreviewSubscription(query, {
    params: queryParams,
    initialData,
    enabled: preview,
  })

  switch (layout) {
    case `course`:
      return <Course data={data} />
    case `home`:
      return <Home data={data} />
    case `legal`:
      return <Legal data={data} />
    case `lesson`:
      return <Lesson data={data} />
    case `presenter`:
      return <Presenter data={data} />
    default:
      return null
  }
}

export async function getStaticProps({params, locale, preview = false}) {
  let layout
  let query
  const slugStart = params?.slug?.length ? params.slug[0] : null
  const slugEnd = params?.slug?.length ? [...params.slug].pop() : null
  const queryParams = {slug: slugEnd, language: locale, baseLanguage: i18n.base}

  if (!slugEnd) {
    // Home page has no slug
    layout = `home`
    query = homeQuery
  } else if (slugStart === `legal`) {
    // Legal slugs start with /legal
    layout = `legal`
    query = legalQuery
  } else if (slugStart === `presenter`) {
    // Presenter slugs start with /presenter
    layout = `presenter`
    query = presenterQuery
  } else if (params.slug.length === 2) {
    // Lesson slugs have /two/parts that are unpredictable
    layout = `lesson`
    query = lessonQuery
  } else {
    // Course slugs have /one part that is unpredictable
    layout = `course`
    query = courseQuery
  }

  const data = await getClient(preview).fetch(query, queryParams)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
      layout,
      preview,
      query: preview ? query : null,
      queryParams: preview ? queryParams : null,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const {courseSlugs, legalSlugs, presenterSlugs} = await getClient(true).fetch(
    groq`{
      "courseSlugs": *[_type in ["course"] && defined(slug[$baseLanguage].current) && !(_id in path("drafts.**"))]{
        "courseSlug": slug[$baseLanguage].current,
        "lessonSlugs": lessons[]->slug.current,
      },
      "legalSlugs": *[_type == "legal" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current,
      "presenterSlugs": *[_type == "presenter" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current
    }`,
    {baseLanguage: i18n.base}
  )

  // For every "course", create the paths for each "lesson" reference
  const coursePaths = courseSlugs?.length
    ? courseSlugs.reduce((acc, cur) => {
        const fullLessonSlugs = cur.lessonSlugs.map((lessonSlug) => ({
          params: {slug: [cur.courseSlug, lessonSlug]},
        }))

        return [...acc, {params: {slug: [cur.courseSlug]}}, ...fullLessonSlugs]
      }, [])
    : []

  const legalPaths = legalSlugs?.length
    ? legalSlugs.map((slug) => ({params: {slug: [`legal`, slug]}}))
    : []

  const presenterPaths = presenterSlugs?.length
    ? presenterSlugs.map((slug) => ({params: {slug: [`presenter`, slug]}}))
    : []

  return {
    paths: [...coursePaths, ...legalPaths, ...presenterPaths],
    // Dynamically create missing routes
    fallback: 'blocking',
  }
}
