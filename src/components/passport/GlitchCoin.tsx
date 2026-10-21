'use client'

import { useEffect, useRef } from 'react'
import Word from './Lettering'

// The Hoard glitch coin (nie-kit CoinSpin), ported to this site. Pure CSS 3D:
// two faces plus a milled rim of edge segments, with holo shimmer, scanlines
// and red/cyan "ghost" faces that slice in for the chromatic glitch.
// Two faces: the site intro's founder "brass" coin with Raymond's name, and The Hoard's own
// founding coin exactly as thehoard.social shows it (onyx palette, FOUNDING / year, H / ON FILE,
// nie Coin.tsx proportions). Kenyan Coffee words are baked outlines (coin-lettering.ts).

type Palette = { n1: string; n2: string; n3: string; glow: string }
const PALETTES: Record<'portfolio' | 'hoard', Palette> = {
  portfolio: { n1: '#FFE7A6', n2: '#FF7AD9', n3: '#5BCBFF', glow: 'rgba(255,170,90,.5)' },
  hoard: { n1: '#F8FBFF', n2: '#8E7CFF', n3: '#2DE7FF', glow: 'rgba(45,231,255,.5)' },
}
export type CoinFaceKind = keyof typeof PALETTES
const MONO = "var(--pp-coin-mono), 'JetBrains Mono', monospace"

type FaceProps = { size: number; year: string; face: CoinFaceKind; reverse?: boolean; ghost?: boolean; tint?: string }

function CoinFace({ size: r, year, face, reverse, ghost, tint }: FaceProps) {
  const M = PALETTES[face]
  const glowTxt = `0 0 ${r * 0.025}px ${M.n3}, 0 0 ${r * 0.06}px ${M.n2}`
  const scanPx = Math.max(3, Math.round(r * 0.013))
  const shadow = ghost ? 'none' : glowTxt
  // Lettering is artwork, so it glows with a filter rather than a text-shadow.
  const svgGlow = ghost ? undefined : `drop-shadow(0 0 ${r * 0.008}px ${M.n3}) drop-shadow(0 0 ${r * 0.028}px ${M.n2}aa)`
  const ink = ghost ? tint : '#F2FCFF'
  const sub = ghost ? tint : '#CFEFFF'
  const content = face === 'hoard' ? (reverse ? (
    <>
      <Word word="H" height={r * 0.316} color={ink} style={{ filter: svgGlow }} />
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: r * 0.06, letterSpacing: '.22em', color: sub, marginTop: r * 0.05, textShadow: shadow }}>ON FILE</div>
    </>
  ) : (
    <>
      <Word word="FOUNDING" height={r * 0.144} color={ink} style={{ filter: svgGlow }} />
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: r * 0.085, letterSpacing: '.18em', color: sub, marginTop: r * 0.05, textShadow: shadow }}>{year}</div>
    </>
  )) : reverse ? (
    <>
      <Word word="RC" height={r * 0.28} color={ghost ? tint : '#F2FCFF'} style={{ filter: svgGlow }} />
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: r * 0.055, letterSpacing: '.22em', color: ghost ? tint : '#CFEFFF', marginTop: r * 0.06, textShadow: shadow }}>PORTFOLIO</div>
    </>
  ) : (
    <>
      <Word word="RAYMOND" height={r * 0.125} color={ghost ? tint : '#F2FCFF'} style={{ filter: svgGlow }} />
      <Word word="CHIZANGA" height={r * 0.125} color={ghost ? tint : '#F2FCFF'} style={{ filter: svgGlow, marginTop: r * 0.032 }} />
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: r * 0.08, letterSpacing: '.18em', color: ghost ? tint : '#CFEFFF', marginTop: r * 0.06, textShadow: shadow }}>{year}</div>
    </>
  )

  if (ghost) {
    return (
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mixBlendMode: 'screen', pointerEvents: 'none', border: `${Math.max(1.5, r * 0.016)}px solid ${tint}`, boxShadow: `inset 0 0 ${r * 0.05}px ${tint}, 0 0 ${r * 0.04}px ${tint}`, background: `radial-gradient(circle, ${tint}22, transparent 70%)` }}>{content}</div>
    )
  }
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', backfaceVisibility: 'hidden', background: 'radial-gradient(circle at 50% 40%, rgba(14,26,40,.34), rgba(3,8,15,.9) 80%)', border: `${Math.max(2, r * 0.02)}px solid ${M.n3}`, boxShadow: `0 0 ${r * 0.16}px ${M.glow}, inset 0 0 ${r * 0.12}px ${M.n3}55, inset 0 0 0 1px ${M.n1}44`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="holoShimmer" style={{ position: 'absolute', inset: '-22%', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0.5, pointerEvents: 'none', background: `conic-gradient(from 0deg, ${M.n1}, ${M.n2}, ${M.n3}, ${M.n2}, ${M.n1})` }} />
      <div className="holoScan" style={{ position: 'absolute', inset: 0, borderRadius: '50%', mixBlendMode: 'screen', opacity: 0.3, pointerEvents: 'none', background: `repeating-linear-gradient(0deg, rgba(180,240,255,.18) 0 1px, transparent 1px ${scanPx}px)` }} />
      <div style={{ position: 'absolute', inset: r * 0.085, borderRadius: '50%', boxShadow: `inset 0 0 0 1px ${M.n3}88, 0 0 ${r * 0.03}px ${M.n3}55`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: r * 0.17, borderRadius: '50%', boxShadow: `inset 0 0 0 1px ${M.n2}55`, pointerEvents: 'none' }} />
      {content}
    </div>
  )
}

