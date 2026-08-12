import Image from 'next/image'
import { HERO_STRIP } from '@/lib/content'

export default function HeroStrip() {
  return (
    <div className="wrap">
      <div className="hstrip">
        {HERO_STRIP.map((h) => (
          <figure key={h.src + h.caption}>
            <Image
              src={h.src}
              alt={h.caption}
              fill
              priority
              sizes="(max-width: 900px) 50vw, 25vw"
            />
            <figcaption>
              <span>{h.caption}</span>
              <span>{h.year}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
