import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Raymond Chizanga — Integrated Marketing'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0d100c',
          color: '#f5f6f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 88px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: '#4a7a47', textTransform: 'uppercase' }}>
          Portfolio · 2026
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 132, fontWeight: 700, letterSpacing: -2, marginTop: 22 }}>
          <span>RAYMOND</span>
          <span style={{ color: '#4a7a47' }}>CHIZANGA</span>
        </div>
        <div style={{ height: 6, width: 320, background: '#4a7a47', marginTop: 30 }} />
        <div style={{ fontSize: 30, color: 'rgba(245,246,240,.68)', marginTop: 34 }}>
          Integrated marketing lead · The full-stack generalist
        </div>
      </div>
    ),
    size,
  )
}
