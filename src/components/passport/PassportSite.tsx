'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import GlitchCoin from './GlitchCoin'
import Word from './Lettering'
import Overlay, { type OverlayState } from './Overlay'
import {
  Cover, Endpaper, IdentityPage, VisaPage, HostfullyVisa, CampaignsPage, CaseFilesPage, MotionPage,
  EarlierPage, SkillsPage, ContactPage, BeforeAfterPage, ContentsPage, StoriesPage, HoardPage, IndependentPage, C54Visa,
  type Side, type Opener,
} from './Pages'
import { VISAS } from '@/lib/passport'
import { CONTACT } from '@/lib/content'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import './passport.css'

type Stage = 'coin' | 'charging' | 'burst' | 'cover'

const PAGE_COUNT = 18
const LEAF_COUNT = PAGE_COUNT / 2 + 1
const LAST_SPREAD_PAGE = PAGE_COUNT - 2
const CHAPTERS = [
  { label: 'Identity', page: 0 },
  { label: 'Durham FCC', page: 2 },
  { label: 'Edsby', page: 4 },
  { label: 'Hostfully', page: 5 },
  { label: 'Case files', page: 7 },
  { label: 'Stories', page: 9 },
  { label: 'Hostaway', page: 10 },
  { label: 'Shopify', page: 11 },
  { label: 'Community 54', page: 12 },
  { label: 'Earlier', page: 13 },
  { label: 'Projects', page: 14 },
  { label: 'Skills', page: 16 },
  { label: 'Contact', page: 17 },
]
const CONTENTS = [
  { label: 'Durham FCC', sub: 'Senior Marketing Consultant · 2026', page: 2 },
  { label: 'Edsby', sub: 'Social Media & Content Marketing Consultant · Sep 2026', page: 4 },
  { label: 'Hostfully', sub: 'Community & Integrated Marketing Manager · 2023–26', page: 5 },
  { label: 'Hostfully annexes', sub: 'Campaigns, case files, motion, customer stories', page: 6 },
  { label: 'Hostaway', sub: 'Senior Support Advisor & Technical Content Writer · 2022–24', page: 10 },
  { label: 'Shopify', sub: 'Support Advisor & Internal Copywriter · 2021–22', page: 11 },
  { label: 'Community 54', sub: 'Store Manager, Brand & Community Operations · 2017–19', page: 12 },
  { label: 'Earlier entries', sub: 'Six stamps, 2012–2024', page: 13 },
  { label: 'Independent work', sub: 'The Hoard, Pretty Apparel, Vineland, Crane', page: 14 },
  { label: 'Skills & contact', sub: 'Endorsements, education, how to reach me', page: 16 },
]

const visa = (id: string) => VISAS.find((v) => v.id === id)!

// The coin carries the current year: build year in the static HTML, the
// visitor's clock once hydrated.
const BUILD_YEAR = String(new Date().getFullYear())
const noSubscribe = () => () => {}
const useYear = () => useSyncExternalStore(noSubscribe, () => String(new Date().getFullYear()), () => BUILD_YEAR)

function renderPage(i: number, side: Side, active: boolean, open: Opener): ReactNode {
  const folio = i + 1
  switch (i) {
    case 0: return <IdentityPage side={side} folio={folio} />
    case 1: return <ContentsPage side={side} folio={folio} entries={CONTENTS} goTo={open.goTo} />
    case 2: return <VisaPage visa={visa('dfcc')} side={side} folio={folio} active={active} />
    case 3: return <BeforeAfterPage side={side} folio={folio} open={open} />
    case 4: return <VisaPage visa={visa('edsby')} side={side} folio={folio} active={active} />
    case 5: return <HostfullyVisa side={side} folio={folio} active={active} />
    case 6: return <CampaignsPage side={side} folio={folio} open={open} />
    case 7: return <CaseFilesPage side={side} folio={folio} open={open} />
    case 8: return <MotionPage side={side} folio={folio} />
    case 9: return <StoriesPage side={side} folio={folio} open={open} />
    case 10: return <VisaPage visa={visa('hostaway')} side={side} folio={folio} active={active} />
    case 11: return <VisaPage visa={visa('shopify')} side={side} folio={folio} active={active} />
    case 12: return <C54Visa side={side} folio={folio} active={active} open={open} />
    case 13: return <EarlierPage side={side} folio={folio} active={active} />
    case 14: return <HoardPage side={side} folio={folio} open={open} />
    case 15: return <IndependentPage side={side} folio={folio} open={open} />
    case 16: return <SkillsPage side={side} folio={folio} />
    case 17: return <ContactPage side={side} folio={folio} />
    default: return null
  }
}

