import { HERO_LEDE, OPTIONS } from '@/lib/content'

export default function Hero() {
  return (
    <div className="wrap hero">
      <div className="hero-eyebrow">
        <span className="hero-rule" aria-hidden="true" />
        <span>Portfolio · 2026 · Ed. 03</span>
      </div>

      <h1 className="hero-name">
        <span>Raymond</span>
        <span style={{ color: 'var(--acc)' }}>Chizanga</span>
      </h1>

      <div className="hero-grid">
        <p className="hero-lede">{HERO_LEDE}</p>
        <div>
          <div className="hero-role">
            Integrated marketing lead
            <br />
            <span style={{ color: 'var(--tx-3)' }}>The full-stack generalist</span>
          </div>
          <div className="avail">
            <span className="avail-dot" aria-hidden="true" />
            {OPTIONS.availability}
          </div>
        </div>
      </div>
    </div>
  )
}
