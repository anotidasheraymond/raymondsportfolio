import type { CSSProperties } from 'react'

/**
 * The Petworking wordmark as the current app draws it (PETWORKING mobile/src/components/wordmark.tsx,
 * Oct 20): "the word, with an outlined heart replacing the o", set in the product typeface (Space
 * Grotesk) at 600, never a logo file. The heart is the handoff's heart.png, tinted through a mask,
 * at the board's numbers: width .6em, height .54em, margin 0 .05em, nudged down .02em.
 */
const TRACKING: Array<[number, number]> = [[13, -0.004], [16, -0.008], [19, -0.015], [24, -0.026], [28, -0.028], [40, -0.032], [72, -0.036]]

function trackingFor(px: number) {
  if (px <= TRACKING[0][0]) return TRACKING[0][1]
  for (let i = 1; i < TRACKING.length; i++) {
    const [hp, ht] = TRACKING[i], [lp, lt] = TRACKING[i - 1]
    if (px <= hp) return lt + (ht - lt) * ((px - lp) / (hp - lp))
  }
  return TRACKING[TRACKING.length - 1][1]
}

export default function PetworkingWordmark({ size, color = '#33251d', style }: { size: number; color?: string; style?: CSSProperties }) {
  const heart: CSSProperties = {
    display: 'inline-block', width: '0.6em', height: '0.54em', margin: '0 0.05em', transform: 'translateY(0.02em)',
    backgroundColor: color,
    WebkitMaskImage: 'url(/img/ventures/pw-heart.png)', maskImage: 'url(/img/ventures/pw-heart.png)',
    WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center', maskPosition: 'center',
  }
  return (
    <span role="img" aria-label="Petworking" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', fontFamily: 'var(--pp-sans), sans-serif', fontWeight: 600, fontSize: size, lineHeight: 1, letterSpacing: `${trackingFor(size)}em`, color, ...style }}>
      <span aria-hidden="true">Petw</span><span aria-hidden="true" style={heart} /><span aria-hidden="true">rking</span>
    </span>
  )
}
