import type { CSSProperties } from 'react'
import { LETTERING } from './coin-lettering'

/** One of the coin's Kenyan Coffee words, as static artwork sized by its cap height. */
export default function Word({ word, height, color = 'currentColor', style }: { word: keyof typeof LETTERING; height: number | string; color?: string; style?: CSSProperties }) {
  const { viewBox: [x, y, w, h], d } = LETTERING[word]
  return (
    <svg
      viewBox={`${x} ${y} ${w} ${h}`}
      aria-hidden="true"
      style={{ display: 'block', height, width: 'auto', aspectRatio: `${w} / ${h}`, overflow: 'visible', ...style }}
    >
      <path d={d} fill={color} />
    </svg>
  )
}

/** The same word placed inside another SVG, centred on (cx, baseline). */
export function WordInSvg({ word, cx, baseline, cap, fill = 'currentColor' }: { word: keyof typeof LETTERING; cx: number; baseline: number; cap: number; fill?: string }) {
  const { viewBox: [x, y, w, h], d } = LETTERING[word]
  const width = (cap * w) / h
  return (
    <svg x={cx - width / 2} y={baseline - cap} width={width} height={cap} viewBox={`${x} ${y} ${w} ${h}`} overflow="visible">
      <path d={d} fill={fill} />
    </svg>
  )
}
