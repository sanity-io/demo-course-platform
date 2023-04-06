import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { WEBSITE_URL_DEV, WEBSITE_URL_PROD } from "../pages/api/preview";

export default function Meta({ translations = [] }) {
  const router = useRouter();
  const { locale, asPath } = router;

  const siteName = `Course Platform`;
  const title = translations.length
    ? translations.find(({ language }) => language === locale)?.title
    : null;
  const canonical = new URL(
    asPath,
    process.env.VERCEL ? WEBSITE_URL_PROD : WEBSITE_URL_DEV
  );

  // Override the canonical URL link set in _document.js
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const link = document.querySelector(`link[rel="canonical"]`);
      
      if (link) {
        link.setAttribute("href", canonical.toString());
      }
    }
  }, [canonical]);

  return (
    <Head>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
    </Head>
  );
}
