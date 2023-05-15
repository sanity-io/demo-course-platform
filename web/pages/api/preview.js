import { groq } from "next-sanity";
import { i18n } from "../../../languages";
import { previewClient } from "../../lib/sanity.client";

export default async function preview(req, res) {
  const { id } = req?.query ?? {};

  if (!id) {
    return res.status(401).json({ message: "No document id provided" });
  }

  // Ensure this slug actually exists in the dataset
  const query = groq`*[_id in [$id, $draftId]]|order(_updatedAt desc)[0]`;
  const doc = await previewClient.fetch(query, { id, draftId: `drafts.${id}` });
 
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
      
      const courseSlug = `come-back-and-make-this-actually-required`

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

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  return res.writeHead(307, { Location: slug }).end();
}
