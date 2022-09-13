import {gql} from 'graphql-request'

export const getAllLessons = gql`
  query GetAllLessons {
    allLesson {
      _id
      title
      language
      slug {
        current
      }
    }
  }
`

export const getLanguageLessons = gql`
  query GetLanguageLessons($language: String!) {
    allLesson(where: {language: {eq: $language}}) {
      _id
      title
      language
      slug {
        current
      }
    }
  }
`

export const getSingleLesson = gql`
  query GetLesson($language: String!, $slug: String!) {
    allLesson(limit: 1, where: {language: {eq: $language}, slug: {current: {eq: $slug}}}) {
      _id
      title
      language
      slug {
        current
      }
    }
  }
`

export const getSingleLessonTranslations = gql`
  query GetTranslations($id: ID!) {
    allTranslationMetadata(where: {_: {references: $id}}) {
      translations {
        _key
        value {
          title
          slug {
            current
          }
        }
      }
    }
  }
`
