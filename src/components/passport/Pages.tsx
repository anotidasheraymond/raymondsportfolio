import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import Stamp from './Stamp'
import {
  IDENTITY, VISAS, EARLIER, EDUCATION_LINE, PROJECT_LINE, SKILL_GROUPS, EXTRA_SHOTS, DFCC_BEFORE_AFTER, LINKEDIN, mrz,
  type Visa,
} from '@/lib/passport'
import { WORKS, STATS, STUDIES, FILMS, REELS, CONTACT, BEST_FIT } from '@/lib/content'

export type Side = 'left' | 'right'
export type Opener = { openImage: (src: string, caption: string) => void; openStudy: (id: string) => void }

/* ---------- shared pieces ---------- */

function Paper({ side, head, folio, children, className = '', mrzLines }: { side: Side; head: [string, string]; folio: number; children: ReactNode; className?: string; mrzLines?: string[] }) {
  return (
    <div className={`pp-paper pp-${side} ${className}`}>
      <div className="pp-guilloche" aria-hidden="true" />
      <div className="pp-gutter" aria-hidden="true" />
      <div className="pp-head">
        <span>{head[0]}</span>
        <span>{head[1]}</span>
      </div>
      <div className={`pp-body${mrzLines ? ' has-mrz' : ''}`}>{children}</div>
      {mrzLines && <Mrz lines={mrzLines} />}
      <div className="pp-folio" aria-hidden="true">{String(folio).padStart(2, '0')}</div>
    </div>
  )
}

function Field({ k, v, mono }: { k: string; v: ReactNode; mono?: boolean }) {
  return (
    <div className="pp-field">
      <div className="pp-label">{k}</div>
      <div className={`pp-value${mono ? ' is-mono' : ''}`}>{v}</div>
    </div>
  )
}

function Mrz({ lines }: { lines: string[] }) {
  return (
    <div className="pp-mrz" aria-hidden="true">
      <div className="pp-micro">{'RAYMOND·CHIZANGA·'.repeat(12)}</div>
      {lines.map((l, i) => <div key={i}>{mrz(l)}</div>)}
    </div>
  )
}

/* ---------- cover & endpapers ---------- */

export function Cover() {
  return (
    <div className="pp-cover">
      <div className="pp-cover-spine" aria-hidden="true" />
      <div className="pp-cover-thread" aria-hidden="true" />
      <div className="pp-cover-frame" aria-hidden="true" />
      <div className="pp-cover-inner">
        <div className="pp-cover-top">
          <div className="pp-cover-name">Raymond<br />Chizanga</div>
          <div className="pp-cover-word">Passport<br />Passeport</div>
        </div>
        <div className="pp-crest" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="1.4 4.2" />
            <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <text x="100" y="124" textAnchor="middle" fontFamily="var(--pp-coin), sans-serif" fontWeight="700" fontSize="74" fill="currentColor" letterSpacing="2">RC</text>
            <text x="100" y="150" textAnchor="middle" fontFamily="var(--pp-mono), monospace" fontWeight="600" fontSize="10" fill="currentColor" letterSpacing="4">PORTFOLIO</text>
            <text x="100" y="62" textAnchor="middle" fontFamily="var(--pp-mono), monospace" fontWeight="600" fontSize="10" fill="currentColor" letterSpacing="4">· 2026 ·</text>
          </svg>
        </div>
        <div className="pp-cover-bottom">
          <div className="pp-cover-mark">Integrated Marketing</div>
          <div className="pp-icao" aria-hidden="true"><i /><i /><b /></div>
        </div>
      </div>
    </div>
  )
}

export function Endpaper({ side }: { side: Side }) {
  return (
    <div className={`pp-endpaper pp-${side}`} aria-hidden="true">
      <div className="pp-endpaper-mark">RC</div>
    </div>
  )
}

/* ---------- 01 identity ---------- */

export function IdentityPage({ side, folio }: { side: Side; folio: number }) {
  return (
    <Paper side={side} folio={folio} head={['Portfolio passport', `Code ${IDENTITY.code}`]} className="pp-identity" mrzLines={['PF<RCPCHIZANGA<<RAYMOND', 'MKTG2026<<BRAND<COMMUNITY<<SAAS<ECOMMERCE', 'RCCHIZANGA<GMAIL<COM<<MISSISSAUGA<ON<<<<<7']}>
      <div className="pp-id-top">
        <div>
          <div className="pp-label">Surname / Nom · Given names / Prénoms</div>
          <h1 className="pp-name">{IDENTITY.given} {IDENTITY.surname}</h1>
          <div className="pp-sub">{IDENTITY.line}</div>
        </div>
      </div>
      <div className="pp-id-grid">
        <div className="pp-photo">
          <Image src="/img/u26.png" alt="Portrait of Raymond Chizanga" fill sizes="(max-width: 760px) 40vw, 180px" style={{ objectFit: 'cover', objectPosition: '50% 30%' }} priority />
        </div>
        <div className="pp-id-fields">
          {IDENTITY.fields.map((f) => <Field key={f.k} k={f.k} v={f.v} />)}
        </div>
      </div>
      <div className="pp-rule" />
      <div className="pp-words">
        <div className="pp-label">In my words / Dans mes mots</div>
        <p>{IDENTITY.words}</p>
      </div>
      <div className="pp-ghost" aria-hidden="true">
        <Image src="/img/u26.png" alt="" fill sizes="60px" style={{ objectFit: 'cover', objectPosition: '50% 30%' }} />
      </div>
    </Paper>
  )
}

