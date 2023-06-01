import {getCliClient} from 'sanity/cli'

const client = getCliClient()

export async function run() {
  const docs = await client.fetch('*[_type == "lesson"]._id')
  console.log(docs)
}

run()
