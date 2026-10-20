import type { Font } from 'opentype.js';

import { StrokeField, distanceToRows, outlinePoints } from './clearance';
import { arcLength, arcLine, measureLine, straightLine, type LineSpec } from './glyphs';
import type { ArcSlot, Box, Face, LineSlot, StampTemplate, YearSlot } from './template';
import { hashSeed, seededRandom, seededRange } from './seed';
import { wearMask, type WearTexture } from './wear';

// The stamp compiler. One function draws every stamp on every surface: Stamp Studio's preview, the
// passport page, the stamp's own detail, the export and the printed passport all call
// compileStampSvg with the stamp's render config, so no surface keeps a second idea of a stamp.
//
// Nothing here is generated. The composition is the template's (measured off the owner's stamps),
// the animal and the heart-paw are the owner's artwork traced once into paths, the type is the
// bundled face set as outlines, and the wear is one of the textures cut from the owner's own
// prints, chosen and placed by the stamp's id. The same config gives the same SVG, byte for byte.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

/**
 * Traced artwork: a path in its own box, 0 0 width height, and for an animal, `rows`: the leftmost and
 * rightmost ink across each of a number of equal horizontal slices, top to bottom (null where a
 * slice has none), so the compiler can keep it off the year without drawing it.
 */
export type Artwork = { width: number; height: number; d: string; rows?: Array<[number, number] | null> };

/**
 * The bundled faces, in the owner's hierarchy: the claim extra-bold condensed (Anton), the name and
 * the place condensed bold (Oswald Bold), the secondary lines condensed semibold (Oswald SemiBold).
 * A slot names the face its reference is set in (template.Face); these are the defaults.
 */
export type StampFonts = {
  /** The dominant claim, and the heavy numerals some families print. */
  claim: Font;
  /** The business name and the place. */
  name: Font;
  /** The split year and the other secondary lines. */
  meta: Font;
};

export type StampConfig = {
  /** The stamp's id. It seeds the wear, so a stamp always wears the same way. */
  id: string;
  businessName: string;
  /** The service claim, for the families that print one. */
  claim?: string;
  /** The claim broken for this die when it will not stand on one line (claims/claim-layouts). */
  claimLines?: string[];
  /** Four digits; drawn split, "20" and "26", either side of the animal. */
  year: string;
  /** The visit date as it is printed ("2026-09-06"), for the families that carry one. */
  date?: string;
  location?: string;
  /** A clinic's address, one entry per line of its family. */
  addressLines?: string[];
  /** A clinic's supporting lines round the foot, printed with the separator between them. */
  footer?: string[];
  /** The ink: a hex colour, or OFFSET for the two-pass print. */
  ink: string;
};

/**
 * The two-pass print the owner chose to keep as an ink (29 Sep 2026, "keep this 3D colour style"):
 * the stamp pressed once in red and once in blue, a little off register, dark plum where both
 * passes land. The colours are the ones in the render the owner picked.
 */
export const OFFSET = 'offset';
export const OFFSET_INK = { first: '#e63c3c', second: '#3c6ee6', both: '#46145a' } as const;

export type StampAssets = {
  template: StampTemplate;
  fonts: StampFonts;
  emblem: Artwork;
  heartPaw: Artwork;
  /** The owner's wear, cut from the demo prints; left out, the stamp is drawn clean. */
  wear?: WearTexture[];
};

export type StampPart = 'businessName' | 'claim' | 'date' | 'location' | 'address' | 'footer';

/**
 * A stamp that cannot be set without making something up: a part too long for every layout its
 * family has, or a part the family prints that the stamp was given no text for. The business is
 * asked instead.
 */
export class StampLayoutError extends Error {
  constructor(public readonly part: StampPart, message: string) {
    super(message);
    this.name = 'StampLayoutError';
  }
}

const upper = (text: string) => text.toLocaleUpperCase();

