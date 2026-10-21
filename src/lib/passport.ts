// Passport edition. Roles, titles and dates follow the Master Resume 2026 —
// the authoritative source. Work samples, case studies and films are reused
// from content.ts so the two editions never drift apart.

/**
 * A stamp as Stamp Studio cuts it (src/lib/stamps, ported verbatim from Petworking): the die picks
 * the layout family, the country picks the animal, the ink is one of the board's eight. Studio's
 * limits apply: business name up to 28 characters, claim up to 14, locality is neighbourhood and
 * city, and a die that prints a date gets the visit's ISO day.
 * `rot` is only how it lands on the page.
 */
export type StampSpec = {
  die: 'circle' | 'oval' | 'octagon' | 'rounded' | 'star' | 'hexagon' | 'shield' | 'ticket'
  country: 'CA' | 'US'
  ink: string
  business: string
  claim: string
  claimLines?: string[]
  location?: string
  date?: string
  year: string
  rot: number
}

/** Stamp Studio's eight board inks (stamp-studio.ts STAMP_INKS). One colour, never a gradient. */
export const INK = {
  terracotta: '#d3713c', bark: '#33251d', moss: '#4c6330', clay: '#7b5a48',
  oxblood: '#7b3f3f', navy: '#2c4a6e', plum: '#6b4c8a', ochre: '#8f6b3f',
} as const

export type Visa = {
  id: string
  no: string
  org: string
  orgLine: string
  title: string
  from: string
  until: string
  place: string
  category: string
  remarks: string[]
  stamp: StampSpec
}

export const IDENTITY = {
  given: 'Raymond',
  surname: 'Chizanga',
  line: 'Integrated Marketing · Mississauga ON',
  code: 'RC · 2026',
  fields: [
    { k: 'Profession / Profession', v: 'Integrated Marketing, Brand & Community' },
    { k: 'Base / Résidence', v: 'Mississauga, ON, Canada' },
    { k: 'Experience', v: '7+ years' },
    { k: 'Current post', v: 'Durham FCC · Oct 2026' },
    { k: 'Training', v: 'Metalworks Institute · 2019' },
    { k: 'GPA', v: '4.0' },
  ],
  words:
    'Integrated marketing, brand and community professional with 7+ years across SaaS, ecommerce and consumer-facing environments. Grew Hostfully’s owned social audience 235%, impressions 120% and organic review traffic 200%.',
}

