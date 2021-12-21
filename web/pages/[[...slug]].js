import {groq} from 'next-sanity'
import dynamic from 'next/dynamic'

import {i18n} from '../../languages'

import {usePreviewSubscription} from '../lib/sanity'
import {getClient} from '../lib/sanity.server'
import {courseQuery, homeQuery, lessonQuery} from '../lib/queries'

const Course = dynamic(() => import('../components/layouts/Course'))
const Lesson = dynamic(() => import('../components/layouts/Lesson'))
const Home = dynamic(() => import('../components/layouts/Home'))

export default function Page({data: initialData, layout, query, queryParams, preview}) {
  const {data} = usePreviewSubscription(query, {
    params: queryParams,
    initialData,
    enabled: preview,
  })

  switch (layout) {
    case `home`:
      return <Home data={data} />
    case `course`:
      return <Course data={data} />
    case `lesson`:
      return <Lesson data={data} />

    default:
      return null
  }
}

export async function getStaticProps({params, locale, preview = false}) {
  let data
  let layout
  let query
  const slugEnd = params?.slug?.length ? [...params.slug].pop() : null
  const queryParams = {slug: slugEnd, language: locale}

  if (!slugEnd) {
    // Must be the "home" page
    layout = `home`
    query = homeQuery
    data = await getClient(preview).fetch(query)
  } else if (params.slug.length === 2) {
    // Must be a "lesson" page
    layout = `lesson`
    query = lessonQuery
    data = await getClient(preview).fetch(query, queryParams)
  } else {
    // Must be a "course" page
    layout = `course`
    query = courseQuery
    data = await getClient(preview).fetch(query, queryParams)
  }

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
  const courseSlugs = await getClient().fetch(
    groq`*[_type in ["course"] && defined(slug[$baseLanguage].current)]{
      "courseSlug": slug[$baseLanguage].current,
      "lessonSlugs": lessons[]->slug.current
    }`,
    {baseLanguage: i18n.base}
  )

  // For every "course", create the paths for each "lesson" reference
  const paths = courseSlugs.reduce((acc, cur) => {
    const fullLessonSlugs = cur.lessonSlugs.map((lessonSlug) => ({
      params: {slug: [cur.courseSlug, lessonSlug]},
    }))

    return [...acc, {params: {slug: [cur.courseSlug]}}, ...fullLessonSlugs]
  }, [])

  return {
    paths,
    // Dynamically create missing routes
    fallback: 'blocking',
  }
}