/** A slot's spec at another cap: the separator dot and the date's dashes scale with the letters. */
function atCap(spec: LineSpec, slot: LineSlot | ArcSlot, cap: number): LineSpec {
  const k = cap / slot.cap;
  return {
    ...spec,
    cap,
    dot: spec.dot && { size: spec.dot.size * k, rise: spec.dot.rise * k, gap: (spec.dot.gap ?? 0) * k },
    dash: spec.dash && { width: spec.dash.width * k, thickness: spec.dash.thickness * k, rise: spec.dash.rise * k, gap: spec.dash.gap * k },
  };
}

/** Fit a line to its slot: its own cap if it fits, smaller down to minCap, or null. */
function fitLine(font: Font, text: string, slot: LineSlot): LineSpec | null {
  const spec = { cap: slot.cap, tracking: slot.tracking, stretch: slot.stretch, dot: slot.dot, dash: slot.dash };
  const width = measureLine(font, text, spec);
  if (width <= slot.maxWidth) return spec;
  const cap = (slot.cap * slot.maxWidth) / width;
  return cap >= slot.minCap ? atCap(spec, slot, cap) : null;
}

/** Fit an arc to the length of baseline its slot's span holds, the same way. */
function fitArc(font: Font, text: string, slot: ArcSlot): LineSpec | null {
  const spec = { cap: slot.cap, tracking: slot.tracking, stretch: slot.stretch, dot: slot.dot };
  const width = measureLine(font, text, spec);
  if (slot.fill) {
    // Set to run the family's span, as the owner's stamps set every name; the width scales with
    // the cap, so the cap that fills is found in one step.
    const cap = Math.min(slot.fill.maxCap, (slot.cap * arcLength(slot, slot.fill.spanDeg)) / width);
    return cap >= slot.minCap ? atCap(spec, slot, cap) : null;
  }
  const room = arcLength(slot, slot.maxSpanDeg);
  if (width <= room) return spec;
  const cap = (slot.cap * room) / width;
  return cap >= slot.minCap ? atCap(spec, slot, cap) : null;
}

/** Each family's rings as a field the name is kept off, built once per family. */
const dieFields = new Map<string, StrokeField>();

function dieField(t: StampTemplate): StrokeField {
  let field = dieFields.get(t.id);
  if (!field) {
    field = new StrokeField(t.die.map((ring) => ({ points: outlinePoints(ring.d, 3), half: ring.stroke / 2 })));
    dieFields.set(t.id, field);
  }
  return field;
}

/** The widest the owner's prints track any line (the Cedar place, 0.205 of its cap). */
const WIDEST_TRACKING = 0.205;

/**
 * The business name. Its size is the slot's (fitArc: in fill mode, the size that runs the family's
 * span). Where the family keeps it a distance off the die, the size then comes down until it keeps
 * that distance, found to a tenth of a unit; a name that meets the die even at minCap cannot be
 * set. In fill mode, a name that cannot run the span at its size (held under maxCap, or brought
 * down off the die) is spaced out to run it, never tracked wider than the owner's prints track any
 * line, so every name still runs its family's span.
 */
