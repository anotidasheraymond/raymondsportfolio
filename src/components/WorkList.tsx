'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { WORKS, CHIPS, OPTIONS, type Chip } from '@/lib/content'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CursorPeek, { type PeekHandle } from './CursorPeek'
import Reveal from './Reveal'

export default function WorkList() {
  const [filter, setFilter] = useState<Chip>('All')
  const [open, setOpen] = useState<Record<string, boolean>>(
    OPTIONS.openFirstProject ? { hostfully: true } : {},
  )
  const peek = useRef<PeekHandle>(null)

  const hoverCapable = useMediaQuery('(hover: hover) and (pointer: fine)')
  const peekOn = hoverCapable && OPTIONS.cursorPeek

  const counts = Object.fromEntries(
    CHIPS.map((c) => [c, c === 'All' ? WORKS.length : WORKS.filter((w) => w.tag === c.toUpperCase()).length]),
  )

  const shown = WORKS.filter((w) => filter === 'All' || w.tag === filter.toUpperCase())

  return (
    <>
      {peekOn && <CursorPeek ref={peek} />}

      <Reveal>
        <div className="work-head">
          <div>
            <div className="eyebrow">01 · Selected work</div>
            <h2 className="h2">Star projects</h2>
          </div>
          <p className="prose">
            Five projects, five disciplines. Hover a row for the visual, open it for the work.
          </p>
        </div>
      </Reveal>

      <div className="pills" role="tablist" aria-label="Filter projects">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={filter === c}
            className="pill"
            onClick={() => setFilter(c)}
          >
            {c}
            <span className="pill-count">{counts[c]}</span>
          </button>
        ))}
      </div>

      <div className="wlist">
        {shown.map((w) => {
          const isOpen = !!open[w.id]
          const shots = (w.shots || []).slice(0, OPTIONS.shotsPerProject)

          return (
            <div key={w.id}>
              <button
                type="button"
                className="wrow"
                aria-expanded={isOpen}
                aria-controls={`panel-${w.id}`}
                onClick={() => setOpen((s) => ({ ...s, [w.id]: !s[w.id] }))}
                onMouseEnter={() => { if (peekOn && w.peek) peek.current?.show(w.id) }}
                onMouseLeave={() => { if (peekOn) peek.current?.hide() }}
              >
                <span className="wrow-n">{w.n}</span>
                <span className="wrow-title">{w.title}</span>
                <span className="wrow-kind hide-s">
                  {w.kind}
                  <br />
                  <span style={{ color: 'var(--acc-b)' }}>{w.year}</span>
                </span>
                <span className="wrow-glyph">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div id={`panel-${w.id}`}>
                  <div className="wdet">
                    <div>
                      <div className="wdet-role">{w.role}</div>
                      <div className="wdet-bullets">
                        {w.bullets.map((b) => (
                          <p key={b}>{b}</p>
                        ))}
                      </div>
                    </div>
                    <div className="specs">
                      {w.specs.map((s) => (
                        <div className="spec-row" key={s.k}>
                          <span className="spec-k">{s.k}</span>
                          <span className="spec-v">{s.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {shots.length > 0 && (
                    <div className="shots">
                      {shots.map((s) => (
                        <figure key={s.src + s.caption}>
                          <div className="shot-img" style={{ aspectRatio: s.ratio }}>
                            <Image
                              src={s.src}
                              alt={s.caption}
                              fill
                              loading="lazy"
                              sizes="(max-width: 900px) 50vw, 25vw"
                            />
                          </div>
                          <figcaption className="caption" style={{ paddingTop: 8 }}>
                            {s.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
