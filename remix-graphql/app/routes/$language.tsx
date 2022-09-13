import type {LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import type {GetLanguageLessonsQuery} from '~/models/sanity-generated'
import {getLessons} from '../services/sanity.service'

export const loader: LoaderFunction = async (request) => {
  const {language} = request.params
  const lessons = await getLessons(language)

  if (!lessons) {
    return new Response('Not found', {status: 404})
  }

  return {language, lessons}
}

export default function Index() {
  const {language, lessons} = useLoaderData<{
    language: string
    lessons: GetLanguageLessonsQuery['allLesson'][0][]
  }>()

  return (
    <div className="min-h-screen w-full p-4 font-mono flex flex-col gap-4">
      <h1 className="text-3xl">{language.toUpperCase()} Lessons</h1>
      {lessons.length > 0 ? (
        lessons.map((lesson) => (
          <div key={lesson._id} className="rounded bg-gray-100 p-4">
            {lesson?.slug?.current ? (
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
