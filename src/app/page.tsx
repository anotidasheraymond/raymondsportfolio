import { Space_Grotesk, IBM_Plex_Mono, Saira_Condensed } from 'next/font/google'
import PassportSite from '@/components/passport/PassportSite'

// Passport faces: Space Grotesk + IBM Plex Mono are the Petworking passport
// pair. Saira Condensed stands in for Kenyan Coffee on the coin, whose
// desktop licence does not cover web embedding.
const sans = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap', variable: '--pp-sans' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--pp-mono' })
const coin = Saira_Condensed({ subsets: ['latin'], weight: ['700'], display: 'swap', variable: '--pp-coin' })

export const dynamic = 'force-static'

export default function Page() {
  return (
    <div className={`${sans.variable} ${mono.variable} ${coin.variable}`}>
      <PassportSite />
    </div>
  )
}
