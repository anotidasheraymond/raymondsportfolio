// Server component — paints on the first frame and needs no JS.
// The CSS end-state parks it off-screen with `forwards`.
export default function IntroCurtain() {
  return (
    <div className="curtain" aria-hidden="true">
      <div style={{ padding: '0 clamp(18px,4vw,44px)', width: '100%', maxWidth: 1180 }}>
        <div className="curtain-eyebrow">Portfolio · 2026</div>
        <div className="curtain-name">
          <span>Raymond</span>
          <span style={{ color: 'var(--acc)' }}>Chizanga</span>
        </div>
        <div className="curtain-rule" />
      </div>
    </div>
  )
}
