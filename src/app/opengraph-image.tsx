import { ImageResponse } from 'next/og'
import { LETTERING } from '@/components/passport/coin-lettering'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Raymond Chizanga — portfolio passport'

// The passport cover as a share card, in the brand stack: the name in the Hoard coin's Kenyan
// Coffee (baked outlines, no font file), the passport's Space Grotesk and IBM Plex Mono around it.

async function googleFont(family: string, weight: number) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
    // An older user agent makes Google serve TTF, which the image renderer can read.
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1' },
  })).text()
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!url) throw new Error(`No TTF for ${family}`)
  return (await fetch(url)).arrayBuffer()
}

function Word({ word, height, color }: { word: keyof typeof LETTERING; height: number; color: string }) {
  const { viewBox: [x, y, w, h], d } = LETTERING[word]
  return (
    <svg width={(height * w) / h} height={height} viewBox={`${x} ${y} ${w} ${h}`}>
      <path d={d} fill={color} />
    </svg>
  )
}

export default async function OpengraphImage() {
  const [grotesk, plex] = await Promise.all([googleFont('Space+Grotesk', 500), googleFont('IBM+Plex+Mono', 500)])
  const foil = '#d6b27a'
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#f8f4eb', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1080, height: 520, display: 'flex', background: '#4a1d1d', borderRadius: 18, boxShadow: '0 30px 60px rgba(51,37,29,.35)', position: 'relative' }}>
          <div style={{ width: 54, height: '100%', background: '#3d1717', display: 'flex' }} />
          <div style={{ position: 'absolute', left: 84, right: 30, top: 30, bottom: 30, border: `2px solid ${foil}88`, borderRadius: 8, display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 0 96px', color: foil, flex: 1 }}>
            <div style={{ fontFamily: 'Plex', fontSize: 24, letterSpacing: 8, textTransform: 'uppercase', opacity: 0.85 }}>Passport · Portfolio</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30 }}>
              <Word word="RAYMOND" height={96} color={foil} />
              <Word word="CHIZANGA" height={96} color={foil} />
            </div>
            <div style={{ fontFamily: 'Grotesk', fontSize: 28, marginTop: 34, color: '#f3e6c4', whiteSpace: 'nowrap' }}>Integrated marketing · Brand &amp; community</div>
            <div style={{ fontFamily: 'Plex', fontSize: 20, marginTop: 12, letterSpacing: 4, opacity: 0.8 }}>RAYMONDCHIZANGA.WORK</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 300, marginRight: 60 }}>
            <div style={{ width: 230, height: 230, borderRadius: 999, border: `3px solid ${foil}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 196, height: 196, borderRadius: 999, border: `1.5px solid ${foil}aa`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Word word="RC" height={84} color={foil} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Grotesk', data: grotesk, weight: 500 }, { name: 'Plex', data: plex, weight: 500 }] },
  )
}
