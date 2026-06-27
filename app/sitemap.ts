import type { MetadataRoute } from "next";
import { getAllListingIds } from "./lib/flora-api";

const SITE_URL = "https://jazasakeenah.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const listingIds = await getAllListingIds();

  const propertyRoutes = listingIds.map((id) => ({
    url: `${SITE_URL}/properties/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/properties`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/refund-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/resale-and-transfer-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...propertyRoutes,
    {
      url: `${SITE_URL}/#how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#why-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