function setName(font: Font, text: string, t: StampTemplate): string {
  const slot = t.businessName;
  if (slot.kind !== 'arc' || (slot.dieGap === undefined && !slot.fill)) return setSlot(font, text, slot, 'businessName');
  const fitted = fitArc(font, text, slot);
  if (!fitted) throw new StampLayoutError('businessName', 'businessName does not fit its arc');
  const base = { cap: slot.cap, tracking: slot.tracking, stretch: slot.stretch, dot: slot.dot };
  const span = slot.fill ? arcLength(slot, slot.fill.spanDeg) : 0;
  const specAt = (cap: number): LineSpec => {
    const spec = atCap(base, slot, cap);
    if (!span) return spec;
    const width = measureLine(font, text, spec);
    if (width >= span - 0.5) return spec;
    // Tracking adds the same room after every letter but the last, so the width is linear in it.
    const perTenth = measureLine(font, text, { ...spec, tracking: spec.tracking + 0.1 }) - width;
    if (perTenth <= 0) return spec;
    return { ...spec, tracking: Math.min(Math.max(WIDEST_TRACKING, spec.tracking), spec.tracking + (0.1 * (span - width)) / perTenth) };
  };
  const set = (cap: number) => arcLine(font, text, { ...specAt(cap), cx: slot.cx, cy: slot.cy, r: slot.r, ry: slot.ry, inset: slot.inset, side: slot.side }).d;
  const full = set(fitted.cap);
  if (slot.dieGap === undefined) return full;
  const field = dieField(t);
  const clears = (d: string) => field.clears(outlinePoints(d, 4), slot.dieGap ?? 0);
  if (clears(full)) return full;
  let lo = Math.min(slot.minCap, fitted.cap);
  let hi = fitted.cap;
  if (!clears(set(lo))) throw new StampLayoutError('businessName', 'businessName meets the die at its smallest');
  while (hi - lo > 0.1) {
    const mid = (lo + hi) / 2;
    if (clears(set(mid))) lo = mid;
    else hi = mid;
  }
  return set(lo);
}

function setSlot(font: Font, text: string, slot: ArcSlot | LineSlot, part: StampPart): string {
  if (slot.kind === 'arc') {
    const spec = fitArc(font, text, slot);
    if (!spec) throw new StampLayoutError(part, `${part} does not fit its arc`);
    return arcLine(font, text, { ...spec, cx: slot.cx, cy: slot.cy, r: slot.r, ry: slot.ry, inset: slot.inset, side: slot.side }).d;
  }
  const spec = fitLine(font, text, slot);
  if (!spec) throw new StampLayoutError(part, `${part} does not fit its line`);
  return straightLine(font, text, spec, slot.x, slot.y).d;
}

/** Artwork contained in a box, centred across and standing on the box's floor. */
function placeArt(art: Artwork, box: Box, scale = Math.min(box.width / art.width, box.height / art.height)): string {
  const x = box.x + (box.width - art.width * scale) / 2;
  const y = box.y + box.height - art.height * scale;
  return `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${scale.toFixed(5)})" d="${art.d}"/>`;
}

/**
 * The animal in its box, kept `yearGap` off the split year either side of it: at the box's own
 * size where it clears, otherwise the largest size on the same floor, centred the same, that does
 * (never under half). An animal traced without its rows is drawn at the box's size.
 */
function placeEmblem(art: Artwork, box: Box & { yearGap?: number }, years: string[]): string {
  const full = Math.min(box.width / art.width, box.height / art.height);
  const { rows } = art;
  if (box.yearGap === undefined || !rows) return placeArt(art, box, full);
  const points = years.flatMap((d) => outlinePoints(d, 3));
  const gap = box.yearGap;
  const clears = (scale: number) => {
    const x = box.x + (box.width - art.width * scale) / 2;
    const y = box.y + box.height - art.height * scale;
    return distanceToRows(points, rows, art.height, x, y, scale) >= gap;
  };
  if (clears(full)) return placeArt(art, box, full);
  let lo = full / 2;
  let hi = full;
  if (clears(lo)) {
    while (hi - lo > full / 1000) {
      const mid = (lo + hi) / 2;
      if (clears(mid)) lo = mid;
      else hi = mid;
    }
  }
  return placeArt(art, box, lo);
}

/** The text a family prints for a part, or the question to ask when the stamp has none. */
function required(text: string | undefined, part: StampPart): string {
  if (!text || !text.trim()) throw new StampLayoutError(part, `${part} is printed on this die and the stamp has none`);
  return upper(text.trim());
}

