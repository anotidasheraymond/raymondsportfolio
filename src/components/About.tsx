import Image from 'next/image'
import { ABOUT_PARAGRAPHS, PAST_EXPERIENCE, PRESENT_SKILLS, CAPS } from '@/lib/content'
import Reveal from './Reveal'

export default function About() {
  return (
    <>
      <div className="g2">
        <Reveal>
          <div className="eyebrow">04 · About</div>
          <h2 className="h2">Who I am</h2>
          {ABOUT_PARAGRAPHS.map((p) => (
            <p
              key={p}
              className="prose"
              style={{ fontSize: 'clamp(17px,1.7vw,20px)', lineHeight: 1.6, color: 'var(--tx)', maxWidth: '62ch', marginTop: 18 }}
            >
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal variant="pop">
          <div className="about-portrait">
            <Image
              src="/img/u26.png"
              alt="Raymond Chizanga"
              fill
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </div>
          <div className="about-cap">
            <span>Mississauga, ON</span>
            <span>2026</span>
          </div>
        </Reveal>
      </div>

      <div className="g2" style={{ marginTop: 'clamp(30px,4.5vw,54px)' }}>
        <Reveal>
          <h3 className="list-h">Past experience</h3>
          <div className="list-body">
            {PAST_EXPERIENCE.map((p) => (
              <p className="prose" key={p}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <h3 className="list-h">Present-day skills</h3>
          <div className="list-body">
            {PRESENT_SKILLS.map((p) => (
              <p className="prose" key={p}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      <div style={{ marginTop: 'clamp(30px,4.5vw,54px)' }}>
        <h3 className="list-h">Capabilities</h3>
        <div className="chipset">
          {CAPS.map((c) => (
            <span className="chip" key={c}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
