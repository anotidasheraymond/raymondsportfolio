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
import { HOARD_SITE, PW_SITE, type SiteSlide } from '@/lib/ventureSites'
import SiteCarousel from './SiteCarousel'

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
      <div className="pp-pw-mark"><PetworkingWordmark size={72} style={{ fontSize: '15.2cqw' }} /></div>
      <p className="pp-venture-lede">The Pet Passport this whole site is styled after, and the Stamp Studio that cut every stamp in it, are Petworking’s.</p>
      <div>
        <div className="pp-label">Modules</div>
        <ul className="pp-remarks">{v.chips[0].v.split(' · ').map((m) => <li key={m}>{m}</li>)}</ul>
      </div>
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

/* ---------- live platforms and the build behind them ---------- */

function ScreensPage({ side, folio, open, name, site, slides, lede }: { side: Side; folio: number; open: Opener; name: string; site: string; slides: SiteSlide[]; lede: string }) {
  return (
    <Paper side={side} folio={folio} head={['Annex · Live platform', name]} className="pp-annex pp-screens">
      <div className="pp-annex-title">
        <h3>{site}</h3>
        <p>{lede}</p>
      </div>
      <SiteCarousel slides={slides} site={site} onOpen={open.openImage} />
    </Paper>
  )
}

type Build = {
  name: string
  title: string
  lede: string
  design: { k: string; v: string }[]
  stats: { n: string; k: string }[]
  engineering: string
  stack: string
}

function BuildPage({ side, folio, b }: { side: Side; folio: number; b: Build }) {
  return (
    <Paper side={side} folio={folio} head={['Annex · Design & build', b.name]} className="pp-annex pp-build">
      <div className="pp-annex-title">
        <h3>{b.title}</h3>
        <p>{b.lede}</p>
      </div>
      <div className="pp-label">Designed by Raymond</div>
      <dl className="pp-build-design">
        {b.design.map((d) => (
          <div key={d.k}><dt>{d.k}</dt><dd>{d.v}</dd></div>
        ))}
      </dl>
      <div className="pp-label">Under the hood</div>
      <div className="pp-build-stats">
        {b.stats.map((s) => (
          <div key={s.k}><b>{s.n}</b><span>{s.k}</span></div>
        ))}
      </div>
      <p className="pp-build-eng">{b.engineering}</p>
      <div className="pp-chips"><span><b>Stack</b> {b.stack}</span></div>
    </Paper>
  )
}

const PW_BUILD: Build = {
  name: 'Petworking',
  title: 'Designed and engineered solo.',
  lede: 'Brand, product design and engineering for every surface of Petworking: one designer, one engineer, the same person.',
  design: [
    { k: 'Assets', v: 'The heart wordmark, app icon, Pet Passport and every stamp the Stamp Studio cuts.' },
    { k: 'UI', v: 'Every screen on iPhone, iPad, Apple Watch, Android and the web platform.' },
    { k: 'UX', v: 'Flows for pet parents, professionals, businesses and rescues: records, bookings, marketplace, checkout and payouts.' },
  ],
  stats: [
    { n: '2,004', k: 'commits since Aug 27, 2026' },
    { n: '687', k: 'database migrations' },
    { n: '281', k: 'web routes' },
    { n: '20', k: 'server functions' },
  ],
  engineering: 'One Expo codebase ships five surfaces. The web platform runs on Next.js and Supabase with row-level security by default, and Stripe handles checkout, payouts, subscriptions, refunds and shipping. In beta in five countries.',
  stack: 'Expo · React Native · Next.js · Supabase · Stripe',
}

const HOARD_BUILD: Build = {
  name: 'The Hoard',
  title: 'Designed and engineered solo.',
  lede: 'Concept, brand, product design and engineering for The Hoard, from architecture to App Store release.',
  design: [
    { k: 'Assets', v: 'The glitch coin, the Founding coins, the lettering and the marks for Gideon, Nyami Nyami and Rooms.' },
    { k: 'UI', v: 'Every screen on the web, iPhone, iPad and Android, designed in Figma and in code.' },
    { k: 'UX', v: 'The Vault, Rooms, the marketplace, Gideon Scan and a hand-built pricing tool.' },
  ],
  stats: [
    { n: '252', k: 'web routes' },
    { n: '824', k: 'database migrations' },
    { n: '26', k: 'server functions' },
    { n: '100%', k: 'tables under row-level security' },
  ],
  engineering: 'Next.js on the web with Stripe and Sentry, Expo apps for iPhone, iPad and Android, Supabase underneath, and Gideon, a self-hosted visual identification service on Python inference. Launch audit: zero critical or high findings.',
  stack: 'Next.js · Expo · Supabase · Stripe · Sentry · Python',
}

export const PetworkingScreens = (p: { side: Side; folio: number; open: Opener }) => (
  <ScreensPage {...p} name="Petworking" site="petworking.pet" slides={PW_SITE} lede="The live web platform, captured from production. Tap a page to see it full screen." />
)
export const PetworkingBuild = (p: { side: Side; folio: number }) => <BuildPage {...p} b={PW_BUILD} />
export const HoardScreens = (p: { side: Side; folio: number; open: Opener }) => (
  <ScreensPage {...p} name="The Hoard" site="thehoard.social" slides={HOARD_SITE} lede="The live web platform, captured from production. Tap a page to see it full screen." />
)
export const HoardBuild = (p: { side: Side; folio: number }) => <BuildPage {...p} b={HOARD_BUILD} />
