import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'opentype.js'
import type { StampFonts } from '@/lib/stamps/compile'
import { renderStamp } from '@/lib/stamps/resolve'
import type { StampSpec } from '@/lib/passport'

// Build-time bridge to the Stamp Studio engine (src/lib/stamps, kept byte-identical to
// Petworking's web/src/lib/stamps). Petworking's web reads the faces over fetch in the browser;
// here they are read from disk once at build, so a visitor downloads only the finished SVG.

const FONT_DIR = path.join(process.cwd(), 'src', 'lib', 'stamps', 'fonts')

async function face(file: string) {
  const buf = await readFile(path.join(FONT_DIR, file))
  return parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer)
}

let fonts: Promise<StampFonts> | null = null
function stampFonts() {
  fonts ??= Promise.all([face('Anton-Regular.ttf'), face('Oswald-Bold.ttf'), face('Oswald-SemiBold.ttf')])
    .then(([claim, name, meta]) => ({ claim, name, meta }))
  return fonts
}

/** Press one stamp. A stamp the engine cannot set fails the build rather than drawing a stand-in. */
export async function pressStamp(id: string, s: StampSpec): Promise<string> {
  const result = await renderStamp({
    die: s.die,
    country: s.country,
    config: {
      id: `rc-portfolio-${id}`,
      businessName: s.business,
      claim: s.claim,
      claimLines: s.claimLines,
      year: s.year,
      date: s.date,
      location: s.location,
      ink: s.ink,
    },
  }, await stampFonts())
  if ('gap' in result) throw new Error(`Stamp "${id}" cannot be pressed: ${JSON.stringify(result.gap)}`)
  return result.svg
}