function setClaim(font: Font, config: StampConfig, t: StampTemplate, slot: LineSlot): string {
  const claimText = required(config.claim, 'claim');
  const oneLine = fitLine(font, claimText, slot);
  if (oneLine) return straightLine(font, claimText, oneLine, slot.x, slot.y).d;
  if (t.claimTwoLines && config.claimLines && config.claimLines.length === 2) {
    const { cap, gap } = t.claimTwoLines;
    const lines = config.claimLines.map(upper);
    const spec = { cap, tracking: slot.tracking, stretch: slot.stretch };
    if (lines.some((line) => measureLine(font, line, spec) > slot.maxWidth)) {
      throw new StampLayoutError('claim', 'claim does not fit two lines');
    }
    return straightLine(font, lines[0], spec, slot.x, slot.y - cap - gap).d
      + straightLine(font, lines[1], spec, slot.x, slot.y).d;
  }
  throw new StampLayoutError('claim', 'claim does not fit one line and has no layout for this die');
}

function setYear(font: Font, digits: string, slot: YearSlot): string {
  return straightLine(font, digits, { cap: slot.cap, tracking: slot.tracking ?? 0.06, stretch: slot.stretch }, slot.x, slot.y).d;
}

/** The separator between a clinic's footer lines, as the owner's Oakville stamp prints it. */
const FOOTER_SEPARATOR = ' \u2022 ';

/** An ink as the compiler accepts it: a six-digit hex colour, or OFFSET. It is written into the SVG. */
const INK = /^#[0-9a-fA-F]{6}$/;

