'use client'

import { useReveal } from '@/hooks/useReveal'

/**
 * The rail is absolutely positioned against .timeline, so the reveal has to sit
 * on the element itself — a transformed wrapper would become its containing
 * block and collapse it to zero height.
 */
export default function TimelineRail() {
  const ref = useReveal<HTMLSpanElement>(0.02)

  return <span className="timeline-rail" data-reveal="rail" ref={ref} aria-hidden="true" />
}
