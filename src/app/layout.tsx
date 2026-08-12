import type { Metadata } from 'next'
import { Bebas_Neue, Antonio, Newsreader, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { HERO_LEDE, CONTACT } from '@/lib/content'
import './globals.css'

const display = Bebas_Neue({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-display' })
const cond = Antonio({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap', variable: '--font-cond' })
const body = Newsreader({ subsets: ['latin'], display: 'swap', variable: '--font-body' })
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' })

const siteUrl = 'https://raymondsportfolio-two.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Raymond Chizanga — Integrated Marketing',
  description: HERO_LEDE,
  openGraph: {
    title: 'Raymond Chizanga — Integrated Marketing',
    description: HERO_LEDE,
    url: siteUrl,
    siteName: 'Raymond Chizanga',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raymond Chizanga — Integrated Marketing',
    description: HERO_LEDE,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Raymond Chizanga',
  jobTitle: 'Integrated Marketing Manager',
  email: `mailto:${CONTACT.email}`,
  telephone: '+1-437-441-9955',
  url: siteUrl,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mississauga',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  sameAs: ['https://www.linkedin.com/in/raymond-chizanga-443175149/'],
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
