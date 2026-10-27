'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

const MIN_FIT = 0.75
const MAX_FIT = 1.45
const EASE = 0.97

/**
 * Facing pages of the same kind (two visas side by side) keep their type close across the spread: each
 * page reports the largest scale it could take, and none may exceed the smaller one by more than 15%.
 */
const SPREAD_SPAN = 1.15
const groups = new Map<string, Map<HTMLElement, { best: number; apply: (f: number) => void }>>()
function settle(key: string) {
  const g = groups.get(key)
  if (!g) return
  const floor = Math.min(...[...g.values()].map((m) => m.best))
  g.forEach((m) => m.apply(Math.min(m.best, floor * SPREAD_SPAN)))
}

/**
 * A page body that fills its paper. It finds the largest scale (0.75 to 1.45) at which the content
 * fits without overflowing, so a sparse page grows into its space and a full one shrinks rather than clips, and applies it as --fit, which passport.css uses as `zoom` on the body's
 * content blocks. Refits when the page resizes or an image inside it finishes loading.
 */
export default function FitBody({ className, children, group }: { className: string; children: ReactNode; group?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const fits = (f: number) => {
      el.style.setProperty('--fit', String(f))
      if (el.scrollHeight > el.clientHeight + 0.5) return false
      // Width is judged on the content blocks only: stamps (visa, earlier entries) and the ghost photo are placed
      // absolutely and animate, so they must not decide how large the page's content can be.
      for (const c of el.children) {
        if (c.matches('.pp-visa-stamp, .pp-ghost, .pp-placed')) continue
        if (c.scrollWidth > c.clientWidth + 0.5) return false
      }
      return true
    }
    const fit = () => {
      if (el.clientHeight < 40) return
      let lo = MIN_FIT, hi = MAX_FIT
      if (fits(hi)) { lo = hi } else if (!fits(lo)) { return } else {
        for (let i = 0; i < 9; i++) { const mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid }
      }
      const best = Math.max(MIN_FIT, lo * EASE)
      if (!group) { fits(best); return }
      let g = groups.get(group)
      if (!g) { g = new Map(); groups.set(group, g) }
      g.set(el, { best, apply: (f) => el.style.setProperty('--fit', String(f)) })
      settle(group)
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit) }
    schedule()
    const ro = new ResizeObserver(schedule)
    ro.observe(el)
    el.addEventListener('load', schedule, true)
    document.fonts?.ready.then(schedule).catch(() => undefined)
    return () => {
      cancelAnimationFrame(frame); ro.disconnect(); el.removeEventListener('load', schedule, true)
      if (group) { groups.get(group)?.delete(el); settle(group) }
    }
  }, [group])

  return <div ref={ref} className={className}>{children}</div>
}
