import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `https://traveltree.co`,
      lastModified: new Date(),
    },
    {
      url: `https://traveltree.co/signin`,
      lastModified: new Date(),
    },
    {
      url: `https://traveltree.co/explore`,
      lastModified: new Date(),
    },
    {
      url: `https://traveltree.co/immanu10`,
      lastModified: new Date(),
    },
    {
      url: `https://traveltree.co/privacy`,
      lastModified: new Date(),
    },
  ];
}
