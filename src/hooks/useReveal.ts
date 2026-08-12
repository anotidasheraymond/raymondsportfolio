'use client'

import { useEffect, useRef } from 'react'

/**
 * Flips data-visible="true" on the element the first time it scrolls into view.
 * Stands in for `animation-timeline: view()`, which is not universally supported.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.visible = 'true'
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          ;(entry.target as HTMLElement).dataset.visible = 'true'
          io.unobserve(entry.target)
        })
      },
      { threshold },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}