/* ---------- visas ---------- */

export function VisaPage({ visa, side, folio, active, children }: { visa: Visa; side: Side; folio: number; active: boolean; children?: ReactNode }) {
  return (
    <Paper side={side} folio={folio} head={['Visa / Visa', `No. ${visa.no}`]} className={`pp-visa pp-visa-${visa.id}`} mrzLines={[`V<RC${visa.org.replace(/\s/g, '')}<<${visa.title.split(/[ ,&]+/).slice(0, 3).join('<')}`, `${visa.from.replace(' ', '')}<${visa.until.replace(' ', '')}<<${visa.place}`]}>
      <div className="pp-visa-stamp">
        <Stamp id={visa.id} spec={visa.stamp} active={active} />
      </div>
      <div className="pp-visa-top">
        <div className="pp-label">Issued by / Délivré par</div>
        <h2 className="pp-org">{visa.org}</h2>
        <div className="pp-sub">{visa.orgLine}</div>
      </div>
      <div className="pp-visa-title">{visa.title}</div>
      <div className="pp-visa-grid">
        <Field k="Valid from" v={visa.from} mono />
        <Field k="Valid until" v={visa.until} mono />
        <Field k="Place of issue" v={visa.place} />
        <Field k="Category" v={visa.category} />
      </div>
      <div className="pp-rule" />
      <div className="pp-label">Remarks / Observations</div>
      <ul className="pp-remarks">
        {visa.remarks.map((r) => <li key={r}>{r}</li>)}
      </ul>
      {children}
    </Paper>
  )
}

