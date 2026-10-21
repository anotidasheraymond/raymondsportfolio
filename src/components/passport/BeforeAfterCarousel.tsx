'use client'

import Image from 'next/image'
import { useState } from 'react'
import { DFCC_BEFORE_AFTER } from '@/lib/passport'

/** Durham FCC, every page before and after: one slide at a time. */
export default function BeforeAfterCarousel({ onOpen }: { onOpen: (src: string, caption: string) => void }) {
  const [i, setI] = useState(0)
  const n = DFCC_BEFORE_AFTER.length
  const s = DFCC_BEFORE_AFTER[i]
  const go = (d: number) => setI((x) => (x + d + n) % n)

  return (
    <div className="pp-bac">
      <div className="pp-bac-stage">
        <button className="pp-bac-slide" onClick={() => onOpen(s.src, `Durham FCC · ${s.caption} · before / after`)} aria-label={`View ${s.caption} before and after, full screen`}>
          <Image key={s.src} src={s.src} alt={`${s.caption}: durhamfcc.org before and after`} fill unoptimized style={{ objectFit: 'contain' }} />
        </button>
        <button className="pp-bac-nav is-prev" onClick={() => go(-1)} aria-label="Previous page">←</button>
        <button className="pp-bac-nav is-next" onClick={() => go(1)} aria-label="Next page">→</button>
      </div>
      <div className="pp-bac-meta">
        <span className="pp-bac-count">{String(i + 1).padStart(2, '0')} / {n}</span>
        <span className="pp-bac-title">{s.caption}</span>
      </div>
    </div>
  )
}
