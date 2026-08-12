'use client'

import { ROLES, EDUCATION } from '@/lib/content'
import { useReveal } from '@/hooks/useReveal'

export default function History() {
  const railRef = useReveal<HTMLSpanElement>(0.05)

  return (
    <>
      <div>
        <div className="eyebrow">05 · History</div>
        <h2 className="h2">Experience</h2>
      </div>

      <div className="timeline" style={{ marginTop: 'clamp(22px,3vw,34px)' }}>
        <span className="timeline-rail" data-reveal-rail ref={railRef} aria-hidden="true" />
        {ROLES.map((r) => (
          <div className="exp" key={r.title + r.dates}>
            <div>
              <div className="exp-dates">{r.dates}</div>
              <div className="exp-span">{r.span}</div>
            </div>
            <div>
              <h3 className="exp-title">{r.title}</h3>
              <div className="exp-org">{r.org}</div>
              <div className="exp-bullets">
                {r.bullets.map((b) => (
                  <p className="prose" key={b} style={{ fontSize: 15.5 }}>
                    {b}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="edu">
        {EDUCATION.map((e) => (
          <div key={e.k}>
            <div className="meta-label">{e.k}</div>
            <div className="meta-value">{e.v}</div>
          </div>
        ))}
      </div>
    </>
  )
}
