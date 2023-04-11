import { groq } from "next-sanity";
import { i18n } from "../../../languages";
import { previewClient } from "../../lib/sanity.client";
import { NextApiRequest, NextApiResponse } from "next";

export const STUDIO_URL_DEV = "http://localhost:3333";
export const STUDIO_URL_PROD = process.env.VERCEL
  ? process.env.VERCEL_URL
  // Default fallback
  : "https://demo-course-platform.sanity.studio";

export const WEBSITE_URL_DEV = "http://localhost:3000";
// export const WEBSITE_URL_PROD = "https://demo-course-platform.sanity.build";
export const WEBSITE_URL_PROD = "https://demo-course-platform-git-seo-pane.sanity.build";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const host = req.headers.host;

  // Is the SEO plugin trying to fetch and return HTML?
  // AND is the Studio on a different URL to the website?
  if (req.query.fetch) {
    // Allow requests from the Studio's URL
    const corsOrigin = host.includes("localhost")
      ? // Possibly required for Node 18 which doesn't like "localhost"
        // STUDIO_URL_DEV.replace("//localhost:", "//127.0.0.1:")
        // Otherwise fine on Node 16
        STUDIO_URL_DEV
      : STUDIO_URL_PROD;
    res.setHeader("Access-Control-Allow-Origin", corsOrigin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  const { id } = req?.query ?? {};

  if (!id) {
    return res.status(401).json({ message: "No document id provided" });
  }

  // Ensure this slug actually exists in the dataset
  const query = groq`*[_id == $id][0]`;
  const doc = await previewClient.fetch(query, { id });

  if (!doc) {
    return res.status(401).json({ message: "Invalid document id" });
  }

  // Create the full slug from the id
  const { _type, language } = doc;

  let slug;

  // Build full URL based on returned document
  switch (_type) {
    case "legal":
      slug = doc.slug?.current ? `/legal/${doc.slug?.current}` : ``;
      break;
    case "presenter":
      slug = doc.slug?.current ? `/presenter/${doc.slug?.current}` : ``;
      break;
    case "lesson":
      const courseQuery =
        language === i18n.base
          ? groq`*[_type == "course" && $id in lessons[]._ref][0].slug.current`
          : groq`*[_type == "translation.metadata" && $id in lessons._ref][0].slug.current`;

      const courseSlug = `come-back-and-make-this-actually-required`;

      slug =
        language === i18n.base
          ? `/${courseSlug}/${doc.slug.current}`
          : `/${language}/${courseSlug}/${doc.slug.current}`;
      break;
    case "course":
      slug = doc?.slug?.[i18n.base]?.current
        ? `/${doc?.slug?.[i18n.base]?.current}`
        : ``;
      break;

    default:
      break;
  }

  // Initialise preview mode
  res.setPreviewData({});

  // Return just the HTML if the SEO plugin is requesting it
  if (req.query.fetch) {
    // Create preview URL
    const baseOrigin = host.includes("localhost")
      ? WEBSITE_URL_DEV
      : WEBSITE_URL_PROD;
    const absoluteUrl = new URL(slug, baseOrigin).toString();

    // Create preview headers from the setPreviewData above
    const previewHeader = res.getHeader("Set-Cookie");
    const previewHeaderString =
      typeof previewHeader === "string" || typeof previewHeader === "number"
        ? previewHeader.toString()
        : previewHeader?.join("; ");
    const headers = new Headers();
    headers.append("credentials", "include");
    headers.append("Cookie", previewHeaderString ?? "");

    const previewHtml = await fetch(absoluteUrl, { headers })
      .then((previewRes) => previewRes.text())
      .catch((err) => console.error(err));
    console.log(previewHtml);
    return res.send(previewHtml);
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  return res.writeHead(307, { Location: slug }).end();
}
