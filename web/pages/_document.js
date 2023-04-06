import React from 'react'
import Document, {Html, Main, Head, NextScript} from 'next/document'

import {extractLanguageFromCode} from '../lib/helpers'
import {i18n} from '../../languages'
import { WEBSITE_URL_DEV, WEBSITE_URL_PROD } from "./api/preview";

export default class MyDocument extends Document {
  render() {
    const canonical = new URL(
      `/`,
      process.env.VERCEL ? WEBSITE_URL_PROD : WEBSITE_URL_DEV
    );

    return (
      <Html lang={extractLanguageFromCode(this.props.lang || i18n.base)}>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/ogy2uky.css" />
          <link rel="canonical" href={canonical.toString()} />
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
