'use client'

import Image from 'next/image'
import { useState } from 'react'
import { DFCC_BEFORE_AFTER, DFCC_SLIDE_ASPECT } from '@/lib/dfcc'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/** Durham FCC website refresh, every page before and after: four slides at a time on desktop, two on phones. */
export default function BeforeAfterCarousel({ onOpen }: { onOpen: (src: string, caption: string) => void }) {
  const narrow = useMediaQuery('(max-width: 760px)')
  const PER_PAGE = narrow ? 2 : 4
  const [first, setFirst] = useState(0)
  const page = Math.floor(first / PER_PAGE)
  const totalItems = DFCC_BEFORE_AFTER.length
  const totalPages = Math.ceil(totalItems / PER_PAGE)

  const startIdx = page * PER_PAGE
  const currentItems = DFCC_BEFORE_AFTER.slice(startIdx, startIdx + PER_PAGE)

  // Track the first slide shown, so switching between two and four per view keeps your place.
  const go = (d: number) => setFirst(Math.max(0, Math.min(totalPages - 1, page + d)) * PER_PAGE)

  return (
    <div className="pp-bac">
      <div className="pp-bac-list">
        {currentItems.map((item, idx) => {
          const itemNo = startIdx + idx + 1
          return (
            <div key={item.src} className="pp-bac-card">
              <div className="pp-bac-card-header">
                <span className="pp-bac-card-num">PAGE {String(itemNo).padStart(2, '0')}</span>
                <span className="pp-bac-card-caption">{item.caption}</span>
                <span className="pp-bac-card-badge">Before / After</span>
              </div>
              <button
                className="pp-bac-slide"
                style={{ aspectRatio: DFCC_SLIDE_ASPECT }}
                onClick={() => onOpen(item.src, `Durham FCC · ${item.caption} · before / after`)}
                aria-label={`View ${item.caption} before and after, full screen`}
              >
                <Image
                  src={item.src}
                  alt={`${item.caption}: durhamfcc.org before and after`}
                  fill
                  unoptimized
                  style={{ objectFit: 'contain' }}
                />
              </button>
            </div>
          )
        })}
      </div>

      <div className="pp-bac-pagination">
        <button
          type="button"
          className="pp-bac-nav-btn"
          onClick={() => go(-1)}
          disabled={page === 0}
          aria-label="Previous set of comparisons"
        >
          ← Prev
        </button>
        <span className="pp-bac-paging-info">
          Pages {startIdx + 1}–{Math.min(startIdx + PER_PAGE, totalItems)} <span className="pp-dim">/ {totalItems}</span>
        </span>
        <button
          type="button"
          className="pp-bac-nav-btn"
          onClick={() => go(1)}
          disabled={page >= totalPages - 1}
          aria-label="Next set of comparisons"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
