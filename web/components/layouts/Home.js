import {useRouter} from 'next/router'
import {ArrowRightIcon} from '@heroicons/react/outline'

import Link from 'next/link'
import Button from '../Button'
import Title from '../Title'
import {createCourseSummary} from '../../lib/helpers'
import Layout from './Layout'

export default function Home({data}) {
  const {locale} = useRouter()

  return (
    <Layout>
      <div className="container mx-auto pt-header grid grid-cols-1 gap-header mt-header">
        {data?.length > 0 &&
          data.map((course) => (
            <article
              key={course._id}
              className="relative bg-gradient-to-tr mix-blend-multiply from-cyan-100 via-pink-100 to-yellow-100 p-8 md:p-16 xl:p-24 rounded-xl md:rounded-2xl xl:rounded-3xl w-full flex items-center justify-between group hover:scale-[1.01] hover:rotate-[-0.25deg] transition-transform duration-200"
            >
              <Link href={course.slug[locale].current}>
                <a className="block absolute inset-0 z-10 ">
                  <span className="sr-only">{course.title[locale]}</span>
                </a>
              </Link>
              <Title subtitle={createCourseSummary(course.lessons, course.presenters)}>
                {course.title[locale]}
              </Title>
              <Button Icon={ArrowRightIcon} href={course.slug[locale].current}>
                Get Started
              </Button>
            </article>
          ))}
      </div>
    </Layout>
  )
}