function FaceStack(props: Omit<FaceProps, 'ghost' | 'tint'>) {
  return (
    <>
      <CoinFace {...props} />
      <div className="coinGlitchR" style={{ position: 'absolute', inset: 0 }}><CoinFace {...props} ghost tint="#ff2d55" /></div>
      <div className="coinGlitchC" style={{ position: 'absolute', inset: 0 }}><CoinFace {...props} ghost tint="#26e0ff" /></div>
    </>
  )
}

export default function GlitchCoin({ size, year, face = 'portfolio', charging = false, onActivate }: { size: number; year: string; face?: CoinFaceKind; charging?: boolean; onActivate?: () => void }) {
  const M = PALETTES[face]
  const stageRef = useRef<HTMLDivElement>(null)
  const spinRef = useRef<HTMLDivElement>(null)
  const st = useRef({ ry: -20, rx: 9, vel: 0.25, drag: false, reduce: false, charging: false })
  const activate = useRef(onActivate)

  useEffect(() => { activate.current = onActivate }, [onActivate])
  useEffect(() => { st.current.charging = charging }, [charging])

  useEffect(() => {
    const node = spinRef.current, stage = stageRef.current, s = st.current
    if (!node || !stage) return
    s.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const apply = () => { node.style.transform = `rotateX(${s.rx}deg) rotateY(${s.ry}deg)` }
    apply()

    let raf = 0
    const idle = 0.25
    const step = () => {
      if (s.charging) {
        // Wind up: accelerate hard and level out before the burst.
        s.vel = Math.min(46, s.vel * 1.09 + 0.8)
        s.ry += s.vel
        s.rx += (0 - s.rx) * 0.12
        apply()
      } else if (!s.drag && !s.reduce) {
        s.ry += s.vel
        if (Math.abs(s.vel) > idle) s.vel *= 0.95
        else s.vel = s.vel < 0 ? -idle : idle
        s.rx += (9 - s.rx) * 0.04
        apply()
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    // Drag spins the coin; a tap (barely any travel) opens the portfolio.
    let px = 0, py = 0, lastDx = 0, travel = 0
    const down = (e: PointerEvent) => {
      if (s.charging) return
      s.drag = true; travel = 0; lastDx = 0
      px = e.clientX; py = e.clientY
      node.classList.add('dragging')
      try { stage.setPointerCapture(e.pointerId) } catch { /* noop */ }
    }
    const move = (e: PointerEvent) => {
      if (!s.drag) return
      const dx = e.clientX - px, dy = e.clientY - py
      px = e.clientX; py = e.clientY
      travel += Math.abs(dx) + Math.abs(dy)
      s.ry += dx * 0.6
      s.rx = Math.max(-34, Math.min(34, s.rx - dy * 0.4))
      lastDx = dx
      apply()
    }
    const up = () => {
      if (!s.drag) return
      s.drag = false
      node.classList.remove('dragging')
      if (travel < 6 && activate.current) { s.vel = 2; activate.current(); return }
      s.vel = Math.max(-24, Math.min(24, lastDx * 0.6)) || idle
    }
    stage.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  const d = Math.max(5, size * (face === 'hoard' ? 0.115 : 0.07)), R = size / 2
  const N = Math.max(48, Math.min(96, Math.round(size / 3)))
  const segLen = (2 * Math.PI * R) / N + 1.5
  const segs = Array.from({ length: N }, (_, i) => (
    <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: segLen, height: d, marginLeft: -segLen / 2, marginTop: -d / 2, transform: `rotateZ(${(360 / N) * i}deg) translateY(${-R}px) rotateX(90deg)`, backfaceVisibility: 'hidden', background: `repeating-linear-gradient(90deg, rgba(0,0,0,.45) 0 1.1px, ${M.n1} 1.1px 2.5px), linear-gradient(0deg, ${M.n3}, ${M.n2} 50%, ${M.n3})`, opacity: 0.92 }} />
  ))

  return (
    <div
      className={`coinPop pp-coin${charging ? ' is-charging' : ''}${face === 'hoard' ? ' is-hoard' : ''}`}
      {...(onActivate ? {
        role: 'button',
        tabIndex: 0,
        'aria-label': `Raymond Chizanga ${year} coin. Open the portfolio passport.`,
        onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate() } },
      } : { role: 'img', 'aria-label': `The Hoard founding coin, ${year}. Drag to spin.` })}
      style={{ width: size, height: size, position: 'relative', filter: `drop-shadow(0 ${size * 0.07}px ${size * 0.11}px rgba(0,0,0,.45)) drop-shadow(0 0 ${size * 0.11}px ${M.glow})` }}
    >
      <div className="coinFloat holoFlicker" style={{ position: 'absolute', inset: 0 }}>
        <div ref={stageRef} style={{ position: 'absolute', inset: 0, perspective: `${size * 4}px` }}>
          <div className="pp-coin-halo" style={{ position: 'absolute', inset: '-16%', borderRadius: '50%', background: `radial-gradient(circle, ${M.glow}, transparent 70%)`, filter: 'blur(8px)', pointerEvents: 'none' }} />
          <div ref={spinRef} className="coin3d" style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
            <div style={{ position: 'absolute', inset: 0, transform: `translateZ(${d / 2}px)`, backfaceVisibility: 'hidden' }}>
              <FaceStack size={size} year={year} face={face} />
            </div>
            {segs}
            <div style={{ position: 'absolute', inset: 0, transform: `rotateY(180deg) translateZ(${d / 2}px)`, backfaceVisibility: 'hidden' }}>
              <FaceStack size={size} year={year} face={face} reverse />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
