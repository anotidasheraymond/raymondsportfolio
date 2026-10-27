import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import Stamp from './Stamp'
import Word, { WordInSvg } from './Lettering'
import PetworkingWordmark from './PetworkingWordmark'
import BeforeAfterCarousel from './BeforeAfterCarousel'
import OledDisplay from './OledDisplay'
import FitBody from './FitBody'
import {
  IDENTITY, VISAS, EARLIER, EDUCATION_LINE, PROJECT_LINE, HARDWARE_PROJECT, SKILL_GROUPS, EXTRA_SHOTS, JUNCTION_HOUSE, LINKEDIN, mrz,
  type Visa,
} from '@/lib/passport'
import { WORKS, STATS, STUDIES, FILMS, REELS, CONTACT, BEST_FIT, SOCIAL } from '@/lib/content'

export type Side = 'left' | 'right'
export type Opener = {
  openImage: (src: string, caption: string) => void
  openStudy: (id: string) => void
  openVideo: (src: string, poster: string, caption: string) => void
  goTo: (page: number) => void
}

/* ---------- shared pieces ---------- */

/** Binds a sentence's last two words (and a trailing ·, | or — separator) so a line never ends on one word. */
export const noOrphan = (t: string) => t.replace(/\s+((?:[·|—–]\s+)?\S+)$/, (_, tail: string) => ' ' + tail.replace(/\s+/g, ' '))

export function Paper({ side, head, folio, children, className = '', mrzLines }: { side: Side; head: [string, string]; folio: number; children: ReactNode; className?: string; mrzLines?: string[] }) {
  return (
    <div className={`pp-paper pp-${side} ${className}`}>
      <div className="pp-guilloche" aria-hidden="true" />
      <div className="pp-gutter" aria-hidden="true" />
      <div className="pp-head">
        <span>{head[0]}</span>
        <span>{head[1]}</span>
      </div>
      <FitBody className={`pp-body${mrzLines ? ' has-mrz' : ''}`}>{children}</FitBody>
      {mrzLines && <Mrz lines={mrzLines} />}
      <div className="pp-folio" aria-hidden="true">{String(folio).padStart(2, '0')}</div>
    </div>
  )
}

export function Field({ k, v, mono }: { k: string; v: ReactNode; mono?: boolean }) {
  return (
    <div className="pp-field">
      <div className="pp-label">{k}</div>
      <div className={`pp-value${mono ? ' is-mono' : ''}`}>{typeof v === 'string' ? noOrphan(v) : v}</div>
    </div>
  )
}

function Mrz({ lines }: { lines: string[] }) {
  return (
    <div className="pp-mrz" aria-hidden="true">
      <div className="pp-micro">{'RAYMOND·CHIZANGA·'.repeat(12)}</div>
      {lines.map((l, i) => <span key={i} className="pp-mrz-line">{mrz(l)}</span>)}
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
          <div className="pp-cover-word">Renaissance Man</div>
        </div>
        <div className="pp-crest" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="1.4 4.2" />
            <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <WordInSvg word="RC" cx={100} baseline={124} cap={58} />
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
      <div className="pp-endpaper-mark"><Word word="RC" height={52} /></div>
    </div>
  )
}

/* ---------- 01 identity ---------- */

/** Raymond's bio, verbatim, on the page facing his identity page. */
export function BioPage({ side, folio }: { side: Side; folio: number }) {
  return (
    <Paper side={side} folio={folio} head={['Bio', 'Raymond Chizanga']} className="pp-bio">
      <h2 className="pp-bio-title">Bio</h2>
      <div className="pp-bio-text">
        {IDENTITY.bio.map((t) => <p key={t.slice(0, 24)}>{noOrphan(t)}</p>)}
      </div>
    </Paper>
  )
}

