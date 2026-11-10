import type { MetadataRoute } from "next";

const siteUrl = "https://getkisu.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
