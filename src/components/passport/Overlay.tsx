'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { STUDIES } from '@/lib/content'

export type OverlayState =
  | { kind: 'image'; src: string; caption: string }
  | { kind: 'study'; id: string }
  | { kind: 'video'; src: string; poster: string; caption: string }
  | null

export default function Overlay({ state, onClose }: { state: OverlayState; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!state) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); prev?.focus() }
  }, [state, onClose])

  if (!state) return null

  if (state.kind === 'video') {
    return (
      <div className="pp-overlay" role="dialog" aria-modal="true" aria-label={state.caption} onClick={onClose}>
        <figure className="pp-lightbox pp-videobox" onClick={(e) => e.stopPropagation()}>
          <video src={state.src} poster={state.poster} controls autoPlay playsInline preload="metadata" />
          <figcaption>{state.caption}</figcaption>
        </figure>
        <button ref={closeRef} className="pp-close" onClick={onClose} aria-label="Close">×</button>
      </div>
    )
  }

  if (state.kind === 'image') {
    return (
      <div className="pp-overlay" role="dialog" aria-modal="true" aria-label={state.caption} onClick={onClose}>
        <figure className="pp-lightbox" onClick={(e) => e.stopPropagation()}>
          <Image src={state.src} alt={state.caption} width={1080} height={1080} sizes="(max-width: 760px) 92vw, 70vh" style={{ width: '100%', height: 'auto' }} />
          <figcaption>{state.caption}</figcaption>
        </figure>
        <button ref={closeRef} className="pp-close" onClick={onClose} aria-label="Close">×</button>
      </div>
    )
  }

  const s = STUDIES.find((x) => x.id === state.id)
  if (!s) return null
  return (
    <div className="pp-overlay" role="dialog" aria-modal="true" aria-labelledby="pp-dossier-title" onClick={onClose}>
      <article className="pp-dossier" onClick={(e) => e.stopPropagation()}>
        <div className="pp-guilloche" aria-hidden="true" />
        <header className="pp-dossier-head">
          <div className="pp-label">Case file · {s.label}</div>
          <h2 id="pp-dossier-title">{s.title}</h2>
          <p className="pp-dossier-sub">{s.sub}</p>
          <dl className="pp-dossier-meta">
            {s.meta.map((m) => (
              <div key={m.k}><dt className="pp-label">{m.k}</dt><dd>{m.v}</dd></div>
            ))}
          </dl>
        </header>

        <div className="pp-dossier-imgs">
          {s.images.map((im) => (
            <figure key={im.src}>
              <Image src={im.src} alt={im.caption} width={800} height={800} sizes="(max-width: 760px) 44vw, 320px" style={{ width: '100%', height: 'auto' }} />
              <figcaption className="pp-label">{im.caption} · {im.year}</figcaption>
            </figure>
          ))}
        </div>

        {s.stats && (
          <div className="pp-dossier-stats">
            {s.stats.map((st) => (
              <div key={st.platform}><b>{st.score}</b><span>{st.platform}</span><em>{st.volume}</em></div>
            ))}
            {s.statsNote && <p className="pp-label">{s.statsNote}</p>}
          </div>
        )}

        <div className="pp-dossier-flow">
          <div className="pp-label">{s.figLabel}</div>
          <ol>
            {s.flow.map((f) => <li key={f.n}><span>{f.n}</span>{f.label}</li>)}
          </ol>
          <p className="pp-label">{s.figNote}</p>
        </div>

        {s.panels.map((p) => (
          <section key={p.label} className="pp-dossier-panel">
            <h3 className="pp-label">{p.label}</h3>
            <p className="pp-dossier-lede">{p.lede}</p>
            {p.groups.map((g, i) => (
              <div key={i}>
                {g.label && <h4>{g.label}</h4>}
                {g.label ? (
                  <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
                ) : (
                  g.items.map((it) => <p key={it}>{it}</p>)
                )}
              </div>
            ))}
            {p.close && <p className="pp-dossier-close">{p.close}</p>}
          </section>
        ))}

        {s.links.length > 0 && (
          <div className="pp-dossier-links">
            <div className="pp-label">Reference</div>
            {s.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
          </div>
        )}

        <div className="pp-dossier-skills">
          {s.skills.map((k) => <span key={k}>{k}</span>)}
        </div>
      </article>
      <button ref={closeRef} className="pp-close" onClick={onClose} aria-label="Close case file">×</button>
    </div>
  )
}
