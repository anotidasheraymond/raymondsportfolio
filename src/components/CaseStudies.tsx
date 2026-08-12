'use client'

import Image from 'next/image'
import { useState } from 'react'
import { STUDIES } from '@/lib/content'
import Reveal from './Reveal'

export default function CaseStudies() {
  const [studyIndex, setStudyIndex] = useState(0)
  const [tab, setTab] = useState(0)

  const study = STUDIES[studyIndex]
  const activeTab = Math.min(tab, study.panels.length - 1)
  const panel = study.panels[activeTab]

  return (
    <>
      <Reveal>
        <div className="eyebrow">03 · Case studies</div>
      </Reveal>

      <div className="casesw" role="tablist" aria-label="Case studies" style={{ marginTop: 16 }}>
        {STUDIES.map((st, i) => (
          <button
            key={st.id}
            type="button"
            role="tab"
            aria-selected={studyIndex === i}
            className="casebtn"
            onClick={() => {
              setStudyIndex(i)
              setTab(0)
            }}
          >
            <span className="casebtn-n">{`0${i + 1}`}</span>
            <span className="casebtn-l">{st.label}</span>
          </button>
        ))}
      </div>

      <h2 className="case-h2">{study.title}</h2>
      <p className="case-sub">{study.sub}</p>

      <div className="metastrip">
        {study.meta.map((m) => (
          <div key={m.k}>
            <div className="meta-label">{m.k}</div>
            <div className="meta-value">{m.v}</div>
          </div>
        ))}
      </div>

      <div className="case-imgs">
        {study.images.map((img) => (
          <figure key={img.src} style={{ aspectRatio: img.ratio }}>
            <Image
              src={img.src}
              alt={img.caption}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <figcaption>
              <span>{img.caption}</span>
              <span>{img.year}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {study.hasRatings && study.stats && (
        <>
          <div className="statgrid">
            {study.stats.map((s) => (
              <div className="statcell" key={s.platform}>
                <div className="statcell-l">{s.platform}</div>
                <div className="statcell-v">{s.score}</div>
                <div className="statcell-d">{s.volume}</div>
              </div>
            ))}
          </div>
          {study.statsNote && <div className="statnote">{study.statsNote}</div>}
        </>
      )}

      <div className="case-tabs" role="tablist" aria-label="Case study sections">
        {study.panels.map((p, i) => (
          <button
            key={p.label}
            type="button"
            role="tab"
            aria-selected={activeTab === i}
            className="pill"
            onClick={() => setTab(i)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="case-body">
        <div>
          <p className="panel-lede">{panel.lede}</p>
          {panel.groups.map((g, gi) => (
            <div className="panel-group" key={g.label || gi}>
              {g.label && <div className="panel-group-label">{g.label}</div>}
              <div className="panel-items">
                {g.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          ))}
          {panel.close && <p className="panel-close">{panel.close}</p>}
        </div>

        <aside className="case-fig">
          <div className="figpanel">
            <div className="fighead">
              <span>Fig. 01 — the mechanism</span>
              <span>{study.figLabel}</span>
            </div>
            <div className="flow">
              {study.flow.map((f, i) => (
                <div className="flow-item" key={f.n}>
                  <div className="flow-mark">
                    <span className="flow-n">{f.n}</span>
                    <span
                      className="flow-rail"
                      style={{
                        background: i === study.flow.length - 1 ? 'transparent' : 'var(--hair-2)',
                      }}
                    />
                  </div>
                  <div className="flow-label">{f.label}</div>
                </div>
              ))}
            </div>
            <div className="fignote">{study.figNote}</div>
          </div>

          {study.hasLinks && study.links.length > 0 && (
            <div className="reflist">
              <div className="reflist-h">Reference</div>
              {study.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </aside>
      </div>

      <div className="skills">
        <h3 className="skills-h">Skills demonstrated</h3>
        <div className="chipset">
          {study.skills.map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
