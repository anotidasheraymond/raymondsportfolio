'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import GlitchCoin from './GlitchCoin'
import PetworkingWordmark from './PetworkingWordmark'
import Word from './Lettering'
import { VisaPage, Paper, type Side, type Opener } from './Pages'
import { VENTURES } from '@/lib/passport'
import { WORKS } from '@/lib/content'

// Founder visas: one per venture, each with its own Stamp Studio stamp and an annex page.
// The Hoard's glitch coin and the D.U.C.K duck mount only while their page is open.

const DuckModel = dynamic(() => import('./DuckModel'), { ssr: false })

const venture = (id: string) => VENTURES.find((v) => v.id === id)!

function Links({ links }: { links: { label: string; href: string }[] }) {
  if (!links.length) return null
  return (
    <div className="pp-vlinks">
      {links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
    </div>
  )
}

function Chips({ chips }: { chips: { k: string; v: string }[] }) {
  return <div className="pp-chips">{chips.map((c) => <span key={c.k}><b>{c.k}</b> {c.v}</span>)}</div>
}

export function VentureVisa({ id, side, folio, active }: { id: string; side: Side; folio: number; active: boolean }) {
  const v = venture(id)
  return (
    <VisaPage visa={v} side={side} folio={folio} active={active}>
      <Links links={v.links} />
    </VisaPage>
  )
}

export function DoghairAnnex({ side, folio }: { side: Side; folio: number }) {
  const v = venture('doghair')
  const rows = [
    { label: 'Petworking', sub: 'Founder & CEO · pet care network, in beta in five countries' },
    { label: 'The Hoard', sub: 'Founder · fan network, live on web and the App Store' },
    { label: 'D.U.C.K AI', sub: 'On-device language model · in development' },
    { label: 'Durham FCC', sub: 'Client · Senior Marketing Consultant engagement' },
  ]
  return (
    <Paper side={side} folio={folio} head={['Endorsement · Founder', 'DOGHAIR']} className="pp-annex pp-venture pp-venture-doghair">
      <div className="pp-dh-mark">
        <Image src="/img/ventures/doghair-diamond.webp" alt="DOGHAIR Technologies diamond mark" width={480} height={391} />
      </div>
      <div className="pp-annex-title">
        <h3>Makers of Petworking and The Hoard.</h3>
        <p>{v.chips[0].v}.</p>
      </div>
      <div className="pp-label">The portfolio</div>
      <ul className="pp-dh-list">
        {rows.map((r) => (
          <li key={r.label}><b>{r.label}</b><span>{r.sub}</span></li>
        ))}
      </ul>
      <Chips chips={v.chips.slice(1)} />
    </Paper>
  )
}

export function PetworkingAnnex({ side, folio }: { side: Side; folio: number }) {
  const v = venture('petworking')
  return (
    <Paper side={side} folio={folio} head={['Endorsement · Founder', 'Petworking']} className="pp-annex pp-venture pp-venture-petworking">
      <div className="pp-pw-mark"><PetworkingWordmark size={72} style={{ fontSize: 'min(72px, 13cqw)' }} /></div>
      <p className="pp-venture-lede">The Pet Passport this whole site is styled after, and the Stamp Studio that cut every stamp in it, are Petworking’s.</p>
      <div className="pp-rule" />
      <div className="pp-label">Modules</div>
      <ul className="pp-remarks">{v.chips[0].v.split(' · ').map((m) => <li key={m}>{m}</li>)}</ul>
      <Chips chips={v.chips.slice(1)} />
    </Paper>
  )
}

/** The coin is sized in pixels, so it follows its slot's width. */
function HoardCoin({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setSize(Math.round(e.contentRect.width * 0.72)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} className="pp-model pp-model-coin">
      {active && size > 0 && <GlitchCoin size={size} year="2026" face="hoard" />}
    </div>
  )
}

export function HoardAnnex({ side, folio, active, open }: { side: Side; folio: number; active: boolean; open: Opener }) {
  const w = WORKS.find((x) => x.id === 'hoard')!
  const shots = (w.shots ?? []).slice(0, 4)
  return (
    <Paper side={side} folio={folio} head={['Endorsement · Founder', 'The Hoard']} className="pp-annex pp-venture pp-venture-hoard">
      <div className="pp-annex-title">
        <h3 aria-label="The founding coin"><Word word="THE FOUNDING COIN" height="0.74em" /></h3>
      </div>
      <div className="pp-hoard-hero">
        <HoardCoin active={active} />
        <p className="pp-venture-lede">The glitch coin from thehoard.social, the same one that opens this site: holo foil, scanlines, chromatic glitch and a reeded edge. Drag it to spin.</p>
      </div>
      <div className="pp-phones">
        {shots.map((s) => (
          <button key={s.src} className="pp-phone" onClick={() => open.openImage(s.src, `The Hoard · ${s.caption}`)} aria-label={`View ${s.caption}`}>
            <Image src={s.src} alt={s.caption} fill sizes="(max-width: 760px) 22vw, 90px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
          </button>
        ))}
      </div>
      <Chips chips={venture('hoard').chips} />
    </Paper>
  )
}

export function DuckAnnex({ side, folio, active }: { side: Side; folio: number; active: boolean }) {
  const v = venture('duck')
  return (
    <Paper side={side} folio={folio} head={['Endorsement · Founder', 'D.U.C.K AI']} className="pp-annex pp-venture pp-venture-duck">
      <div className="pp-model pp-model-duck">
        {active && <DuckModel label="The D.U.C.K mascot, live 3D render" />}
      </div>
      <div className="pp-annex-title">
        <h3>Deterministic Uptake Computation Kicker.</h3>
        <p>The mascot as the D.U.C.K app renders it: Naples Yellow, three-light rig, idling on its own animation. The engine underneath answers on your machine, not a server.</p>
      </div>
      <Chips chips={v.chips} />
      <p className="pp-credit">3D duck: “Duck baby – animated low poly” by WildPoly3D, CC BY 4.0.</p>
    </Paper>
  )
}
