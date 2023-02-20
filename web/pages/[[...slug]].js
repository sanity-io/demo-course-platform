import { PreviewSuspense } from "next-sanity/preview";
import { groq } from "next-sanity";
import dynamic from "next/dynamic";

import Body from "../components/layouts/Body";
import {
  courseQuery,
  homeQuery,
  legalQuery,
  lessonQuery,
  presenterQuery,
} from "../lib/queries";
import { client } from "../lib/sanity.client";

const PreviewBody = dynamic(() => import("../components/layouts/PreviewBody"));
const Loading = dynamic(() => import("../components/Loading"));

export default function Page({
  data: initialData,
  layout,
  query,
  queryParams,
  preview,
}) {
  if (preview && query && queryParams) {
    return (
      <PreviewSuspense fallback={<Loading />}>
        <PreviewBody layout={layout} query={query} queryParams={queryParams} />
      </PreviewSuspense>
    )
  }

  return <Body layout={layout} data={initialData} />;
}

export async function getStaticProps({
  params,
  locale,
  defaultLocale,
  preview = false,
}) {
  let layout;
  let query;
  const slugStart = params?.slug?.length ? params.slug[0] : null;
  const slugEnd = params?.slug?.length ? [...params.slug].pop() : null;
  const queryParams = {
    slug: slugEnd,
    language: locale,
    defaultLocale: defaultLocale,
  };

  if (!slugEnd) {
    // Home page has no slug
    layout = `home`;
    query = homeQuery;
  } else if (slugStart === `legal`) {
    // Legal slugs start with /legal
    layout = `legal`;
    query = legalQuery;
  } else if (slugStart === `presenter`) {
    // Presenter slugs start with /presenter
    layout = `presenter`;
    query = presenterQuery;
  } else if (params.slug.length === 2) {
    // Lesson slugs have /two/parts that are unpredictable
    layout = `lesson`;
    query = lessonQuery;
  } else {
    // Course slugs have /one part that is unpredictable
    layout = `course`;
    query = courseQuery;
  }

  const data = await client.fetch(query, queryParams);

  // Server-side we're only using an unauthenticated client
  // which won't find drafts, but client-side we might 
  // if preview mode is active
  if (!data && !preview) {
    return {
      notFound: true,
    };
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
  };
}

export async function getStaticPaths({ defaultLocale }) {
  const { courseSlugs, legalSlugs, presenterSlugs } = await client.fetch(
    groq`{
      "courseSlugs": *[_type in ["course"] && !(_id in path("drafts.**"))]{
        "courseSlug": slug[$defaultLocale].current,
        "lessonSlugs": lessons[]->slug.current,
      },
      "legalSlugs": *[_type == "legal" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current,
      "presenterSlugs": *[_type == "presenter" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current
    }`,
    { defaultLocale }
  );

  // For every "course", create the paths for each "lesson" reference
  const coursePaths = courseSlugs?.length
    ? courseSlugs.reduce((acc, cur) => {
        const fullLessonSlugs = cur.lessonSlugs.map((lessonSlug) => ({
          params: { slug: [cur.courseSlug, lessonSlug] },
        }));

        return [
          ...acc,
          { params: { slug: [cur.courseSlug] } },
          ...fullLessonSlugs,
        ];
      }, [])
    : [];

  const legalPaths = legalSlugs?.length
    ? legalSlugs.map((slug) => ({ params: { slug: [`legal`, slug] } }))
    : [];

  const presenterPaths = presenterSlugs?.length
    ? presenterSlugs.map((slug) => ({ params: { slug: [`presenter`, slug] } }))
    : [];

  return {
    paths: [...coursePaths, ...legalPaths, ...presenterPaths],
    // Dynamically create missing routes
    fallback: "blocking",
  };
}
