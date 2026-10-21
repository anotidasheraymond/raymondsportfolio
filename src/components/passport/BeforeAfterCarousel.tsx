'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { DFCC_BEFORE_AFTER } from '@/lib/passport'

/** Durham FCC, every page before and after: one slide at a time, with a filmstrip of all of them. */
export default function BeforeAfterCarousel({ onOpen }: { onOpen: (src: string, caption: string) => void }) {
  const [i, setI] = useState(0)
  const strip = useRef<HTMLDivElement>(null)
  const n = DFCC_BEFORE_AFTER.length
  const s = DFCC_BEFORE_AFTER[i]
  const go = (d: number) => setI((x) => (x + d + n) % n)

  useEffect(() => {
    const el = strip.current?.children[i] as HTMLElement | undefined
    const box = strip.current
    if (el && box) box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [i])

  // Swipes here move the carousel, not the passport.
  const stop = (e: React.PointerEvent) => e.stopPropagation()

  return (
    <div className="pp-bac" onPointerDown={stop} onPointerUp={stop}>
      <div className="pp-bac-stage">
        <button className="pp-bac-slide" onClick={() => onOpen(s.src, `Durham FCC · ${s.caption} · before / after`)} aria-label={`View ${s.caption} before and after, full screen`}>
          <Image key={s.src} src={s.src} alt={`${s.caption}: durhamfcc.org before and after`} fill unoptimized priority style={{ objectFit: 'contain' }} />
        </button>
        <button className="pp-bac-nav is-prev" onClick={() => go(-1)} aria-label="Previous page">←</button>
        <button className="pp-bac-nav is-next" onClick={() => go(1)} aria-label="Next page">→</button>
      </div>
      <div className="pp-bac-meta">
        <span className="pp-bac-count">{String(i + 1).padStart(2, '0')} / {n}</span>
        <span className="pp-bac-title">{s.caption}</span>
      </div>
      <div className="pp-bac-strip" ref={strip}>
        {DFCC_BEFORE_AFTER.map((t, k) => (
          <button key={t.src} className={`pp-bac-thumb${k === i ? ' is-on' : ''}`} onClick={() => setI(k)} aria-label={t.caption} aria-current={k === i}>
            <Image src={t.thumb} alt="" fill unoptimized sizes="80px" style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  )
}
