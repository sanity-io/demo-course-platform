import { previewClient } from "../../lib/sanity.client"

export default async function preview(req, res) {
  // Initialise preview mode
  res.setPreviewData({})

  const pathname = req?.query?.slug ?? `/`

  if (!pathname) {
    return res.status(401).json({message: 'No slug in query'})
  }

  // Ensure this slug actually exists in the dataset
  const pathEnd = pathname.split(`/`).pop()
  const actualSlug = await previewClient.fetch(`*[slug.current == $slug][0].slug.current`, {slug: pathEnd})

  if (!actualSlug) {
    return res.status(401).json({message: 'Invalid slug'})
  }

  // Combine the query's full slug with what we found from the dataset
  // because we don't want to redirect straight to what was queried
  const redirectPath = [...pathname.split(`/`).slice(0, -1), actualSlug].join(`/`)

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  return res.writeHead(307, {Location: redirectPath}).end()
}
