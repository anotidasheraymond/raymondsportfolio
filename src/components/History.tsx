import { ROLES, EDUCATION } from '@/lib/content'
import Reveal from './Reveal'
import TimelineRail from './TimelineRail'

export default function History() {
  return (
    <>
      <Reveal>
        <div className="eyebrow">05 · History</div>
        <h2 className="h2">Experience</h2>
      </Reveal>

      <div className="timeline" style={{ marginTop: 'clamp(22px,3vw,34px)' }}>
        <TimelineRail />
        {ROLES.map((r) => (
          <Reveal key={r.title + r.dates}>
            <div className="exp">
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
          </Reveal>
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
