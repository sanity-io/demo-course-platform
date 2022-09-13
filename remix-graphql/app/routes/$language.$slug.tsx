import type {LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'

import type {GetLessonQuery, GetTranslationsQuery} from '~/models/sanity-generated'
import {getLesson} from '~/services/sanity.service'

export const loader: LoaderFunction = async (request) => {
  const {language, slug} = request.params
  const {lesson, translationMetadata} = await getLesson(language, slug)

  if (!lesson) {
    return new Response('Not found', {status: 404})
  }

  return {language, lesson, translationMetadata}
}

export default function Index() {
  const {language, lesson, translationMetadata} = useLoaderData<{
    language: string
    lesson: GetLessonQuery['allLesson'][0]
    translationMetadata: GetTranslationsQuery['allTranslationMetadata'][0]
  }>()

  return (
    <div className="min-h-screen w-full p-4 flex flex-col gap-8">
      {translationMetadata?.translations && translationMetadata?.translations?.length > 0 ? (
        <ul className="flex items-center">
          {translationMetadata?.translations?.map((translation) => (
            <li
              key={translation?._key}
              className={
                translation?._key === language
                  ? `bg-purple-300 text-purple-600`
                  : `bg-purple-100 text-purple-700`
              }
            >
              <Link
                className="block leading-none py-3 px-4 font-bold text-mono text-sm"
                to={`/${translation?._key}/${translation?.value?.slug?.current}`}
                title={translation?.value?.title as string | undefined}
              >
                {translation?._key?.toLocaleUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <h1 className="font-black text-5xl">{lesson.title}</h1>
    </div>
  )
}
