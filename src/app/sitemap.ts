import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: 'https://raymondchizanga.work', lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: 'https://raymondchizanga.work/classic', lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://raymondchizanga.work/llms.txt', lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ]
}
