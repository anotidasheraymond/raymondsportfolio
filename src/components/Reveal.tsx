'use client'

import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

type Props = {
  children: ReactNode
  /** 'rise' (default) · 'pop' · 'rail' — matches the reference's riseIn / popIn / drawY */
  variant?: 'rise' | 'pop' | 'rail'
  className?: string
}

/** Wraps content so it animates in once, the first time it enters the viewport. */
export default function Reveal({ children, variant = 'rise', className }: Props) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} data-reveal={variant === 'rise' ? '' : variant} className={className}>
      {children}
    </div>
  )
}
