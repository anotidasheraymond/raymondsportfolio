'use client'

import Image from 'next/image'
import { useEffect, useImperativeHandle, useRef, type RefObject } from 'react'
import { WORKS } from '@/lib/content'

export type PeekHandle = { show: (id: string) => void; hide: () => void }

const peeks = WORKS.filter((w) => w.peek).map((w) => ({
  id: w.id,
  src: w.peek!.src,
  ratio: w.peek!.ratio,
  caption: w.peek!.caption,
  year: w.year,
}))

export default function CursorPeek({ ref }: { ref: RefObject<PeekHandle | null> }) {
  const el = useRef<HTMLDivElement>(null)
  const activeId = useRef<string | null>(null)

  useImperativeHandle(ref, () => ({
    show(id: string) {
      activeId.current = id
      const node = el.current
      if (!node) return
      node.querySelectorAll<HTMLElement>('[data-peek]').forEach((n) => {
        n.style.display = n.dataset.peek === id ? 'block' : 'none'
      })
      node.style.opacity = '1'
    },
    hide() {
      activeId.current = null
      if (el.current) el.current.style.opacity = '0'
    },
  }))

  useEffect(() => {
    // Transform is written straight to the node — never through React state.
    const onMove = (e: PointerEvent) => {
      const node = el.current
      if (!node || !activeId.current) return
      node.style.transform = `translate3d(${e.clientX + 24}px,${e.clientY - 110}px,0) scale(1)`
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="peek" ref={el} aria-hidden="true">
      {peeks.map((p) => (
        <div key={p.id} data-peek={p.id} style={{ display: 'none' }}>
          <div className="peek-img" style={{ aspectRatio: p.ratio }}>
            <Image src={p.src} alt="" width={250} height={250} sizes="250px" />
          </div>
          <div className="peek-cap">
            <span>{p.caption}</span>
            <span>{p.year}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
