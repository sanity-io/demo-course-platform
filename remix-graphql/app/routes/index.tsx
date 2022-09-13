import type {LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'

import type {GetAllLessonsQuery} from '~/models/sanity-generated'
import {getLessons} from '../services/sanity.service'

export const loader: LoaderFunction = async () => {
  const lessons = await getLessons()
  return {lessons}
}

export default function Index() {
  const {lessons} = useLoaderData<{
    lessons: GetAllLessonsQuery['allLesson'][0][]
  }>()

  return (
    <div className="min-h-screen w-full p-4 font-mono flex flex-col gap-4">
      <h1 className="text-3xl">All Lessons</h1>
      {lessons.length > 0 ? (
        lessons.map((lesson) => (
          <div key={lesson._id} className="rounded bg-gray-100 p-4">
            {lesson?.slug?.current && lesson.language ? (
              <h2 className="font-bold text-xl text-blue-600 hover:text-blue-400">
                <Link to={`/${lesson.language}/${lesson.slug.current}`}>{lesson.title}</Link>
              </h2>
            ) : (
              <h2 className="font-bold text-xl text-gray-600">
                <>{lesson.title}</>
              </h2>
            )}
            <p className="font-bold text-xs text-gray-600">{lesson.language}</p>
          </div>
        ))
      ) : (
        <div>No lessons found</div>
      )}
    </div>
  )
}
