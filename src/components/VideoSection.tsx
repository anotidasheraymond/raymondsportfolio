/* eslint-disable @next/next/no-img-element */
// Third-party YouTube thumbnails — served unoptimized on purpose.
import { FILMS, REELS } from '@/lib/content'
import Reveal from './Reveal'

export default function VideoSection() {
  return (
    <>
      <Reveal>
        <div className="work-head">
          <div>
            <div className="eyebrow">02 · Video</div>
            <h2 className="h2">Motion</h2>
          </div>
          <p className="prose">
            Scripted, edited and animated in Premiere Pro and After Effects. Everything here ran on
            owned channels.
          </p>
        </div>
      </Reveal>

      <div className="vidgrid">
        {FILMS.map((f) => (
          <a
            key={f.yid}
            className="vidcard"
            href={f.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="vidthumb">
              <img
                src={`https://img.youtube.com/vi/${f.yid}/hqdefault.jpg`}
                alt={`${f.label} video thumbnail`}
                loading="lazy"
              />
              <span className="play" aria-hidden="true" />
            </div>
            <div className="vidcap">
              <span>{f.label}</span>
              <span>{f.meta}</span>
            </div>
          </a>
        ))}
      </div>

      <h3 className="list-h" style={{ marginTop: 'clamp(30px,4vw,46px)' }}>
        Instagram reels
      </h3>
      <div className="reels">
        {REELS.map((r) => (
          <a key={r.href} className="reel" href={r.href} target="_blank" rel="noopener noreferrer">
            <span className="reel-mark" aria-hidden="true" />
            <span className="reel-handle">{r.handle}</span>
            <span className="reel-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
    </>
  )
}