/* ---------- moving security-print background ---------- */

function guillocheTile(color: string, phase: number) {
  const w = 320, h = 160, paths: string[] = []
  for (let k = 0; k < 9; k++) {
    const amp = 18 + k * 5.5, ph = phase + k * 0.42
    let d = ''
    for (let x = 0; x <= w; x += 4) {
      const y = h / 2 + amp * Math.sin((2 * Math.PI * x) / 160 + ph) * Math.cos((2 * Math.PI * x) / 320 + k * 0.2)
      d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`
    }
    paths.push(`<path d='${d}'/>`)
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' fill='none' stroke='${color}' stroke-width='0.7'>${paths.join('')}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function rosettePath() {
  // Hypotrochoid, the classic banknote rosette.
  const R = 260, r = 37, d = 150, pts: string[] = []
  for (let t = 0; t <= Math.PI * 2 * 37; t += 0.045) {
    const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)
    const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)
    pts.push(`${(x + 420).toFixed(1)} ${(y + 420).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
}

const TILE_A = guillocheTile('rgba(142,31,46,0.16)', 0)
const TILE_B = guillocheTile('rgba(18,50,49,0.14)', 1.7)
const ROSETTE = rosettePath()

function Backdrop({ stage, opened }: { stage: Stage; opened: boolean }) {
  const coinish = stage === 'coin' || stage === 'charging'
  return (
    <div className="pp-bg" aria-hidden="true">
      <div className="pp-bg-dark" style={{ opacity: coinish ? 1 : 0 }} />
      <div className="pp-bg-pattern" style={{ opacity: opened ? 1 : 0 }}>
        <div className="pp-bg-waves a" style={{ backgroundImage: TILE_A }} />
        <div className="pp-bg-waves b" style={{ backgroundImage: TILE_B }} />
        <svg className="pp-bg-rosette" viewBox="0 0 840 840"><path d={ROSETTE} /></svg>
      </div>
    </div>
  )
}

/* ---------- desktop flip book ---------- */

function FlipBook({ opened, page, open, onCoverClick, onSwipe }: { opened: boolean; page: number; open: Opener; onCoverClick: () => void; onSwipe: (dir: 1 | -1) => void }) {
  const spread = Math.floor(page / 2)
  const flipped = opened ? spread + 1 : 0
  const prevFlipped = useRef(flipped)
  const [moving, setMoving] = useState<Map<number, number>>(new Map())

  // Leaves that change side get lifted above everything for the turn, staggered
  // when jumping several spreads so they fan over like riffled pages.
  useEffect(() => {
    const from = prevFlipped.current, to = flipped
    prevFlipped.current = to
    if (from === to) return
    const lo = Math.min(from, to), hi = Math.max(from, to)
    const order = new Map<number, number>()
    for (let i = lo; i < hi; i++) order.set(i, to > from ? i - lo : hi - 1 - i)
    setMoving(order)
    const t = window.setTimeout(() => setMoving(new Map()), 1000 + order.size * 90)
    return () => window.clearTimeout(t)
  }, [flipped])

  const leaves = Array.from({ length: LEAF_COUNT }, (_, i) => {
    const front = i === 0 ? <Cover /> : renderPage(2 * i - 1, 'right', flipped === i, open)
    const back = i === LEAF_COUNT - 1 ? <Endpaper side="left" /> : renderPage(2 * i, 'left', flipped === i + 1, open)
    return { front, back }
  })

  // Touch swipe for tablets in spread mode.
  const start = useRef<{ x: number; y: number } | null>(null)

  return (
    <div
      className={`pp-book${opened ? ' is-open' : ''}`}
      onPointerDown={(e) => { if (e.pointerType === 'touch') start.current = { x: e.clientX, y: e.clientY } }}
      onPointerUp={(e) => {
        const s = start.current; start.current = null
        if (!s || !opened) return
        const dx = e.clientX - s.x
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - s.y)) onSwipe(dx < 0 ? 1 : -1)
      }}
    >
      <div className="pp-board pp-board-l" aria-hidden="true" />
      <div className="pp-board pp-board-r" aria-hidden="true" />
      <div className="pp-edges" aria-hidden="true" />
      {leaves.map((leaf, i) => {
        const turned = i < flipped
        const order = moving.get(i)
        const z = order !== undefined ? 60 + order : turned ? 20 + i : 20 - i
        const frontVisible = !turned && (i === flipped)
        const backVisible = turned && i === flipped - 1
        return (
          <div
            key={i}
            className={`pp-leaf${turned ? ' is-turned' : ''}${i === 0 ? ' is-cover' : ''}${order !== undefined ? ' is-moving' : ''}`}
            style={{ zIndex: z, transitionDelay: order !== undefined ? `${order * 90}ms` : '0ms', ['--delay' as string]: `${(order ?? 0) * 90}ms` }}
          >
            <div
              className="pp-face pp-front"
              inert={!frontVisible}
              aria-hidden={!frontVisible}
              onClick={i === 0 && !opened ? onCoverClick : undefined}
            >
              {leaf.front}
            </div>
            <div className="pp-face pp-back" inert={!backVisible} aria-hidden={!backVisible}>
              {leaf.back}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- phone: one page at a time ---------- */

function SingleBook({ opened, page, open, onCoverClick, onPage }: { opened: boolean; page: number; open: Opener; onCoverClick: () => void; onPage: (i: number) => void }) {
  const track = useRef<HTMLDivElement>(null)
  const fromScroll = useRef(false)

  useEffect(() => {
    const el = track.current
    if (!el || !opened) return
    if (fromScroll.current) { fromScroll.current = false; return }
    el.scrollTo({ left: page * el.clientWidth, behavior: 'smooth' })
  }, [page, opened])

  useEffect(() => {
    const el = track.current
    if (!el) return
    let t = 0
    const onScroll = () => {
      window.clearTimeout(t)
      t = window.setTimeout(() => {
        const i = Math.round(el.scrollLeft / el.clientWidth)
        fromScroll.current = true
        onPage(Math.max(0, Math.min(PAGE_COUNT - 1, i)))
      }, 90)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => { el.removeEventListener('scroll', onScroll); window.clearTimeout(t) }
  }, [onPage])

  return (
    <div className={`pp-single${opened ? ' is-open' : ''}`}>
      <div className="pp-track" ref={track} inert={!opened} aria-hidden={!opened}>
        {Array.from({ length: PAGE_COUNT }, (_, i) => (
          <div key={i} className="pp-slide" inert={opened && i !== page} aria-hidden={opened && i !== page}>
            <div className="pp-slide-page">{renderPage(i, 'right', opened && i === page, open)}</div>
          </div>
        ))}
      </div>
      <div className="pp-single-cover" onClick={opened ? undefined : onCoverClick} inert={opened} aria-hidden={opened}>
        <Cover />
      </div>
    </div>
  )
}

/* ---------- the experience ---------- */

export default function PassportSite() {
  const [stage, setStage] = useState<Stage>('coin')
  const [opened, setOpened] = useState(false)
  const [page, setPage] = useState(0)
  const [overlay, setOverlay] = useState<OverlayState>(null)
  const year = useYear()
  const single = useMediaQuery('(max-width: 760px)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const activateCoin = useCallback(() => {
    if (stage !== 'coin') return
    if (reduce) { setStage('cover'); return }
    setStage('charging')
    timers.current.push(window.setTimeout(() => setStage('burst'), 1150))
    timers.current.push(window.setTimeout(() => setStage('cover'), 1900))
  }, [stage, reduce])

  const openBook = useCallback(() => { setPage(0); setOpened(true) }, [])
  const closeBook = useCallback(() => { setOpened(false); setPage(0) }, [])

  const step = useCallback((dir: 1 | -1) => {
    if (single) {
      setPage(Math.max(0, Math.min(PAGE_COUNT - 1, page + dir)))
      return
    }
    const s = Math.floor(page / 2)
    // Back from the first spread closes the cover again.
    if (dir === -1 && s === 0) { closeBook(); return }
    setPage(Math.max(0, Math.min(LAST_SPREAD_PAGE, (s + dir) * 2)))
  }, [single, page, closeBook])

  useEffect(() => {
    if (stage !== 'cover') return
    const onKey = (e: KeyboardEvent) => {
      if (overlay) return
      const t = e.target as HTMLElement
      if (t.closest('input, textarea')) return
      if (!opened && (e.key === 'Enter' || e.key === 'ArrowRight')) { openBook(); return }
      if (!opened) return
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, opened, overlay, step, openBook])

  const opener = useMemo<Opener>(() => ({
    openImage: (src, caption) => setOverlay({ kind: 'image', src, caption }),
    openStudy: (id) => setOverlay({ kind: 'study', id }),
    openVideo: (src, poster, caption) => setOverlay({ kind: 'video', src, poster, caption }),
    goTo: (p) => setPage(p),
  }), [])
  const closeOverlay = useCallback(() => setOverlay(null), [])

  const spreadFirst = single ? page : Math.floor(page / 2) * 2
  // Every chapter that starts on a visible page lights up; otherwise the one
  // the visible pages belong to.
  const visible = single ? [page] : [spreadFirst, spreadFirst + 1]
  const starting = CHAPTERS.filter((c) => visible.includes(c.page)).map((c) => c.label)
  const activeChapters = starting.length ? starting : [[...CHAPTERS].reverse().find((c) => c.page <= visible[0])!.label]
  // Keep the lit chapter visible in the dock's scroller.
  const chaptersRef = useRef<HTMLDivElement>(null)
  const activeKey = activeChapters.join('|')
  useEffect(() => {
    const box = chaptersRef.current
    const btn = box?.querySelector<HTMLElement>('.is-active')
    if (!box || !btn) return
    box.scrollTo({ left: btn.offsetLeft - box.clientWidth / 2 + btn.offsetWidth / 2, behavior: 'smooth' })
  }, [activeKey])

  const atEnd = single ? page >= PAGE_COUNT - 1 : spreadFirst >= LAST_SPREAD_PAGE
  const passportOn = stage === 'burst' || stage === 'cover'

  return (
    <div className={`pp-root stage-${stage}${opened ? ' is-open' : ''}`}>
      <Backdrop stage={stage} opened={opened} />

      {/* Act 1 — the coin */}
      {stage !== 'cover' && (
        <section className="pp-coin-stage" aria-label="Intro">
          <div className="pp-coin-kicker">Portfolio · {year}</div>
          <GlitchCoin size={single ? 236 : 320} year={year} charging={stage !== 'coin'} onActivate={activateCoin} />
          <div className="pp-coin-hint">
            <span>Tap the coin</span>
            <span className="pp-dim">Drag to spin</span>
          </div>
          <Link className="pp-skip" href="/classic">Skip to text version</Link>
        </section>
      )}
      {stage === 'burst' && <div className="pp-burst" aria-hidden="true" />}

      {/* Act 2 — the passport */}
      <section className={`pp-stage${passportOn ? ' is-on' : ''}`} aria-label="Portfolio passport" inert={!passportOn}>
        <header className="pp-top">
          <span className="pp-top-mark" aria-label="Raymond Chizanga"><Word word="RC" height={17} /></span>
          <nav className="pp-top-links">
            <a href={CONTACT.resume} download>Resume ↓</a>
            <Link href="/classic">Text version</Link>
          </nav>
        </header>

        <div className="pp-book-wrap">
          {single ? (
            <SingleBook opened={opened} page={page} open={opener} onCoverClick={openBook} onPage={setPage} />
          ) : (
            <FlipBook opened={opened} page={page} open={opener} onCoverClick={openBook} onSwipe={step} />
          )}
        </div>

        {!opened && (
          <button className="pp-open-cta" onClick={openBook}>Open passport</button>
        )}

        <nav className={`pp-dock${opened ? ' is-on' : ''}`} aria-label="Passport pages" inert={!opened}>
          <button className="pp-arrow" onClick={() => step(-1)} aria-label={!single && spreadFirst === 0 ? 'Close passport' : 'Previous page'}>←</button>
          <div className="pp-chapters" ref={chaptersRef}>
            {CHAPTERS.map((c) => (
              <button
                key={c.label}
                className={activeChapters.includes(c.label) ? 'is-active' : ''}
                aria-current={activeChapters.includes(c.label) ? 'page' : undefined}
                onClick={() => setPage(single ? c.page : Math.min(LAST_SPREAD_PAGE, Math.floor(c.page / 2) * 2))}
              >
                {c.label}
              </button>
            ))}
          </div>
          <button className="pp-arrow" onClick={() => step(1)} disabled={atEnd} aria-label="Next page">→</button>
          <button className="pp-shut" onClick={closeBook}>Close</button>
        </nav>
      </section>

      <Overlay state={overlay} onClose={closeOverlay} />
    </div>
  )
}
