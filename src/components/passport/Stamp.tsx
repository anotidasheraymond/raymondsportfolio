import type { StampSpec } from '@/lib/passport'
import { hashSeed } from '@/lib/stamps/seed'

// A Stamp Studio impression, pressed at build time (app/stamps/[id]) by the Petworking stamp
// compiler. This component only places it on the page: the landing turn and the thud. The URL
// carries a hash of the spec, so an edited stamp is never served from a stale cache.

export default function Stamp({ id, spec, size = 132, active = true }: { id: string; spec: StampSpec; size?: number; active?: boolean }) {
  return (
    <span
      className={`pp-stamp${active ? ' is-in' : ''}`}
      style={{ ['--rot' as string]: `${spec.rot}deg`, ...(size ? { width: size, height: size } : null) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- a static SVG; the image optimizer would rasterize it */}
      <img src={`/stamps/${id}?v=${hashSeed(JSON.stringify(spec)).toString(36)}`} alt={`${spec.business} stamp, ${spec.claim}, ${spec.year}`} loading="lazy" decoding="async" />
    </span>
  )
}
