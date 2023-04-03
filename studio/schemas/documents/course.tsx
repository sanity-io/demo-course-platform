import {FiAward, FiBook, FiGlobe, FiImage, FiUsers} from 'react-icons/fi'
import {defineType, defineField, Reference} from 'sanity'
import {SanityImageObjectStub} from '@sanity/asset-utils'

import {i18n} from '../../../languages'
import CourseMedia from '../../components/CourseMedia'

export default defineType({
  name: 'course',
  title: 'Course',
  icon: FiBook,
  type: 'document',
  groups: [
    {
      name: 'i18n',
      title: 'Localised',
      icon: FiGlobe,
      default: true,
    },
    {
      name: 'presenters',
      title: 'Presenters',
      icon: FiUsers,
    },
    {
      name: 'lessons',
      title: 'Lessons',
      icon: FiAward,
    },
    {
      name: 'media',
      title: 'Media',
      icon: FiImage,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This is a localized string field, stored in an object',
      type: 'localizedString',
      group: ['i18n'],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'localizedSlug',
      group: ['i18n'],
      validation: (Rule) =>
        Rule.required().error('A slug is required to generate a page on the website'),
    }),
    defineField({
      name: 'presenters',
      group: 'presenters',
      type: 'array',
      of: [
        defineField({
          name: 'presenter',
          type: 'reference',
          to: [{type: 'presenter'}],
        }),
      ],
    }),
    defineField({
      name: 'lessons',
      group: 'lessons',
      type: 'array',
      of: [
        defineField({
          name: 'lesson',
          title: 'Lesson',
          type: 'reference',
          to: [{type: 'lesson'}],
        }),
      ],
      validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: ['media'],
    }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
      lessons: 'lessons',
      presenters: 'presenters',
      image: 'image',
    },
    // Overloading the type causes an error
    // @ts-ignore
    prepare({
      title,
      lessons,
      presenters,
      image,
    }: {
      title: string
      lessons: Reference[]
      presenters: Reference[]
      image: SanityImageObjectStub
    }) {
      const lessonCount = lessons?.length || 0
      const lessonSubtitle = lessonCount
        ? `${lessonCount} ${lessonCount === 1 ? `lesson` : `lessons`}`
        : 'No lessons'
      const presenterCount = presenters?.length || 0
      const presenterSubtitle = presenterCount
        ? `${presenterCount} ${presenterCount === 1 ? `presenter` : `presenters`}`
        : 'No presenters'

      return {
        title,
        subtitle: [lessonSubtitle, presenterSubtitle].join(' · '),
        media: presenterCount ? (
          <CourseMedia image={image} presenters={presenters} />
        ) : (
          image ?? FiBook
        ),
      }
    },
  },
})