export const VISAS: Visa[] = [
  {
    id: 'dfcc', no: '01', org: 'Durham FCC', orgLine: 'Durham Family & Cultural Centre · charity',
    title: 'Senior Marketing Consultant',
    from: 'Oct 2026', until: 'Present', place: 'Ajax, ON', category: 'Contract · DOGHAIR Technologies',
    remarks: [
      'Engaged through DOGHAIR Technologies as Senior Marketing Consultant to Durham Family & Cultural Centre, a charity in Ajax serving Black and racialized families in Durham Region.',
      'Wrote the website assessment: crawled every live page (32 pages, 198 sitemap URLs), checked all 384 links and 211 images, and read the analytics — 79% bounce, ~76% of visitors on phones, ~63% arriving from Instagram and Facebook.',
      'Restructured the Squarespace site: unified the two event calendars, merged About Us, Board and Contact, and built All Services, Parents Hub, Sponsorships and Work With Us pages with URL redirects.',
      'Set the redesign direction, replaced AI-generated imagery with real DFCC photography, and took all 16 linked pages through a WCAG contrast check on desktop and mobile.',
    ],
    stamp: { die: 'octagon', country: 'CA', ink: INK.terracotta, business: 'Durham FCC', claim: 'Consultant', date: '2026-10-11', year: '2026', rot: -6 },
  },
  {
    id: 'edsby', no: '02', org: 'Edsby', orgLine: 'K-12 education technology',
    title: 'Social Media & Content Marketing Consultant',
    from: 'Sep 8, 2026', until: 'Sep 15, 2026', place: 'Hybrid', category: 'Contract · Consultant',
    remarks: [
      'Led social media, content marketing, SEO, AI-search optimization and digital growth for a K-12 education technology company serving districts, educators, students and families.',
      'Owned multi-channel social and editorial strategy across LinkedIn, Instagram, Facebook, X, Bluesky, YouTube, Reddit, Quora and Medium, producing and repurposing written, visual and video content.',
      'Developed foundational SEO and answer-engine visibility through keyword and topic strategy, on-page and technical SEO, internal linking, content architecture, FAQs, schema and indexing.',
      'Monitored social, content, website and search performance while researching customer pain points, competitor positioning, K-12 trends and emerging conversations.',
    ],
    stamp: { die: 'circle', country: 'CA', ink: INK.navy, business: 'Edsby', claim: 'Content', location: 'Mississauga', year: '2026', rot: 5 },
  },
  {
    id: 'hostfully', no: '03', org: 'Hostfully', orgLine: 'Short-term-rental SaaS',
    title: 'Community & Integrated Marketing Manager',
    from: 'Dec 2023', until: 'May 2026', place: 'Remote · Canada & US', category: 'Work · Manager',
    remarks: [
      'Owned brand presence across LinkedIn, Meta, YouTube, X, Bluesky, TikTok and email, increasing followers 235% and impressions 120%.',
      'Built email and lifecycle campaigns using audience segmentation, messaging and performance analysis on a Salesforce-based marketing stack.',
      'Led review-platform strategy, increasing organic G2 and Trustpilot review traffic 200%, while managing partner marketing, customer stories, digital programming and events across Canada and the United States.',
      'Produced end-to-end creative across copy, graphic design, video and event production, using analytics and A/B testing to improve performance.',
    ],
    stamp: { die: 'star', country: 'US', ink: INK.plum, business: 'Hostfully', claim: 'Marketing', location: 'Mississauga', year: '2023', rot: -3 },
  },
  {
    id: 'hostaway', no: '04', org: 'Hostaway', orgLine: 'Vacation-rental software',
    title: 'Senior Support Advisor & Technical Content Writer',
    from: 'Oct 2022', until: 'Jan 2024', place: 'Toronto, ON', category: 'Work · Senior',
    remarks: [
      'Managed concurrent merchant support workloads while troubleshooting platform issues and translating customer patterns into feedback for product, content and retention initiatives.',
      'Led software onboarding and staff training while producing technical and marketing content for internal teams and prospective customers.',
    ],
    stamp: { die: 'hexagon', country: 'CA', ink: INK.clay, business: 'Hostaway', claim: 'Support', location: 'Toronto', year: '2022', rot: 4 },
  },
  {
    id: 'shopify', no: '05', org: 'Shopify', orgLine: 'Commerce platform',
    title: 'Support Advisor & Internal Copywriter',
    from: 'Oct 2021', until: 'Jul 2022', place: 'Remote', category: 'Work · Advisor',
    remarks: [
      'Supported ecommerce brands ranging from sole proprietors to enterprise merchants across live service channels.',
      'Wrote technical copy for internal software and app integrations, onboarding documentation, staff training and product-launch communications.',
    ],
    stamp: { die: 'rounded', country: 'CA', ink: INK.moss, business: 'Shopify', claim: 'Copywriter', location: 'Mississauga', year: '2021', rot: -5 },
  },
  {
    id: 'c54', no: '06', org: 'Community 54', orgLine: 'New York / Toronto streetwear & cultural concept',
    title: 'Store Manager, Brand & Community Operations',
    from: 'Aug 2017', until: 'Apr 2019', place: 'Toronto, ON', category: 'Work · Manager',
    remarks: [
      'Progressed to independently managing the Toronto storefront, overseeing daily operations, sales, Shopify ecommerce, opening/closing, customer experience and visual merchandising.',
      'Worked directly under co-founder Daymon Green, gaining hands-on experience in streetwear curation, brand development, retail buying, merchandising and community-led marketing.',
      'Produced and operated Finale Fridays, Community 54’s recurring platform for emerging designers, coordinating promotion, in-store execution and brand/customer engagement.',
      'Identified and onboarded new brands while managing stock ordering and vendor relationships across independent labels and major brands including Nike, adidas and Supreme.',
    ],
    stamp: { die: 'shield', country: 'US', ink: INK.oxblood, business: 'Community 54', claim: 'Manager', location: 'Parkdale, Toronto', year: '2017', rot: 2 },
  },
]

export const EARLIER: { id: string; org: string; role: string; date: string; stamp: StampSpec }[] = [
  { id: 'acce', org: 'ACCE International', role: 'Consumer Sensory Panelist', date: '2024 — Present',
    stamp: { die: 'circle', country: 'CA', ink: INK.ochre, business: 'ACCE International', claim: 'Panelist', location: 'Mississauga', year: '2024', rot: -6 } },
  { id: 'rens', org: 'Rens Pet Depot', role: 'Warehouse Supervisor', date: 'Aug 2019 — Dec 2020',
    stamp: { die: 'shield', country: 'CA', ink: INK.bark, business: 'Rens Pet Depot', claim: 'Warehouse', location: 'Oakville', year: '2019', rot: 5 } },
  { id: 'paradiso', org: 'Paradiso Restaurant', role: 'Prep Supervisor & Line Cook', date: '2012 — 2019',
    stamp: { die: 'ticket', country: 'CA', ink: INK.terracotta, business: 'Paradiso', claim: 'Line Cook', location: 'Oakville', year: '2012', rot: -3 } },
  { id: 'getfresh', org: 'Get Fresh Company', role: 'Brand Ambassador', date: '2018',
    stamp: { die: 'circle', country: 'CA', ink: INK.clay, business: 'Get Fresh Company', claim: 'Ambassador', location: 'Toronto', year: '2018', rot: 4 } },
  { id: 'pine', org: 'Pine Project Summer Camp', role: 'Camp Counsellor / Programmer', date: 'Jun — Aug 2017',
    stamp: { die: 'hexagon', country: 'CA', ink: INK.moss, business: 'Pine Project', claim: 'Counsellor', location: 'Toronto', year: '2017', rot: -5 } },
  { id: 'ymca', org: 'Peter Gilgan YMCA of Oakville', role: 'Summer Camp Counsellor', date: 'May — Aug 2013',
    stamp: { die: 'rounded', country: 'CA', ink: INK.navy, business: 'YMCA of Oakville', claim: 'Camp', location: 'Oakville', year: '2013', rot: 2 } },
]

