import {HomeLayout} from '../_components/HomeLayout'
import {getHome, getLabels} from '../_data/loaders'

export default async function Page({params}) {
  const {language} = params
  const home = await getHome({language})
  const labels = await getLabels({language})

  return <HomeLayout {...home} labels={labels} />
}
