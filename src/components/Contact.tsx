'use client'

import { useEffect, useRef, useState } from 'react'
import { CONTACT, BEST_FIT, AVAILABILITY_NOTE } from '@/lib/content'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const copyEmail = () => {
    // The label flips either way — a rejected or missing clipboard API must not swallow it.
    const done = () => {
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    }
    if (navigator.clipboard) navigator.clipboard.writeText(CONTACT.email).then(done, done)
    else done()
  }

  return (
    <div className="wrap" style={{ padding: 'clamp(48px,7vw,88px) clamp(18px,4vw,44px)' }}>
      <div className="eyebrow">06 · Contact</div>
      <h2 className="contact-h2">
        Let&rsquo;s work
        <br />
        <span>together</span>
      </h2>

      <div className="contact-grid">
        <div>
          <p className="prose" style={{ fontSize: 17, maxWidth: '46ch' }}>
            {AVAILABILITY_NOTE}
          </p>

          <div className="btnrow">
            <button type="button" className="btn btn-fill" onClick={copyEmail}>
              {copied ? 'Copied ✓' : 'Copy email address'}
            </button>
            <a className="btn btn-out" href={CONTACT.resume} download="Raymond-Chizanga-Resume-2026.pdf">
              Download resume
            </a>
          </div>

          <div className="contact-lines">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <span style={{ color: 'var(--tx-3)' }}>{CONTACT.location}</span>
          </div>
        </div>

        <div>
          <h3 className="list-h" style={{ color: 'var(--tx-3)', borderColor: 'var(--hair)' }}>
            Best fit
          </h3>
          <div className="list-body">
            {BEST_FIT.map((b) => (
              <p className="prose" key={b}>
                {b}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="footer">
        <span>Raymond Chizanga · Integrated marketing</span>
        <span>2026 portfolio · Ed. 03</span>
        <span>Mississauga, ON · Canada</span>
      </div>
    </div>
  )
}
