/* eslint-disable @next/next/no-img-element */
// Plain <img>: tiny transparent PNGs sized by height with width:auto,
// which is simpler without a known intrinsic box.
import { LOGOS, BRAND_NAMES } from '@/lib/content'

const tall = LOGOS.filter((l) => l.tall)
const wordmarks = LOGOS.filter((l) => !l.tall)

function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="marq-row" aria-hidden={duplicate || undefined}>
      {tall.map((l) => (
        <img key={l.src} className="tall" src={l.src} alt={duplicate ? '' : l.alt} />
      ))}
      {wordmarks.map((l) => (
        <img key={l.src} src={l.src} alt={duplicate ? '' : l.alt} />
      ))}
      {BRAND_NAMES.map((b) => (
        <span key={b}>{b}</span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marq">
      <div className="wrap">
        <div className="marq-note">
          Worked with these brands directly on marketing campaigns, promotions, and feature launches
        </div>
      </div>
      <div className="marq-track">
        <Row />
        <Row duplicate />
      </div>
    </div>
  )
}