export function IdentityPage({ side, folio }: { side: Side; folio: number }) {
  return (
    <Paper side={side} folio={folio} head={['Portfolio passport', `Code ${IDENTITY.code}`]} className="pp-identity" mrzLines={['PF<RCPCHIZANGA<<RAYMOND', 'MKTG2026<<BRAND<COMMUNITY<<SAAS<ECOMMERCE', 'RCCHIZANGA<GMAIL<COM<<MISSISSAUGA<ON<<<<<7']}>
      <div className="pp-id-top">
        <div>
          <div className="pp-label">Surname · Given names</div>
          <h1 className="pp-name">{IDENTITY.given} {IDENTITY.surname}</h1>
          <div className="pp-sub">{IDENTITY.line}</div>
        </div>
      </div>
      <div className="pp-id-grid">
        <div className="pp-photo">
          <Image src="/img/passport/raymond-jeep.webp" alt="Raymond Chizanga standing in a white Jeep in the hills" fill sizes="(max-width: 760px) 40vw, 180px" style={{ objectFit: 'cover', objectPosition: '50% 38%' }} priority />
        </div>
        <div className="pp-id-fields">
          {IDENTITY.fields.map((f) => <Field key={f.k} k={f.k} v={f.v} />)}
        </div>
      </div>
      <div className="pp-ghost" aria-hidden="true">
        <Image src="/img/passport/raymond-jeep.webp" alt="" fill sizes="60px" style={{ objectFit: 'cover', objectPosition: '50% 38%' }} />
      </div>
    </Paper>
  )
}

/* ---------- contents ---------- */



/* ---------- visas ---------- */

export function VisaPage({ visa, side, folio, active, children }: { visa: Visa; side: Side; folio: number; active: boolean; children?: ReactNode }) {
  return (
    <Paper side={side} folio={folio} head={['Visa', `No. ${visa.no}`]} className={`pp-visa pp-visa-${visa.id}`} mrzLines={[`V<${visa.stamp.country === 'US' ? 'USA' : 'CAN'}${visa.org.replace(/\s/g, '')}<<${visa.title.split(/[ ,&]+/).slice(0, 3).join('<')}`, `${visa.from.replace(' ', '')}<${visa.until.replace(' ', '')}<<${visa.place}`]}>
      <div className="pp-visa-stamp">
        <Stamp id={visa.id} spec={visa.stamp} active={active} />
      </div>
      <div className="pp-visa-top">
        <div className="pp-label">Issued by</div>
        {visa.id === 'hoard' ? (
          <h2 className="pp-org pp-org-mark" aria-label={visa.org}><Word word="THE HOARD" height="0.74em" /></h2>
        ) : visa.id === 'petworking' ? (
          <h2 className="pp-org pp-org-mark"><PetworkingWordmark size={40} style={{ fontSize: 'inherit' }} /></h2>
        ) : (
          <h2 className={`pp-org${visa.org.length > 14 ? ' is-long' : ''}`}>{visa.org}</h2>
        )}
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
      <div className="pp-label">Remarks</div>
      <ul className="pp-remarks">
        {visa.remarks.map((r) => <li key={r}>{noOrphan(r)}</li>)}
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
        <p>durhamfcc.org, every page before and after. Tap a slide to see it full screen.</p>
      </div>
      <BeforeAfterCarousel onOpen={open.openImage} />
    </Paper>
  )
}

export function C54Visa({ side, folio, active, open }: { side: Side; folio: number; active: boolean; open: Opener }) {
  const visa = VISAS.find((v) => v.id === 'c54')!
  const caption = 'Community 54 event flyer · Finale Friday, Nov 24, 2017 · Highly Animated on the lineup'
  return (
    <VisaPage visa={visa} side={side} folio={folio} active={active}>
      <button className="pp-attached" onClick={() => open.openImage('/img/passport/c54-finale-friday.jpg', caption)} aria-label="View the Finale Friday flyer">
        <span className="pp-attached-img">
          <Image src="/img/passport/c54-finale-friday.jpg" alt="Community 54 Finale Friday flyer, November 24, 2017" fill sizes="90px" style={{ objectFit: 'cover' }} />
        </span>
        <span className="pp-attached-text">
          <span className="pp-label">Attached</span>
          <span>Finale Friday flyer · Nov 24, 2017 · Highly Animated on the lineup</span>
        </span>
      </button>
    </VisaPage>
  )
}

/* ---------- Hostfully annexes ---------- */

