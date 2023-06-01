import {Metadata} from 'next'
import {getCourse} from '../../_data/loaders'
import {CourseLayout} from '../../_components/CourseLayout'

export const metadata: Metadata = {
  title: 'My Page Title',
}

export default async function Page({params}) {
  const data = await getCourse({slug: params.course})

  return <CourseLayout data={data} />
}