export function HostfullyVisa({ side, folio, active }: { side: Side; folio: number; active: boolean }) {
  const visa = VISAS.find((v) => v.id === 'hostfully')!
  return (
    <VisaPage visa={visa} side={side} folio={folio} active={active}>
      <div className="pp-stats">
        {STATS.map((s) => (
          <div key={s.label}>
            <b>{s.final}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </VisaPage>
  )
}

/* ---------- Durham FCC annex ---------- */

export function BeforeAfterPage({ side, folio, open }: { side: Side; folio: number; open: Opener }) {
  return (
    <Paper side={side} folio={folio} head={['Annex · Before / After', 'Durham FCC']} className="pp-annex">
      <div className="pp-annex-title">
        <h3>Website refresh</h3>
        <p>durhamfcc.org, before and after. Tap a page to view it full size.</p>
      </div>
      <div className="pp-ba">
        {DFCC_BEFORE_AFTER.map((s) => (
          <button key={s.src} className="pp-ba-item" onClick={() => open.openImage(s.src, `Durham FCC · ${s.caption} · before / after`)} aria-label={`View ${s.caption} before and after`}>
            <span className="pp-ba-img">
              <Image src={s.src} alt={`${s.caption}, before and after`} fill sizes="(max-width: 760px) 44vw, 220px" style={{ objectFit: 'cover', objectPosition: '50% 40%' }} />
            </span>
            <span className="pp-label">{s.caption}</span>
          </button>
        ))}
      </div>
    </Paper>
  )
}

/* ---------- Hostfully annexes ---------- */

export function CampaignsPage({ side, folio, open }: { side: Side; folio: number; open: Opener }) {
  const shots = [...(WORKS[0].shots ?? []), ...EXTRA_SHOTS]
  return (
    <Paper side={side} folio={folio} head={['Annex A · Campaigns', 'Hostfully']} className="pp-annex">
      <div className="pp-annex-title">
        <h3>Campaign work</h3>
        <p>Social, partner, webinar and lifecycle creative. Tap any piece to view it full size.</p>
      </div>
      <div className="pp-thumbs">
        {shots.map((s) => (
          <button key={s.src} className="pp-thumb" onClick={() => open.openImage(s.src, s.caption)} aria-label={`View ${s.caption}`}>
            <Image src={s.src} alt={s.caption} fill sizes="(max-width: 760px) 30vw, 140px" style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </Paper>
  )
}

export function CaseFilesPage({ side, folio, open }: { side: Side; folio: number; open: Opener }) {
  return (
    <Paper side={side} folio={folio} head={['Annex B · Case files', 'Hostfully']} className="pp-annex">
      <div className="pp-annex-title">
        <h3>Case files</h3>
        <p>Three campaigns, documented from opportunity to impact.</p>
      </div>
      <div className="pp-files">
        {STUDIES.map((s, i) => (
          <button key={s.id} className="pp-file" onClick={() => open.openStudy(s.id)}>
            <span className="pp-file-tab">File {String(i + 1).padStart(2, '0')}</span>
            <span className="pp-file-img">
              <Image src={s.images[0].src} alt="" fill sizes="96px" style={{ objectFit: 'cover' }} />
            </span>
            <span className="pp-file-text">
              <b>{s.title}</b>
              <span>{s.sub}</span>
              <em>Open file →</em>
            </span>
          </button>
        ))}
      </div>
    </Paper>
  )
}

export function MotionPage({ side, folio }: { side: Side; folio: number }) {
  return (
    <Paper side={side} folio={folio} head={['Annex C · Motion', 'Hostfully']} className="pp-annex">
      <div className="pp-annex-title">
        <h3>Motion</h3>
        <p>Scripted, edited and animated in Premiere Pro and After Effects for owned channels.</p>
      </div>
      <div className="pp-films">
        {FILMS.map((f) => (
          <a key={f.yid} className="pp-film" href={f.href} target="_blank" rel="noopener noreferrer" aria-label={`${f.label} ${f.meta} (opens YouTube)`}>
            <Image src={`https://i.ytimg.com/vi/${f.yid}/hqdefault.jpg`} alt="" fill sizes="(max-width: 760px) 45vw, 200px" style={{ objectFit: 'cover' }} unoptimized />
            <span className="pp-play" aria-hidden="true" />
            <span className="pp-film-meta">{f.meta}</span>
          </a>
        ))}
      </div>
      <div className="pp-label" style={{ marginTop: 12 }}>Instagram reels</div>
      <ul className="pp-reels">
        {REELS.map((r, i) => (
          <li key={r.href}>
            <a href={r.href} target="_blank" rel="noopener noreferrer">
              <span>{String(i + 1).padStart(2, '0')}</span> {r.handle} ↗
            </a>
          </li>
        ))}
      </ul>
    </Paper>
  )
}

/* ---------- later pages ---------- */

export function EarlierPage({ side, folio, active }: { side: Side; folio: number; active: boolean }) {
  return (
    <Paper side={side} folio={folio} head={['Earlier entries / Entrées antérieures', 'Visits']} className="pp-earlier">
      <div className="pp-wells">
        {EARLIER.map((e) => (
          <div key={e.org} className="pp-well">
            <Stamp id={e.id} spec={e.stamp} size={92} active={active} />
            <b>{e.org}</b>
            <span>{e.role}</span>
            <em>{e.date}</em>
          </div>
        ))}
      </div>
    </Paper>
  )
}

export function SkillsPage({ side, folio }: { side: Side; folio: number }) {
  return (
    <Paper side={side} folio={folio} head={['Endorsements / Mentions', 'Skills']} className="pp-skills">
      {SKILL_GROUPS.map((g) => <Field key={g.k} k={g.k} v={g.v} />)}
      <div className="pp-rule" />
      <div className="pp-label">Education & credentials</div>
      <div className="pp-edu">
        <b>{EDUCATION_LINE.program}</b>
        <span>{EDUCATION_LINE.school} · {EDUCATION_LINE.year} · GPA {EDUCATION_LINE.gpa}</span>
        <span>{EDUCATION_LINE.credentials}</span>
      </div>
      <div className="pp-label" style={{ marginTop: 10 }}>Selected project</div>
      <div className="pp-edu">
        <b>{PROJECT_LINE.name} — {PROJECT_LINE.kind}</b>
        <span>{PROJECT_LINE.text}</span>
      </div>
    </Paper>
  )
}

export function ContactPage({ side, folio }: { side: Side; folio: number }) {
  return (
    <Paper side={side} folio={folio} head={['Observations / Contact', 'Bearer']} className="pp-contact">
      <h3 className="pp-contact-big">Let’s work<br />together.</h3>
      <p className="pp-contact-note">Fastest route is email.</p>
      <div className="pp-contact-links">
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href={CONTACT.resume} download>Download resume ↓</a>
      </div>
      <div className="pp-label" style={{ marginTop: 14 }}>Best fit</div>
      <ul className="pp-remarks">
        {BEST_FIT.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <div className="pp-sign">
        <span className="pp-sign-name">Raymond Chizanga</span>
        <span className="pp-label">Signature of bearer / Signature du titulaire</span>
      </div>
      <Link className="pp-classic" href="/classic">Text-only version of this portfolio</Link>
    </Paper>
  )
}
