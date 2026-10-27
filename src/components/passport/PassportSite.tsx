'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import GlitchCoin from './GlitchCoin'
import Word from './Lettering'
import Overlay, { type OverlayState } from './Overlay'
import {
  Cover, Endpaper, IdentityPage, VisaPage, HostfullyVisa, CampaignsPage, CaseFilesPage, MotionPage,
  EarlierPage, SkillsPage, HardwarePage, ContactPage, BeforeAfterPage, StoriesPage, IndependentPage, C54Visa, BioPage,
  type Side, type Opener,
} from './Pages'
import { VentureVisa, DoghairAnnex, PetworkingAnnex, HoardAnnex, DuckAnnex } from './Ventures'
import { VISAS } from '@/lib/passport'
import { CONTACT } from '@/lib/content'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import './passport.css'

type Stage = 'coin' | 'charging' | 'burst' | 'cover'

const PAGE_COUNT = 26
const LEAF_COUNT = PAGE_COUNT / 2 + 1
const LAST_SPREAD_PAGE = PAGE_COUNT - 2

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
    case 1: return <BioPage side={side} folio={folio} />
    case 2: return <VentureVisa id="doghair" side={side} folio={folio} active={active} />
    case 3: return <DoghairAnnex side={side} folio={folio} />
    case 4: return <VentureVisa id="petworking" side={side} folio={folio} active={active} />
    case 5: return <PetworkingAnnex side={side} folio={folio} />
    case 6: return <VentureVisa id="hoard" side={side} folio={folio} active={active} />
    case 7: return <HoardAnnex side={side} folio={folio} active={active} open={open} />
    case 8: return <VentureVisa id="duck" side={side} folio={folio} active={active} />
    case 9: return <DuckAnnex side={side} folio={folio} active={active} />
    case 10: return <VisaPage visa={visa('dfcc')} side={side} folio={folio} active={active} />
    case 11: return <BeforeAfterPage side={side} folio={folio} open={open} />
    case 12: return <HostfullyVisa side={side} folio={folio} active={active} />
    case 13: return <CampaignsPage side={side} folio={folio} open={open} />
    case 14: return <CaseFilesPage side={side} folio={folio} open={open} />
    case 15: return <MotionPage side={side} folio={folio} />
    case 16: return <StoriesPage side={side} folio={folio} open={open} />
    case 17: return <VisaPage visa={visa('hostaway')} side={side} folio={folio} active={active} />
    case 18: return <VisaPage visa={visa('shopify')} side={side} folio={folio} active={active} />
    case 19: return <C54Visa side={side} folio={folio} active={active} open={open} />
    case 20: return <EarlierPage side={side} folio={folio} active={active} />
    case 21: return <IndependentPage ids={['pretty', 'crane']} head="Video & campaigns" side={side} folio={folio} open={open} />
    case 22: return <IndependentPage ids={['vineland']} head="Photography" side={side} folio={folio} open={open} />
    case 23: return <HardwarePage side={side} folio={folio} active={active} />
    case 24: return <SkillsPage side={side} folio={folio} />
    case 25: return <ContactPage side={side} folio={folio} />
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
  const coinish = stage === 'coin' || stage === 'charging' || stage === 'burst'
  return (
    <div className="pp-bg" aria-hidden="true">
      <div className="pp-bg-dark" style={{ opacity: coinish ? 1 : 0 }} />
      <div className="pp-bg-pattern" style={{ opacity: opened ? 1 : (stage === 'burst' || stage === 'cover' ? 0.35 : 0) }}>
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
    const t = window.setTimeout(() => setMoving(new Map()), 760 + order.size * 45)
    return () => window.clearTimeout(t)
  }, [flipped])

  const leaves = useMemo(() => Array.from({ length: LEAF_COUNT }, (_, i) => {
    const isNearby = Math.abs(i - flipped) <= 2 || moving.has(i) || (i === 0 && !opened)
    const front = isNearby
      ? (i === 0 ? <Cover /> : renderPage(2 * i - 1, 'right', flipped === i, open))
      : <div className="pp-paper pp-right" />
    const back = isNearby
      ? (i === LEAF_COUNT - 1 ? <Endpaper side="left" /> : renderPage(2 * i, 'left', flipped === i + 1, open))
      : <div className="pp-paper pp-left" />
    return { front, back }
  }), [flipped, open, opened, moving])

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
            style={{ zIndex: z, transitionDelay: order !== undefined ? `${order * 45}ms` : '0ms', ['--delay' as string]: `${(order ?? 0) * 45}ms` }}
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

