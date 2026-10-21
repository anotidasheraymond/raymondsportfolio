import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Antonio, Newsreader, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { HERO_LEDE, CONTACT, SOCIAL } from '@/lib/content'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const display = Bebas_Neue({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-display' })
const cond = Antonio({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap', variable: '--font-cond' })
const body = Newsreader({ subsets: ['latin'], display: 'swap', variable: '--font-body' })
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' })

const siteUrl = 'https://raymondchizanga.work'

const TITLE = 'Raymond Chizanga — Integrated Marketing, Brand & Community'
const PHOTO = `${siteUrl}/img/passport/raymond-jeep.webp`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: TITLE, template: '%s · Raymond Chizanga' },
  description: HERO_LEDE,
  applicationName: 'Raymond Chizanga',
  authors: [{ name: 'Raymond Chizanga', url: siteUrl }],
  creator: 'Raymond Chizanga',
  keywords: [
    'Raymond Chizanga', 'integrated marketing', 'community marketing', 'brand marketing', 'content marketing',
    'SEO', 'answer engine optimization', 'lifecycle marketing', 'SaaS marketing', 'marketing consultant Toronto',
    'Mississauga', 'DOGHAIR Technologies', 'Hostfully',
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    title: TITLE,
    description: HERO_LEDE,
    url: siteUrl,
    siteName: 'Raymond Chizanga',
    type: 'profile',
    locale: 'en_CA',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: HERO_LEDE },
}

// One linked graph: the site, the profile page, and the person it is about. Facts mirror the
// passport's visible content (src/lib/passport.ts), so nothing here claims more than the page does.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Raymond Chizanga',
      inLanguage: 'en-CA',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: siteUrl,
      name: TITLE,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${siteUrl}/#person` },
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Raymond Chizanga',
      url: siteUrl,
      image: PHOTO,
      jobTitle: 'Senior Marketing Consultant',
      description: HERO_LEDE,
      email: CONTACT.emails.map((e) => `mailto:${e}`),
      telephone: '+1-437-441-9955',
      address: { '@type': 'PostalAddress', addressLocality: 'Mississauga', addressRegion: 'ON', addressCountry: 'CA' },
      worksFor: { '@id': `${siteUrl}/#doghair` },
      founder: [{ '@id': `${siteUrl}/#doghair` }, { '@id': `${siteUrl}/#petworking` }, { '@id': `${siteUrl}/#hoard` }, { '@id': `${siteUrl}/#duck` }],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Integrated Marketing, Brand & Community',
        occupationLocation: { '@type': 'City', name: 'Toronto' },
        skills: 'Social and content strategy, SEO and AI-search optimization, lifecycle and email marketing, community and partner marketing, review and reputation management, video and event production',
      },
      knowsAbout: [
        'Integrated marketing', 'Community marketing', 'Content strategy', 'Search engine optimization',
        'Answer engine optimization', 'Email and lifecycle marketing', 'Partner marketing', 'Review and reputation management',
        'Customer advocacy', 'Video production', 'Event production', 'Salesforce', 'HubSpot', 'Shopify', 'Figma',
      ],
      sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#doghair`,
      name: 'DOGHAIR Technologies',
      description: 'Triple-tiered boutique design, technology and research company in Mississauga, Ontario; makers of Petworking and The Hoard.',
      url: 'https://doghairtechnologies.com',
      email: 'mailto:raymond@doghairtechnologies.com',
      sameAs: [SOCIAL.doghairInstagram],
      founder: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#petworking`,
      name: 'Petworking',
      url: SOCIAL.petworking,
      sameAs: [SOCIAL.petworkingInstagram],
      founder: { '@id': `${siteUrl}/#person` },
      parentOrganization: { '@id': `${siteUrl}/#doghair` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#hoard`,
      name: 'The Hoard',
      url: 'https://thehoard.social',
      description: 'The world’s first and only all-encompassing fan network.',
      founder: { '@id': `${siteUrl}/#person` },
      parentOrganization: { '@id': `${siteUrl}/#doghair` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#duck`,
      name: 'D.U.C.K AI',
      description: 'Deterministic Uptake Computation Kicker: a first-party, on-device language model in development at DOGHAIR Technologies.',
      applicationCategory: 'DeveloperApplication',
      creator: { '@id': `${siteUrl}/#person` },
      publisher: { '@id': `${siteUrl}/#doghair` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${cond.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
