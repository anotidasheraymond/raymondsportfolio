import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Raymond Chizanga — portfolio passport'

// The passport cover as a share card: oxblood board, foil type, spine stitching.
export default function OpengraphImage() {
  const foil = '#d6b27a'
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#f8f4eb', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1080, height: 520, display: 'flex', background: '#4a1d1d', borderRadius: 18, boxShadow: '0 30px 60px rgba(51,37,29,.35)', position: 'relative' }}>
          <div style={{ width: 54, height: '100%', background: '#3d1717', display: 'flex' }} />
          <div style={{ position: 'absolute', left: 84, right: 30, top: 30, bottom: 30, border: `2px solid ${foil}88`, borderRadius: 8, display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 0 96px', color: foil }}>
            <div style={{ fontSize: 26, letterSpacing: 8, textTransform: 'uppercase', opacity: 0.85 }}>Passport · Portfolio</div>
            <div style={{ fontSize: 108, fontWeight: 700, lineHeight: 1, marginTop: 24, letterSpacing: 2 }}>RAYMOND</div>
            <div style={{ fontSize: 108, fontWeight: 700, lineHeight: 1, letterSpacing: 2 }}>CHIZANGA</div>
            <div style={{ fontSize: 30, marginTop: 30, color: '#f3e6c4' }}>Integrated marketing · Brand &amp; community</div>
            <div style={{ fontSize: 22, marginTop: 10, letterSpacing: 4, opacity: 0.8 }}>RAYMONDCHIZANGA.WORK</div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
