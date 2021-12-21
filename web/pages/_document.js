import React from 'react'
import Document, {Html, Main, Head, NextScript} from 'next/document'

import {extractLanguageFromCode} from '../lib/helpers'
import {i18n} from '../../languages'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={extractLanguageFromCode(this.props.lang || i18n.base)}>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/ogy2uky.css" />
          <meta charSet="utf-8" />
        </Head>
        <body className="font-sans bg-white text-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
