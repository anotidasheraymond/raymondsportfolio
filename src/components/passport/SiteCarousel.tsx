'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SITE_SLIDE_ASPECT, type SiteSlide } from '@/lib/ventureSites'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/** Live pages of a venture's web platform: six at a time on desktop, two on phones. Same frame as the Durham FCC carousel. */
export default function SiteCarousel({ slides, site, onOpen }: { slides: SiteSlide[]; site: string; onOpen: (src: string, caption: string) => void }) {
  const narrow = useMediaQuery('(max-width: 760px)')
  const PER_PAGE = narrow ? 2 : 6
  const [first, setFirst] = useState(0)
  const page = Math.floor(first / PER_PAGE)
  const total = slides.length
  const totalPages = Math.ceil(total / PER_PAGE)
  const start = page * PER_PAGE
  const items = slides.slice(start, start + PER_PAGE)
  const go = (d: number) => setFirst(Math.max(0, Math.min(totalPages - 1, page + d)) * PER_PAGE)

  return (
    <div className="pp-bac">
      <div className="pp-bac-list">
        {items.map((s, i) => (
          <div key={s.src} className="pp-bac-card">
            <div className="pp-bac-card-header">
              <span className="pp-bac-card-num">PAGE {String(start + i + 1).padStart(2, '0')}</span>
              <span className="pp-bac-card-caption">{s.caption}</span>
            </div>
            <button
              className="pp-bac-slide"
              style={{ aspectRatio: SITE_SLIDE_ASPECT }}
              onClick={() => onOpen(s.src, `${site}${s.path === '/' ? '' : s.path} · ${s.caption}`)}
              aria-label={`View the ${s.caption} page of ${site}, full screen`}
            >
              <Image src={s.thumb} alt={`${site}${s.path === '/' ? '' : s.path}, live page`} fill unoptimized style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </button>
          </div>
        ))}
      </div>
      <div className="pp-bac-pagination">
        <button type="button" className="pp-bac-nav-btn" onClick={() => go(-1)} disabled={page === 0} aria-label="Previous pages">← Prev</button>
        <span className="pp-bac-paging-info" aria-live="polite" aria-atomic="true">
          Pages {start + 1}–{Math.min(start + PER_PAGE, total)} <span className="pp-dim">/ {total}</span>
        </span>
        <button type="button" className="pp-bac-nav-btn" onClick={() => go(1)} disabled={page >= totalPages - 1} aria-label="Next pages">Next →</button>
      </div>
    </div>
  )
}
