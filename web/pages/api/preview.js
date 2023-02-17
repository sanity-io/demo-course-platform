export default async function preview(req, res) {
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