export function CampaignsPage({ side, folio, open }: { side: Side; folio: number; open: Opener }) {
  const shots = [...(WORKS[0].shots ?? []), ...EXTRA_SHOTS].slice(0, 9)
  return (
    <Paper side={side} folio={folio} head={['Annex A · Campaigns', 'Hostfully']} className="pp-annex">
      <div className="pp-annex-title">
        <h3>Campaign work</h3>
        <p>Social, partner, webinar and lifecycle creative. Tap any piece to view it full size.</p>
      </div>
      <div className="pp-thumbs">
        {shots.map((s) => (
          <button key={s.src} className="pp-thumb" onClick={() => open.openImage(s.src, s.caption)} aria-label={`View ${s.caption}`}>
            <Image src={s.src} alt={s.caption} fill unoptimized style={{ objectFit: 'cover' }} />
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

/* ---------- Hostfully customer stories ---------- */

export function StoriesPage({ side, folio, open }: { side: Side; folio: number; open: Opener }) {
  return (
    <Paper side={side} folio={folio} head={['Annex D · Customer stories', 'Hostfully']} className="pp-annex">
      <div className="pp-annex-title">
        <h3>Junction House Getaways</h3>
        <p>{JUNCTION_HOUSE.people}, {JUNCTION_HOUSE.business}. A vertical interview series filmed and edited for Hostfully&rsquo;s social channels.</p>
      </div>
      <div className="pp-stories">
        {JUNCTION_HOUSE.clips.map((c) => (
          <button
            key={c.slug}
            className="pp-story"
            onClick={() => open.openVideo(`/video/jh-${c.slug}.mp4`, `/video/jh-${c.slug}.jpg`, `Junction House Getaways · ${c.title}`)}
            aria-label={`Play ${c.title}`}
          >
            <span className="pp-story-img">
              <Image src={`/video/jh-${c.slug}.jpg`} alt="" fill sizes="(max-width: 760px) 30vw, 120px" style={{ objectFit: 'cover' }} />
              <span className="pp-play" aria-hidden="true" />
            </span>
            <span className="pp-story-title">{c.title}</span>
          </button>
        ))}
      </div>
    </Paper>
  )
}

/* ---------- independent work ---------- */

export function IndependentPage({ ids, head, side, folio, open }: { ids: string[]; head: string; side: Side; folio: number; open: Opener }) {
  const solo = ids.length === 1
  return (
    <Paper side={side} folio={folio} head={['Endorsements · Independent work', head]} className={`pp-annex pp-project${solo ? ' is-solo' : ''}`}>
      {ids.map((id) => {
        const w = WORKS.find((x) => x.id === id)!
        return (
          <section key={id} className="pp-proj">
            <div className="pp-proj-head">
              <h3>{w.title}</h3>
              <span className="pp-label">{w.kind}{' · '}{w.year}</span>
            </div>
            {(solo ? w.bullets : w.bullets.slice(0, 2)).map((b) => <p key={b} className="pp-proj-lede">{b}</p>)}
            {w.shots && w.shots.length > 0 && (
              <div className="pp-proj-shots">
                {w.shots.slice(0, solo ? 8 : 4).map((s) => (
                  <button key={s.src} className="pp-thumb" onClick={() => open.openImage(s.src, `${w.title} · ${s.caption}`)} aria-label={`View ${s.caption}`}>
                    <Image src={s.src} alt={s.caption} fill unoptimized style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </section>
        )
      })}
    </Paper>
  )
}

/* ---------- later pages ---------- */

/**
 * The app's passport stamps page (mobile passport-stamps-page.tsx): stamps are not in a grid, each
 * sits at its own spot, size and tilt on a 325 × 520 reference page, scaled with the page.
 */
const PLACES: Array<{ top: number; left?: number; right?: number; size: number }> = [
  { top: 28, left: 16, size: 126 },
  { top: 22, right: 18, size: 118 },
  { top: 118, left: 88, size: 128 },
  { top: 154, left: 12, size: 114 },
  { top: 168, right: 16, size: 120 },
  { top: 254, left: 82, size: 124 },
]

export function EarlierPage({ side, folio, active }: { side: Side; folio: number; active: boolean }) {
  return (
    <Paper side={side} folio={folio} head={['Stamps', 'Earlier entries']} className="pp-earlier">
      <div className="pp-placed">
        {EARLIER.map((e, i) => {
          const p = PLACES[i % PLACES.length]
          const style = {
            // The app's slots at their own spacing; the area ends where the lowest stamp does.
            top: `${(p.top / 382) * 100}%`,
            width: `${(p.size / 325) * 100}%`,
            ...(p.left !== undefined ? { left: `${(p.left / 325) * 100}%` } : { right: `${((p.right ?? 0) / 325) * 100}%` }),
          }
          return (
            <div key={e.id} className="pp-placed-stamp" style={style}>
              <Stamp id={e.id} spec={e.stamp} size={0} active={active} />
            </div>
          )
        })}
      </div>
      <ol className="pp-legend">
        {EARLIER.map((e) => (
          <li key={e.id}><b>{e.org}</b><span>{e.role}</span><em>{e.date}</em></li>
        ))}
      </ol>
    </Paper>
  )
}

export function HardwarePage({ side, folio, active }: { side: Side; folio: number; active?: boolean }) {
  return (
    <Paper side={side} folio={folio} head={['Endorsements', 'Hardware & Studies']} className="pp-annex pp-hardware-page">
      <div className="pp-annex-title" style={{ marginBottom: '1.8cqw' }}>
        <h3>Physical Computing & Studies</h3>
        <p>Embedded systems prototyping, audio engineering & credentials.</p>
      </div>

      <div className="pp-label">Physical computing & hardware prototyping</div>
      <div className="pp-hardware-card" style={{ marginTop: '0.8cqw' }}>
        <OledDisplay active={active} />
        <div className="pp-edu" style={{ marginTop: 8 }}>
          <b>{HARDWARE_PROJECT.name} — {HARDWARE_PROJECT.kind}</b>
          <span style={{ marginTop: 3 }}>{HARDWARE_PROJECT.text}</span>
        </div>
        <div className="pp-hardware-specs" style={{ marginTop: 6 }}>
          {HARDWARE_PROJECT.specs.map((s) => (
            <span key={s.label} className="pp-hw-chip">
              <em>{s.label}</em> {s.val}
            </span>
          ))}
        </div>
      </div>

      <div className="pp-rule" style={{ margin: '2.4cqw 0 1.8cqw' }} />
      <div className="pp-label">Studies & credentials</div>
      <div className="pp-edu" style={{ marginTop: 4 }}>
        <b>{EDUCATION_LINE.program}</b>
        <span>{EDUCATION_LINE.school} · {EDUCATION_LINE.year} · GPA {EDUCATION_LINE.gpa}</span>
        <span>{EDUCATION_LINE.credentials}</span>
      </div>
    </Paper>
  )
}

export function SkillsPage({ side, folio }: { side: Side; folio: number }) {
  return (
    <Paper side={side} folio={folio} head={['Endorsements', 'Skills']} className="pp-skills">
      <div className="pp-skills-list">
        {SKILL_GROUPS.map((g) => (
          <div key={g.k} className="pp-skill-group">
            <div className="pp-label">{g.k}</div>
            <div className="pp-value">{g.v}</div>
          </div>
        ))}
      </div>
    </Paper>
  )
}

export function ContactPage({ side, folio }: { side: Side; folio: number }) {
  return (
    <Paper side={side} folio={folio} head={['Contact', 'Bearer']} className="pp-contact">
      <h3 className="pp-contact-big">Let’s work together.</h3>
      <p className="pp-contact-note">Fastest route is email.</p>
      <div className="pp-contact-links">
        {CONTACT.emails.map((e) => <a key={e} href={CONTACT.mailto}>{e}</a>)}
        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <span className="pp-socials">Instagram{' '}
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">{SOCIAL.instagramHandle}</a>{' · '}
          <a href={SOCIAL.doghairInstagram} target="_blank" rel="noopener noreferrer">{SOCIAL.doghairHandle}</a>{' · '}
          <a href={SOCIAL.petworkingInstagram} target="_blank" rel="noopener noreferrer">{SOCIAL.petworkingHandle}</a>
        </span>
        <a href={CONTACT.resume} download>Download resume ↓</a>
      </div>
      <div className="pp-label" style={{ marginTop: 14 }}>Best fit</div>
      <ul className="pp-remarks">
        {BEST_FIT.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <div className="pp-sign">
        <span className="pp-sign-name">Raymond Chizanga</span>
        <span className="pp-label">Signature of bearer</span>
      </div>
      <Link className="pp-classic" href="/classic">Text-only version of this portfolio</Link>
    </Paper>
  )
}
