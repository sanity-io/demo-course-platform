'use client'

import {ArrowRightIcon} from '@heroicons/react/24/outline'
import {useParams} from 'next/navigation'
import {SanityDocument} from 'next-sanity'

import {getLabelByKey} from '@/lib/getLabelByKey'
import {createCourseSummary} from '@/lib/helpers'
import {Label} from '@/lib/types'

import Button from './Button'
import Title from './Title'

type HomeLayoutProps = {
  data?: {courses: SanityDocument[]}
  labels: Label[]
}

export function HomeLayout(props: HomeLayoutProps) {
  const {labels} = props
  const {courses} = props.data || {}
  const params = useParams()
  const language = Array.isArray(params.language) ? params.language[0] : params.language
  const courseStart = getLabelByKey('course.start', labels)

  return (
    <div className="container mx-auto pt-header grid grid-cols-1 gap-header mt-header px-4 md:px-0">
      {courses &&
        courses?.length > 0 &&
        courses.map((course) => (
          <article
            key={course._id}
            className="relative bg-gradient-to-tr mix-blend-multiply from-cyan-100 via-pink-100 to-yellow-100 p-8 md:p-16 xl:p-24 rounded-xl md:rounded-2xl xl:rounded-3xl w-full max-w-7xl mx-auto flex flex-col gap-4 md:flex-row items-start md:items-center md:justify-between group 
            hover:scale-[1.01] hover:rotate-[-0.25deg] 
            transition-transform duration-200"
          >
            {course?.slug?.[language]?.current ? (
              <>
                <Title subtitle={createCourseSummary(course.lessons, course.presenters, labels)}>
                  {course.title ? course.title[language] : 'Untitled'}
                </Title>
                <Button
                  Icon={ArrowRightIcon}
                  href={`/` + language + `/` + course.slug[language].current}
                >
                  {courseStart}
                  <span className="absolute inset-0 opacity-0" />
                </Button>
              </>
            ) : (
              <Title subtitle={createCourseSummary(course.lessons, course.presenters, labels)}>
                {course.title ? course.title[language] : 'Untitled'}
              </Title>
            )}
          </article>
        ))}
    </div>
  )
}
