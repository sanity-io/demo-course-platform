export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({message: `Invalid Secret`})
  }

  // Initialise preview mode
  res.setPreviewData({})

  const pathname = req?.query?.slug ?? `/`

  if (!pathname) {
    return res.status(401).json({message: 'No slug in query'})
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  return res.writeHead(307, {Location: pathname}).end()
}
