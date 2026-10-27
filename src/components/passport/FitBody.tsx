'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

const MIN_FIT = 0.75
const MAX_FIT = 1.45
const EASE = 0.985

/**
 * A page body that fills its paper. It finds the largest scale (0.75 to 1.45) at which the content
 * fits without overflowing, so a sparse page grows into its space and a full one shrinks rather than clips, and applies it as --fit, which passport.css uses as `zoom` on the body's
 * content blocks. Refits when the page resizes or an image inside it finishes loading.
 */
export default function FitBody({ className, children }: { className: string; children: ReactNode }) {
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
      fits(Math.max(MIN_FIT, lo * EASE))
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit) }
    schedule()
    const ro = new ResizeObserver(schedule)
    ro.observe(el)
    el.addEventListener('load', schedule, true)
    document.fonts?.ready.then(schedule).catch(() => undefined)
    return () => { cancelAnimationFrame(frame); ro.disconnect(); el.removeEventListener('load', schedule, true) }
  }, [])

  return <div ref={ref} className={className}>{children}</div>
}