export function compileStampSvg(config: StampConfig, assets: StampAssets): string {
  const { template: t, fonts } = assets;
  if (config.ink !== OFFSET && !INK.test(config.ink)) throw new Error(`not an ink: ${config.ink}`);
  const face = (slot: { face?: Face }, fallback: Face) => fonts[slot.face ?? fallback];
  const type: string[] = [];
  type.push(setName(face(t.businessName, 'name'), upper(config.businessName), t));
  if (t.claim) type.push(setClaim(face(t.claim, 'claim'), config, t, t.claim));
  if (t.date) {
    const d = config.date?.trim() || config.year || new Date().toISOString().slice(0, 10);
    type.push(setSlot(face(t.date, 'meta'), d, t.date, 'date'));
  }
  if (t.location) {
    const loc = config.location?.trim()
      || config.date?.trim()
      || (config.businessName && config.businessName !== 'Tail-wind' ? config.businessName : null)
      || 'VERIFIED';
    type.push(setSlot(face(t.location, 'name'), upper(loc), t.location, 'location'));
  }
  if (t.addressLines) {
    const lines = config.addressLines ?? [];
    if (lines.length !== t.addressLines.length) {
      throw new StampLayoutError('address', `this die prints ${t.addressLines.length} address lines`);
    }
    t.addressLines.forEach((slot, index) => {
      type.push(setSlot(face(slot, 'meta'), required(lines[index], 'address'), slot, 'address'));
    });
  }
  if (t.footer) {
    const parts = (config.footer ?? []).map((part) => part.trim()).filter(Boolean);
    type.push(setSlot(face(t.footer, 'name'), required(parts.join(FOOTER_SEPARATOR), 'footer'), t.footer, 'footer'));
  }

  const year = config.year.padStart(4, '0');
  type.push(setYear(face(t.yearLeft, 'meta'), year.slice(0, 2), t.yearLeft));
  type.push(setYear(face(t.yearRight, 'meta'), year.slice(2), t.yearRight));

  const rules = t.rules
    .map((rule) => `<line x1="${rule.x1}" y1="${rule.y1}" x2="${rule.x2}" y2="${rule.y2}" stroke-width="${rule.width}"/>`)
    .join('');
  // Where something sits across the die, a ring is cut away round it: a mask over that ring alone,
  // paper inside each cut. It is keyed by the stamp's id, like the wear, so two stamps on one page
  // never share an element id.
  const cutSeed = hashSeed(`${config.id}:cut`).toString(36);
  const [bx, by, bw, bh] = t.viewBox;
  const die = t.die.map((ring, index) => {
    const path = `<path d="${ring.d}" stroke-width="${ring.stroke}"/>`;
    const cuts = (t.dieCuts ?? []).filter((cut) => !cut.rings || cut.rings.includes(index));
    if (!cuts.length) return path;
    const id = `cut-${cutSeed}-${index}`;
    return `<mask id="${id}" maskUnits="userSpaceOnUse" x="${bx}" y="${by}" width="${bw}" height="${bh}">`
      + `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#fff" stroke="none"/>`
      + cuts.map((cut) => `<circle cx="${cut.cx}" cy="${cut.cy}" r="${cut.r}" fill="#000" stroke="none"/>`).join('')
      + `</mask><g mask="url(#${id})">${path}</g>`;
  }).join('');

  const [vx, vy, vw, vh] = t.viewBox;
  const wear = assets.wear?.length ? wearMask(config.id, assets.wear, t.viewBox) : null;
  // The impression's shapes, with no colour of their own: strokes for the die and the rules, fills
  // for the type and the artwork. The ink is given where they are drawn.
  const shapes = [
    `<g fill="none" stroke-linecap="round">${die}${rules}</g>`,
    '<g stroke="none" fill-rule="evenodd">',
    type.map((d) => `<path d="${d}"/>`).join(''),
    placeEmblem(assets.emblem, t.emblem, type.slice(-2)),
    placeArt(assets.heartPaw, t.heartPaw),
    '</g>',
  ].join('');
  const open = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${vw} ${vh}">`;
  const worn = (inner: string) => (wear
    ? `<g mask="url(#${wear.id})"><g transform="${wear.transform}">${inner}</g></g>`
    : `<g>${inner}</g>`);

  if (config.ink !== OFFSET) {
    return `${open}${wear ? wear.defs : ''}${worn(`<g fill="${config.ink}" stroke="${config.ink}">${shapes}</g>`)}</svg>`;
  }

  // Two passes of the same impression, each a few units off, turned a fraction of a degree the
  // other way; where both land, the dark plum, cut to the first pass's shapes by a mask.
  const seed = hashSeed(`${config.id}:offset`);
  const next = seededRandom(seed);
  const dx = seededRange(next, 3, 6);
  const dy = seededRange(next, -4, 4);
  const turn = seededRange(next, 0.08, 0.22);
  const cx = (vx + vw / 2).toFixed(1);
  const cy = (vy + vh / 2).toFixed(1);
  const first = `translate(${(-dx).toFixed(1)} ${(-dy).toFixed(1)}) rotate(${(-turn).toFixed(2)} ${cx} ${cy})`;
  const second = `translate(${dx.toFixed(1)} ${dy.toFixed(1)}) rotate(${turn.toFixed(2)} ${cx} ${cy})`;
  const id = seed.toString(36);
  const defs = [
    '<defs>',
    `<g id="ink-${id}">${shapes}</g>`,
    `<mask id="both-${id}" maskUnits="userSpaceOnUse" x="${vx - 40}" y="${vy - 40}" width="${vw + 80}" height="${vh + 80}">`,
    `<use href="#ink-${id}" transform="${first}" fill="#fff" stroke="#fff"/></mask>`,
    '</defs>',
  ].join('');
  const passes = [
    `<use href="#ink-${id}" transform="${first}" fill="${OFFSET_INK.first}" stroke="${OFFSET_INK.first}"/>`,
    `<use href="#ink-${id}" transform="${second}" fill="${OFFSET_INK.second}" stroke="${OFFSET_INK.second}"/>`,
    `<g mask="url(#both-${id})"><use href="#ink-${id}" transform="${second}" fill="${OFFSET_INK.both}" stroke="${OFFSET_INK.both}"/></g>`,
  ].join('');
  return `${open}${defs}${wear ? wear.defs : ''}${worn(passes)}</svg>`;
}
