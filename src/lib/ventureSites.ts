// The live web platforms, captured from production on 2026-11-17 at 1440 × 900 (2×).
// Real pages only: no mockups, store composites or device frames.

export type SiteSlide = { src: string; thumb: string; caption: string; path: string }

export const SITE_SLIDE_ASPECT = '1440 / 900'

const slides = (dir: string, rows: [string, string, string][]): SiteSlide[] =>
  rows.map(([file, caption, path]) => ({
    src: `/img/${dir}/${file}.webp`,
    thumb: `/img/${dir}/${file}-thumb.webp`,
    caption,
    path,
  }))

export const HOARD_SITE = slides('hoard-site', [
  ['01-home', 'Home', '/'],
  ['02-for-fans', 'For Fans', '/for-fans'],
  ['03-coins', 'Coins', '/coins'],
  ['04-vault', 'Vault', '/vault'],
  ['05-rooms', 'Rooms', '/rooms'],
  ['06-scan', 'Gideon Scan', '/scan'],
  ['07-gideon', 'Gideon', '/gideon'],
  ['08-nyami-nyami', 'Nyami Nyami', '/nyami-nyami'],
  ['09-trackers', 'Collection trackers', '/trackers'],
  ['10-legacy', 'Legacy', '/legacy'],
  ['11-events', 'Events', '/events'],
  ['12-founders', 'Founding Summer', '/founders'],
])

export const PW_SITE = slides('pw-site', [
  ['01-home', 'Home', '/'],
  ['02-digital-pet-passport', 'Digital Pet Passport', '/digital-pet-passport'],
  ['03-digital-pet-passport-stamps', 'Passport stamps', '/digital-pet-passport/stamps'],
  ['04-for-pet-parents', 'For pet parents', '/for-pet-parents'],
  ['05-for-pet-professionals', 'For pet professionals', '/for-pet-professionals'],
  ['06-for-rescues', 'For rescues', '/for-rescues'],
  ['07-businesses', 'Marketplace', '/businesses'],
  ['08-pricing', 'Pricing', '/pricing'],
  ['09-pet-care-network', 'The Petwork', '/pet-care-network'],
  ['10-download', 'Download', '/download'],
  ['11-compare', 'Compare', '/compare'],
  ['12-security', 'Security', '/security'],
])
