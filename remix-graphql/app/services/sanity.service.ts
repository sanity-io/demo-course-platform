import {GraphQLClient} from 'graphql-request'

import type {
  GetAllLessonsQuery,
  GetLanguageLessonsQuery,
  GetLessonQuery,
  GetTranslationsQuery,
} from '../models/sanity-generated'
import {
  getLanguageLessons,
  getAllLessons,
  getSingleLesson,
  getSingleLessonTranslations,
} from '../graphql/lessons.query'

const graphcms = new GraphQLClient(process.env.SANITY_API_URL || '', {
  headers: {
    authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
  },
})

export async function getLessons(language?: string) {
  const {allLesson} = language
    ? await graphcms.request<GetLanguageLessonsQuery>(getLanguageLessons, {language})
    : await graphcms.request<GetAllLessonsQuery>(getAllLessons)

  return allLesson
}

export async function getLesson(language?: string, slug?: string) {
  // Find this lesson
  const {allLesson} = await graphcms.request<GetLessonQuery>(getSingleLesson, {language, slug})

  if (!allLesson?.[0]?._id) {
    return {}
  }

  // Find this lesson's translation metadata
  const id = allLesson[0]._id

  const {allTranslationMetadata} = await graphcms.request<GetTranslationsQuery>(
    getSingleLessonTranslations,
    {id}
  )

  return {
    lesson: allLesson.length ? allLesson[0] : null,
    translationMetadata: allTranslationMetadata.length ? allTranslationMetadata[0] : null,
  }
}
