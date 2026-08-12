'use client'

import { useEffect, useState } from 'react'
import { NAV, CONTACT } from '@/lib/content'

export default function Nav() {
  const [active, setActive] = useState('work')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (seen.length) setActive(seen[0].target.id)
      },
      { rootMargin: '-12% 0px -70% 0px' },
    )

    NAV.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })

    return () => io.disconnect()
  }, [])

  return (
    <div className="nav">
      <div className="nav-inner">
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--tx)' }}>
          <span className="nav-badge">RC</span>
          <span className="brandword">Raymond Chizanga</span>
        </a>

        <nav className="navlinks" aria-label="Sections">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="navlink"
              aria-current={active === n.id ? 'true' : undefined}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a className="nav-resume" href={CONTACT.resume} download="Raymond-Chizanga-Resume-2026.pdf">
          Resume
        </a>
      </div>
    </div>
  )
}
