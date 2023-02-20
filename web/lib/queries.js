import {groq} from 'next-sanity'

export const labelsQuery = groq`*[_id == "labelGroup"][0].labels[]{
  key,
  "text": coalesce(text[$language], text[$defaultLocale]),
}`

export const presenterQuery = groq`*[_type == "presenter" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  ...,
  "title": coalesce(title[_key == $language][0].value, title[_key == $defaultLocale][0].value),
  "biography": coalesce(biography[_key == $language][0].value, biography[_key == $defaultLocale][0].value),
}`

export const legalsQuery = groq`*[_type == "legal" && !(_id in path("drafts.**"))]{
  _id,
  title,
  slug
}`

export const legalQuery = groq`*[_type == "legal" && slug.current == $slug][0]{
  ...,
  // Filter portable text blocks that belong to this market are not market specific
  content[_type != "marketContent" || (_type == "marketContent" && market == $language)] {
    ...,
    // filter inline blocks with the same conditions
    "children": children[_type != "marketContent" || (_type == "marketContent" && market == $language)]
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
      language,
      title,
      slug,

      // ...and all its connected document-level translations
      "translations": *[
        // by finding the translation metadata document
        _type == "translation.metadata" && 
        // that contains this lesson's _id
        ^._id in translations[].value._ref
        // then map over the translations array
      ][0].translations[]{
        // and spread the "value" of each reference to the root level
        ...(value->{
          language,
          title,
          slug
        })
      }
    },

    // "course" documents have an array of "presenter" references
    presenters[]->{
      name,
      // presenter field-level translations use arrays, not objects
      "title": coalesce(title[_key == $language][0].value, title[_key == $defaultLocale][0].value),
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
    // In this Project, we have single "course" documents that reference "English" language version lessons
    "course": select(
      // So if this lesson isn't in English...
      ^.language != $defaultLocale => *[_type == "translation.metadata" && ^._id in translations[].value._ref][0]{
        // our query has to look up through the translations metadata
        // and find the course that references the English version, not this language version
        "course": *[
          _type == "course" && 
          ^.translations[_key == $defaultLocale][0].value._ref in lessons[]._ref
        ][0]{ ${courseQueryData} }
      }.course,
      // By default, 
      *[_type == "course" && ^._id in translations[].value._ref][0]{ ${courseQueryData} }
    ),

    // Plus global labels
    "labels": ${labelsQuery},
    "legals": ${legalsQuery}
}`

export const homeQuery = groq`{
  "courses": *[_type == "course" && !(_id in path('drafts.*')) && count(presenters) > 0 && count(lessons) > 0],
  "labels": ${labelsQuery},
  "legals": ${legalsQuery}
}`
