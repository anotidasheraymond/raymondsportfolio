'use client'

import { useEffect, useRef } from 'react'
import { STATS, OPTIONS } from '@/lib/content'

// Back-out easing: overshoots, then settles.
const back = (p: number) => {
  const c = 1.9
  return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2)
}

export default function StatBand() {
  const bandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!OPTIONS.animateCounters) return

    const root = bandRef.current
    if (!root) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-count]'))
    if (!nodes.length) return

    const frames: number[] = []

    const countUp = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count!)
      const pre = el.dataset.pre || ''
      const post = el.dataset.post || ''
      const final = el.dataset.final || pre + target + post
      const dur = 1250
      const t0 = performance.now()

      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur)
        el.textContent = pre + Math.round(target * back(p)) + post
        if (p < 1) frames.push(requestAnimationFrame(tick))
        else el.textContent = final
      }
      frames.push(requestAnimationFrame(tick))
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (!entry.isIntersecting || el.dataset.done) return
          el.dataset.done = '1'
          countUp(el)
        })
      },
      { threshold: 0.5 },
    )

    nodes.forEach((n) => io.observe(n))

    return () => {
      io.disconnect()
      frames.forEach((f) => cancelAnimationFrame(f))
    }
  }, [])

  return (
    <div className="statband" ref={bandRef}>
      <div className="wrap statband-inner">
        <div className="statband-eyebrow">Hostfully · 12-month period to May 2026</div>
        <div className="g4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className="stat-num"
                data-count={s.count}
                data-pre={s.pre}
                data-post={s.post}
                data-final={s.final}
              >
                {/* Final string is the initial HTML — correct without JS and for SEO. */}
                {s.final}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
