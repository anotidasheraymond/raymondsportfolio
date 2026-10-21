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
    { k: 'Studied', v: 'Metalworks Institute · 2019' },
    { k: 'Coursework GPA', v: '4.0' },
  ],
  words:
    'Integrated marketing, brand and community professional with 7+ years across SaaS, ecommerce and consumer-facing environments. Grew Hostfully’s owned social audience 235%, impressions 120% and organic review traffic 200%.',
}

export const VISAS: Visa[] = [
  {
    id: 'dfcc', no: '01', org: 'Durham FCC', orgLine: 'Durham Family & Cultural Centre · charity',
    title: 'Senior Marketing Consultant',
    from: 'Oct 2026', until: 'Present', place: 'Ajax, ON', category: 'Contract · DOGHAIR Technologies',
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
      'Joined as Technical Support (TS1) in October 2022 and grew into senior support and technical content writing.',
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
      'Joined as a Junior Support Advisor in October 2021, then took on internal copywriting.',
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

/**
 * Ventures Raymond founded. Every line is from the ventures' own repos and sites on his machine
 * (DOGHAIR Technologies site, PETWORKING, HOARD, CHICKEN/duck): commit history, app.json, READMEs,
 * the canonical platform copy and the launch audit. Nothing here is rounded up.
 */
export type Venture = Visa & {
  links: { label: string; href: string }[]
  chips: { k: string; v: string }[]
}

export const VENTURES: Venture[] = [
  {
    id: 'doghair', no: 'F1', org: 'DOGHAIR Technologies', orgLine: 'Design, technology & research company',
    title: 'Co-founder · CEO & Culture Architect',
    from: '2026', until: 'Present', place: 'Mississauga, ON', category: 'Founder · DOGHAIR Technologies Inc.',
    remarks: [
      'Co-founded DOGHAIR Technologies Inc., “the world’s first triple-tiered boutique design, technology, and research” company, and lead it as CEO and Culture Architect.',
      'The umbrella company that owns the portfolio: makers of Petworking and The Hoard, with D.U.C.K AI, a first-party on-device language model, in development.',
      'Runs client work through the studio, including the Senior Marketing Consultant engagement with Durham Family & Cultural Centre.',
      'Shipped the company site at doghairtechnologies.com on Next.js and Vercel, with structured data naming both products.',
    ],
    links: [
      { label: 'doghairtechnologies.com', href: 'https://doghairtechnologies.com' },
      { label: '@doghairtechnologies', href: 'https://www.instagram.com/doghairtechnologies/' },
    ],
    chips: [
      { k: 'Slogan', v: 'Pushing the limits of magic and science' },
      { k: 'Founders', v: 'Raymond Chizanga · Yuriy Leheta' },
      { k: 'Products', v: 'Petworking · The Hoard · D.U.C.K AI' },
    ],
    stamp: { die: 'ticket', country: 'CA', ink: INK.bark, business: 'DOGHAIR Technologies', claim: 'Co-founder', location: 'Mississauga', year: '2026', rot: -4 },
  },
  {
    id: 'petworking', no: 'F2', org: 'Petworking', orgLine: 'All-in-one pet care network',
    title: 'Founder & CEO',
    from: 'Aug 2026', until: 'Present · beta', place: 'Canada', category: 'Founder · DOGHAIR Technologies',
    remarks: [
      'Founded Petworking, an all-in-one pet care network for pet parents, pet professionals, businesses and animal rescues, built around a portable digital Pet Passport.',
      'Pet records, bookings, marketplace discovery, business software, payments and professional networking: one Expo codebase for iPhone, iPad, Apple Watch and Android, plus a Next.js web platform on Supabase with Stripe.',
      'In beta in Canada, the United States, the United Kingdom, Australia and Japan through TestFlight and Google Play testing; listed on Capterra and GetApp, with the G2 profile claimed.',
      'Scale of the build: 1,310 commits since August 27, 2026, 533 database migrations, 169 web routes and 17 server functions covering checkout, payouts, subscriptions, refunds and shipping.',
    ],
    links: [
      { label: 'petworking.pet', href: 'https://petworking.pet' },
      { label: 'iPhone beta', href: 'https://testflight.apple.com/join/HeupXQMT' },
      { label: '@thepetworkingapp', href: 'https://www.instagram.com/thepetworkingapp/' },
    ],
    chips: [
      { k: 'Modules', v: 'Pet Passport · Pet Parent OS · Animal World OS · Rescue OS · Research OS · The Petwork · Marketplace' },
      { k: 'Plans', v: 'Free · Independent $29 · Growth $69 · Multi-site $229 /mo' },
      { k: 'Stack', v: 'Expo · React Native · Next.js · Supabase · Stripe' },
    ],
    stamp: { die: 'oval', country: 'CA', ink: INK.terracotta, business: 'Petworking', claim: 'Founder', location: 'Ontario', year: '2026', rot: 6 },
  },
  {
    id: 'hoard', no: 'F3', org: 'The Hoard', orgLine: 'Fan network for collectors',
    title: 'Founder · design & build',
    from: 'May 2026', until: 'Present', place: 'Mississauga, ON', category: 'Founder · DOGHAIR Technologies',
    remarks: [
      '“The world’s first and only all-encompassing fan network.” Built as a collector, solo, from concept and architecture through UX/UI, the marketplace and a hand-built pricing tool.',
      'Live on the web at thehoard.social and on the App Store, with Android in Play testing: iPhone, iPad and Android apps from one Expo codebase, web on Next.js with Stripe and Sentry.',
      'Proprietary systems Nyami Nyami Market Guard, Gideon (a self-hosted visual identification service) and Linda; Collector, Manager and Commissioner Pro subscriptions.',
      'Launch audit: zero critical or high findings, row-level security on 100% of tables, Sign in with Apple and in-app account deletion. 824 migrations, 26 server functions, 252 web routes.',
    ],
    links: [
      { label: 'thehoard.social', href: 'https://thehoard.social' },
      { label: 'App Store', href: 'https://apps.apple.com/us/app/the-hoard/id6771879680' },
    ],
    chips: [
      { k: 'Surfaces', v: 'Web · iPhone · iPad · Android' },
      { k: 'Stack', v: 'Next.js · Expo · Supabase · Stripe · Python inference' },
    ],
    stamp: { die: 'octagon', country: 'CA', ink: INK.oxblood, business: 'The Hoard', claim: 'Founder', date: '2026-05-16', year: '2026', rot: -5 },
  },
  {
    id: 'duck', no: 'F4', org: 'D.U.C.K AI', orgLine: 'Deterministic Uptake Computation Kicker · on-device LLM',
    title: 'Founder & engine developer',
    from: 'Jul 2026', until: 'In development', place: 'Mississauga, ON', category: 'In development · DOGHAIR Technologies',
    remarks: [
      'DOGHAIR’s first-party, on-device large language model, written from scratch: no BLAS, no ML framework, no external math.',
      'Engine in C++ with hand-written PTX GPU kernels and no CUDA toolkit; the target GPU benchmarked at 17.04 TFLOPS sustained FP32 and 226 GB/s memory bandwidth over a ten-minute soak.',
      'DH-M1 architecture frozen at ~308M parameters: 22 layers, grouped-query attention (16 query heads over 4 KV heads), RoPE and a block-sparse FFN, sized for a ~7B-token public-domain corpus.',
      'Built and tested: int8 KV cache, a rights admission gate with a hash-chained data manifest, deduplication, an RLVR harness and an Electron desktop app, with a mobile client in Expo.',
    ],
    links: [],
    chips: [
      { k: 'Engine', v: 'C++ · PTX kernels' },
      { k: 'Model', v: 'DH-M1 · ~308M params · 22 layers' },
      { k: 'Clients', v: 'Electron desktop · Expo mobile' },
    ],
    stamp: { die: 'circle', country: 'CA', ink: INK.moss, business: 'D.U.C.K AI', claim: 'In development', location: 'Mississauga', year: '2026', rot: 4 },
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
  program: 'Music Management & Studio Post-Production (coursework)',
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
  ...VENTURES.map((v) => [v.id, v.stamp] as const),
  ...EARLIER.map((e) => [e.id, e.stamp] as const),
])
