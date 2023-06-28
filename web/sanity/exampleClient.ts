// Do not use @sanity/client
import {createClient} from '@sanity/preview-kit/client'

const config = {
  projectId: 'your-project-id',
  dataset: 'your-dataset-name',
  useCdn: true,
  apiVersion: '2023-05-03',
  // Include these two options
  studioUrl: 'https://your-project-name.sanity.studio',
  encodeSourceMap: true,
}

export const client = createClient(config)
