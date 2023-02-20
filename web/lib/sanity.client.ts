import { createClient } from "next-sanity";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6h1mv88x";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production-v3";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-01-01";

export const config = {
  projectId,
  dataset,
  apiVersion,
};

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
