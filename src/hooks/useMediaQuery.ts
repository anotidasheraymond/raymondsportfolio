'use client'

import { useSyncExternalStore } from 'react'

/**
 * Subscribes to a media query. Returns false during SSR and the first client
 * render, so markup matches and no cascading setState is needed.
 */
export function useMediaQuery(query: string) {
  const subscribe = (onChange: () => void) => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {}
    const mql = window.matchMedia(query)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }

  const getSnapshot = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
    return window.matchMedia(query).matches
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