export const EDUCATION_LINE = {
  program: 'Music Management & Studio Post-Production',
  school: 'Metalworks Institute, Mississauga, ON',
  year: '2019',
  gpa: '4.0',
  credentials: 'Performance accreditations: Canadian Music Week, Toronto (2017) · E.L.E Festival, Ottawa (2017)',
}

export const PROJECT_LINE = {
  name: 'Highly Animated',
  kind: 'Boutique media & brand management',
  text: 'Developed independent artist brands through content creation, curation and brand management across creative and digital channels.',
}

export const SKILL_GROUPS = [
  { k: 'Marketing & Community', v: 'Content strategy, copywriting, editorial calendars, email and lifecycle marketing, organic social, community engagement, partner marketing, events, review and reputation management.' },
  { k: 'SEO, Research & Analytics', v: 'SEO, AIO/AI-search optimization, keyword and topic strategy, on-page and technical SEO, A/B testing, campaign analytics, sensory evaluation, consumer research and competitive research.' },
  { k: 'Operations & CX', v: 'Ecommerce, merchant support, retail buying, inventory, stock ordering, vendor relationships, visual merchandising, staff supervision, training, event operations and hospitality.' },
  { k: 'Platforms & Creative', v: 'Salesforce, Zoho, HubSpot, Shopify, Adobe Creative Cloud, Figma, Canva, Premiere Pro, Final Cut Pro, DaVinci Resolve, Pro Tools, HTML/CSS familiarity, ChatGPT, Gemini, Perplexity and Claude.' },
]

// Extra Hostfully work from the portfolio folder (not on the classic site).
export const EXTRA_SHOTS = [
  { src: '/img/passport/ebook-upsells.png', caption: 'eBook promo · Upsells' },
  { src: '/img/passport/ebook-tech-stack.png', caption: 'eBook promo · STR tech stack' },
  { src: '/img/passport/hostimonial-17.png', caption: 'Hostimonials' },
  { src: '/img/passport/hostimonial-18.png', caption: 'Hostimonials' },
]

// Durham FCC website refresh, before and after (from the DOGHAIR before/after board).
export const DFCC_BEFORE_AFTER = [
  { src: '/img/passport/dfcc-home.jpg', caption: 'Home' },
  { src: '/img/passport/dfcc-about.jpg', caption: 'About Us' },
  { src: '/img/passport/dfcc-pamoja.jpg', caption: 'Pamoja Family Outreach' },
  { src: '/img/passport/dfcc-sponsorships.jpg', caption: 'Sponsorships' },
  { src: '/img/passport/dfcc-work-with-us.jpg', caption: 'Work With Us' },
  { src: '/img/passport/dfcc-events.jpg', caption: 'Events' },
]

// Hostfully customer story series, filmed with Junction House Getaways (Toronto).
export const JUNCTION_HOUSE = {
  people: 'Brianne and Doug Hamilton',
  business: 'Junction House Getaways · Toronto, Canada',
  clips: [
    { slug: 'why-hostfully', title: 'Why they chose Hostfully' },
    { slug: 'why-hospitality', title: 'Why hospitality' },
    { slug: 'past-work', title: 'Past work' },
    { slug: 'favourite-part-job', title: 'Favourite part of the job' },
    { slug: 'favourite-part-software', title: 'Favourite part of the software' },
    { slug: 'future-plans', title: 'Future plans' },
    { slug: 'fun-fact', title: 'Fun fact' },
  ],
}

export const LINKEDIN = 'https://www.linkedin.com/in/raymond-chizanga-443175149/'

/** Machine-readable zone line: uppercase, `<` filler, fixed 44 characters. */
export function mrz(s: string, len = 44) {
  const clean = s.toUpperCase().replace(/[^A-Z0-9<]/g, '<')
  return (clean + '<'.repeat(len)).slice(0, len)
}

/** Every stamp the site presses, by the id its SVG is served at (/stamps/<id>). */
export const STAMPS: Record<string, StampSpec> = Object.fromEntries([
  ...VISAS.map((v) => [v.id, v.stamp] as const),
  ...EARLIER.map((e) => [e.id, e.stamp] as const),
])
