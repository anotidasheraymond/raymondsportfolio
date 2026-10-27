import type { MetadataRoute } from 'next'
import { WORKS, STUDIES } from '@/lib/content'
import { JUNCTION_HOUSE, EXTRA_SHOTS } from '@/lib/passport'
import { DFCC_BEFORE_AFTER } from '@/lib/dfcc'

const SITE = 'https://raymondchizanga.work'
const abs = (p: string) => `${SITE}${p}`

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const images = [
    '/img/passport/raymond-jeep.webp',
    ...DFCC_BEFORE_AFTER.map((s) => s.src),
    ...(WORKS.find((w) => w.id === 'hostfully')?.shots ?? []).map((s) => s.src),
    ...EXTRA_SHOTS.map((s) => s.src),
    ...WORKS.filter((w) => w.id !== 'hostfully').flatMap((w) => (w.shots ?? []).map((s) => s.src)),
    ...STUDIES.flatMap((s) => s.images.map((i) => i.src)),
    '/img/passport/c54-finale-friday.jpg',
    '/img/ventures/doghair-diamond.webp',
  ]
  const videos = JUNCTION_HOUSE.clips.map((c) => ({
    title: `Junction House Getaways · ${c.title}`,
    thumbnail_loc: abs(`/video/jh-${c.slug}.jpg`),
    content_loc: abs(`/video/jh-${c.slug}.mp4`),
    description: `${JUNCTION_HOUSE.people}, ${JUNCTION_HOUSE.business}: “${c.title}”, part of a Hostfully customer story series filmed and edited by Raymond Chizanga.`,
  }))
  return [
    { url: SITE, lastModified, changeFrequency: 'monthly', priority: 1, images: [...new Set(images)].map(abs), videos },
    { url: abs('/llms.txt'), lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ]
}
