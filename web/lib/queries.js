import {groq} from 'next-sanity'

// We reuse this query on Courses and Lessons
const courseQueryData = groq`
    // "course" documents have field-level translated title and slug fields

    // You *could* pick them out of each object like this:
    // "title": title[$language],
    // "slug": slug[$language].current,
    
    // But this is useful information for the language-switching UI, so we'll query it all
    title,
    slug,

    // Every "lesson" is a reference to the base language version of a document
    lessons[]->{

      // Get each lesson's *base* language version's title and slug
      __i18n_lang,
      title,
      slug,

      // ...and all its connected document-level translations
      __i18n_refs[]->{
        __i18n_lang,
        title,
        slug
      }
    },

    // "course" documents have an array of "presenter" references
    presenters[]->{
      name,
      "title": title[$language],
    }
`

export const courseQuery = groq`*[_type == "course" && slug[$language].current == $slug][0]{
  ${courseQueryData}
}`

export const lessonQuery = groq`*[_type == "lesson" && slug.current == $slug][0]{
    // Get this whole document
    ...,

    // ...and get this lesson's course
    // Either by the _id of this document, or the _ref to the lesson's base language version
    "course": *[_type == "course" && (references(^._id) || references(^.__i18n_base._ref))][0]{
      ${courseQueryData}
    }
}`

export const homeQuery = groq`*[_type == "course" && !(_id in path('drafts.*'))]`
