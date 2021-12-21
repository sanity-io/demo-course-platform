/* eslint-disable camelcase */
import sanityClient from 'part:@sanity/base/client'

const apiVersion = `2021-06-24`
const client = sanityClient.withConfig({apiVersion})

async function run() {
  const id = '8ce48f9f-a294-4793-95db-17e8d9737c3d'
  // const id = '32cb7277-1cfb-4ab1-ae1e-ab844dc8ab72'

  client
    .patch(id)
    .set({__i18n_refs: []})
    .commit()
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}

run()
