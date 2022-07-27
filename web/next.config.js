const {i18n} = require('../languages.json')

module.exports = {
  images: {
    domains: [`cdn.sanity.io`],
  },
  i18n: {
    locales: i18n.languages.map((item) => item.id),
    defaultLocale: i18n.base,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
