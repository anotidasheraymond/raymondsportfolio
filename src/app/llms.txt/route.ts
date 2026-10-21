import { VISAS, EARLIER, SKILL_GROUPS, PROJECT_LINE } from '@/lib/passport'
import { CONTACT, HERO_LEDE, STATS, STUDIES, WORKS } from '@/lib/content'

// A plain-text profile for answer engines (llmstxt.org), built from the same data the site
// renders, so it can never say more than the pages do.

export const dynamic = 'force-static'

export function GET() {
  const site = 'https://raymondchizanga.work'
  const lines = [
    '# Raymond Chizanga',
    '',
    `> ${HERO_LEDE}`,
    '',
    'Based in Mississauga, Ontario, Canada. Works across integrated marketing, brand and community, content and SEO/AEO, lifecycle marketing, partner marketing and creative production.',
    '',
    '## Contact',
    `- Email: ${CONTACT.emails.join(' and ')}`,
    `- Phone: ${CONTACT.phone}`,
    `- Resume: ${site}${CONTACT.resume}`,
    '- LinkedIn: https://www.linkedin.com/in/raymond-chizanga-443175149/',
    '',
    '## Results',
    ...STATS.map((s) => `- ${s.final}: ${s.label} (Hostfully)`),
    '',
    '## Experience',
    ...VISAS.map((v) => `- ${v.title}, ${v.org} (${v.orgLine}) — ${v.from} to ${v.until}, ${v.place}. ${v.remarks[0]}`),
    '',
    '## Earlier roles',
    ...EARLIER.map((e) => `- ${e.role}, ${e.org} — ${e.date}`),
    '',
    '## Case studies',
    ...STUDIES.map((s) => `- ${s.title}: ${s.sub}`),
    '',
    '## Independent work',
    ...WORKS.filter((w) => w.id !== 'hostfully').map((w) => `- ${w.title} (${w.kind}, ${w.year}): ${w.bullets[0]}`),
    `- ${PROJECT_LINE.name} (${PROJECT_LINE.kind}): ${PROJECT_LINE.text}`,
    '',
    '## Skills',
    ...SKILL_GROUPS.map((g) => `- ${g.k}: ${g.v}`),
    '',
    '## Pages',
    `- [Interactive portfolio passport](${site}/)`,
    `- [Full text version](${site}/classic)`,
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
