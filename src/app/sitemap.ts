import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://raymondsportfolio-two.vercel.app',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
