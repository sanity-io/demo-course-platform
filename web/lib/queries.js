import {groq} from 'next-sanity'

export const labelsQuery = groq`*[_id == "labelGroup"][0].labels[]{
  key,
  "text": coalesce(text[$language], text[$baseLanguage]),
}`
export const legalsQuery = groq`*[_type == "legal" && !(_id in path("drafts.**"))]{
  _id,
  title,
  slug
}`
export const legalQuery = groq`*[_type == "legal" && slug.current == $slug][0]{
  ...,
  content[_type != "marketContent" || (_type == "marketContent" && market == $language)]{
    ...,
    
    // Filter markDefs down to just this language if annotation is "marketText"
    markDefs[_type != "marketText" || (_type == "marketText" && market == $language)],

    // Filter children array to items with no marks, or a key in the filtered markers
    children[
      !defined(marks) || count(marks) < 1 || 
      marks[0] in ^.markDefs[_type != "marketText" || (_type == "marketText" && market == $language)]._key
    ]
  },
  "legals": ${legalsQuery}
}`

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
      "title": coalesce(title[$language], title[$baseLanguage]),
    },

    // Plus global data
    "labels": ${labelsQuery},
    "legals": ${legalsQuery}
`

export const courseQuery = groq`*[_type == "course" && slug[$language].current == $slug][0]{
  ${courseQueryData},

  // Plus global data
  "labels": ${labelsQuery},
  "legals": ${legalsQuery}
}`

export const lessonQuery = groq`*[_type == "lesson" && slug.current == $slug][0]{
    // Get this whole document
    ...,
    content[] {
      ...,
      markDefs[] {
        ...,
        _type == "reference" => {
          ...,
          "slug": @->.slug
        }      
      }
    },

    // ...and get this lesson's course
    // Either by the _id of this document, or the _ref to the lesson's base language version
    "course": *[_type == "course" && (references(^._id) || references(^.__i18n_base._ref))][0]{
      ${courseQueryData}
    },

    // Plus global labels
    "labels": ${labelsQuery},
    "legals": ${legalsQuery}
}`

export const homeQuery = groq`{
  "courses": *[_type == "course" && !(_id in path('drafts.*'))],
  "labels": ${labelsQuery},
  "legals": ${legalsQuery}
}`