function SingleBook({
  opened,
  page,
  open,
  onCoverClick,
  onPage,
  onClose,
}: {
  opened: boolean
  page: number
  open: Opener
  onCoverClick: () => void
  onPage: (i: number) => void
  onClose: () => void
}) {
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!opened || e.touches.length !== 1) return
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY, time: Date.now() }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start || !opened || e.changedTouches.length === 0) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    const dt = Date.now() - start.time

    // Reliable mobile swipe: quick flick (dt < 350ms, |dx| > 30px) or drag (> 45px)
    // with horizontal motion clearly dominating vertical (|dx| > |dy| * 1.25)
    const isFlick = dt < 350 && Math.abs(dx) > 30
    const isDrag = Math.abs(dx) > 45
    if ((isFlick || isDrag) && Math.abs(dx) > Math.abs(dy) * 1.25) {
      if (dx < 0) {
        // Swiping left -> next page
        if (page < PAGE_COUNT - 1) onPage(page + 1)
      } else {
        // Swiping right -> previous page, or close on page 0
        if (page === 0) onClose()
        else onPage(page - 1)
      }
    }
  }

  // Pointer event fallback for mouse/desktop responsive emulator testing
  const mouseStart = useRef<{ x: number; y: number } | null>(null)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && opened) {
      mouseStart.current = { x: e.clientX, y: e.clientY }
    }
  }
  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && mouseStart.current && opened) {
      const dx = e.clientX - mouseStart.current.x
      const dy = e.clientY - mouseStart.current.y
      mouseStart.current = null
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25) {
        if (dx < 0) {
          if (page < PAGE_COUNT - 1) onPage(page + 1)
        } else {
          if (page === 0) onClose()
          else onPage(page - 1)
        }
      }
    }
  }

  return (
    <div
      className={`pp-single${opened ? ' is-open' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div
        className="pp-track"
        inert={!opened}
        aria-hidden={!opened}
      >
        {/* The track stays put and clips; only this strip slides. Moving the clipping box itself
            would carry its clip off-screen with it and hide every page after the first. */}
        <div className="pp-strip" style={{ transform: `translate3d(${-page * 100}%, 0, 0)` }}>
        {Array.from({ length: PAGE_COUNT }, (_, i) => {
          const isNearby = Math.abs(i - page) <= 2
          return (
            <div key={i} className="pp-slide" inert={opened && i !== page} aria-hidden={opened && i !== page}>
              <div className="pp-slide-page">
                {isNearby ? renderPage(i, 'right', opened && i === page, open) : <div className="pp-paper pp-right" />}
              </div>
            </div>
          )
        })}
        </div>
      </div>
      <div
        className="pp-single-cover"
        onClick={opened ? undefined : onCoverClick}
        role="button"
        tabIndex={opened ? -1 : 0}
        aria-label="Open passport"
        onKeyDown={(e) => { if (!opened && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onCoverClick() } }}
        inert={opened}
        aria-hidden={opened}
      >
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
    timers.current.push(window.setTimeout(() => setStage('burst'), 850))
    timers.current.push(window.setTimeout(() => setStage('cover'), 1350))
  }, [stage, reduce])

  const openBook = useCallback(() => { setPage(0); setOpened(true) }, [])
  const closeBook = useCallback(() => { setOpened(false); setPage(0) }, [])

  const step = useCallback((dir: 1 | -1) => {
    if (single) {
      if (dir === -1 && page === 0) {
        closeBook()
        return
      }
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
  const visible = single ? [page] : [spreadFirst, spreadFirst + 1]
  const pageLabel = visible.map((p) => String(p + 1).padStart(2, '0')).join('–')

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
          <div className="pp-coin-hint" onClick={activateCoin} style={{ cursor: 'pointer' }}>
            <span>{single ? 'Tap or drag to open' : 'Drag to spin · Tap to open'}</span>
          </div>
        </section>
      )}
      {stage === 'burst' && <div className="pp-burst" aria-hidden="true" />}

      {/* Act 2 — the passport */}
      <section className={`pp-stage${passportOn ? ' is-on' : ''}`} aria-label="Portfolio passport" inert={!passportOn}>
        <header className="pp-top">
          <span className="pp-top-mark" aria-label="Raymond Chizanga"><Word word="RC" height={17} /></span>
          <nav className="pp-top-links">
            <a href={CONTACT.resume} download>Resume ↓</a>
          </nav>
        </header>

        <div className="pp-book-wrap">
          {single ? (
            <SingleBook opened={opened} page={page} open={opener} onCoverClick={openBook} onPage={setPage} onClose={closeBook} />
          ) : (
            <FlipBook opened={opened} page={page} open={opener} onCoverClick={openBook} onSwipe={step} />
          )}
        </div>

        {!opened && (
          <button className="pp-open-cta" onClick={openBook}>Open passport</button>
        )}

        <nav className={`pp-dock${opened ? ' is-on' : ''}`} aria-label="Passport pages" inert={!opened}>
          <button className="pp-arrow" onClick={() => step(-1)} aria-label={(single ? page === 0 : spreadFirst === 0) ? 'Close passport' : 'Previous page'}>←</button>
          <span className="pp-pageno" aria-live="polite">Page {pageLabel} <span className="pp-dim">/ {PAGE_COUNT}</span></span>
          <button className="pp-arrow" onClick={() => step(1)} disabled={atEnd} aria-label="Next page">→</button>
          <button className="pp-shut" onClick={closeBook}>Close</button>
        </nav>
      </section>

      <Overlay state={overlay} onClose={closeOverlay} />
    </div>
  )
}
