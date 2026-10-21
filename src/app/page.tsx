import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import PassportSite from '@/components/passport/PassportSite'

// Passport faces: Space Grotesk + IBM Plex Mono are the Petworking passport
// pair. The coin's Kenyan Coffee words are baked outlines (coin-lettering.ts),
// since its desktop licence does not cover serving the font.
const sans = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap', variable: '--pp-sans' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--pp-mono' })

export const dynamic = 'force-static'

export default function Page() {
  return (
    <div className={`${sans.variable} ${mono.variable}`}>
      <PassportSite />
    </div>
  )
}
