import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/profile", "/bucketlist"],
    },
    sitemap: "https://traveltree.co/sitemap.xml",
  };
}
