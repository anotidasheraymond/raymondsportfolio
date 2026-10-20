import type { Font, Glyph, PathCommand } from 'opentype.js';

// Type set as paths. A stamp never carries <text>: every letter is the font's own outline, placed
// here, so no device can substitute a face, an export looks the same as the screen, and a name can
// be measured before it is placed.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export type LineSpec = {
  /** Cap height in the stamp's units; the font size is derived from it and the face's own caps. */
  cap: number;
  /** Extra space between letters, as a fraction of the cap height. */
  tracking: number;
  /** Set width: the letters drawn this much wider than the face (1 is the face as cut). */
  stretch?: number;
  /**
   * The separator (•) as the owner's stamps print it: a round dot this wide, its centre `rise`
   * above the baseline, whatever the letters' set width, with `gap` more space either side of it
   * where the stamp sets its parts well apart. Left out, the face's own bullet is drawn.
   */
  dot?: { size: number; rise: number; gap?: number };
  /**
   * The dash (-) as some of the owner's dates print it: a bar `width` long and `thickness` deep,
   * its centre `rise` above the baseline, with `gap` more room either side. Left out, the face's own
   * hyphen is drawn.
   */
  dash?: { width: number; thickness: number; rise: number; gap: number };
};

type Placed = { glyph: Glyph; char: string; x: number; advance: number };

const DASH = '-';

const SEPARATOR = '•';

const round = (value: number) => Math.round(value * 10) / 10;

const capHeights = new WeakMap<Font, number>();

/**
 * The font size that gives a face this cap height. The height is the drawn H's, measured off its
 * outline: a face's declared cap height (OS/2) is not always the height its capitals are drawn,
 * and Oswald's is a tenth taller than its H.
 */
export function sizeForCap(font: Font, cap: number): number {
  let capHeight = capHeights.get(font);
  if (capHeight === undefined) {
    const box = font.charToGlyph('H').getBoundingBox();
    capHeight = box.y2 > 0 ? box.y2 : font.unitsPerEm * 0.7;
    capHeights.set(font, capHeight);
  }
  return (cap * font.unitsPerEm) / capHeight;
}

/** Lay a line out along x from 0, kerned and tracked; returns each glyph's start and the width. */
function layout(font: Font, text: string, spec: LineSpec): { placed: Placed[]; width: number } {
  const size = sizeForCap(font, spec.cap);
  const scale = (size / font.unitsPerEm) * (spec.stretch ?? 1);
  const track = spec.tracking * spec.cap;
  // One glyph per character, straight from the cmap. Stamps set capitals, figures and a few marks,
  // which need no shaping, and the shaper refuses some faces' composition tables.
  const chars = Array.from(text);
  const glyphs = chars.map((character) => font.charToGlyph(character));
  const placed: Placed[] = [];
  let x = 0;
  // A separator's or a dash's own room, either side of it.
  const room = (char: string) => (char === SEPARATOR ? spec.dot?.gap ?? 0 : char === DASH && spec.dash ? spec.dash.gap : 0);
  glyphs.forEach((glyph, index) => {
    const char = chars[index];
    x += room(char);
    const advance = char === DASH && spec.dash ? spec.dash.width : (glyph.advanceWidth ?? 0) * scale;
    placed.push({ glyph, char, x, advance });
    x += advance + room(char);
    const next = glyphs[index + 1];
    if (next) x += font.getKerningValue(glyph, next) * scale + track;
  });
  return { placed, width: x };
}

/** The width a line takes, for fitting before it is placed. */
export function measureLine(font: Font, text: string, spec: LineSpec): number {
  return layout(font, text, spec).width;
}

type Transform = (x: number, y: number) => [number, number];

function commandsToD(commands: PathCommand[], transform: Transform): string {
  const out: string[] = [];
  for (const command of commands) {
    switch (command.type) {
      case 'M':
      case 'L': {
        const [x, y] = transform(command.x, command.y);
        out.push(`${command.type}${round(x)} ${round(y)}`);
        break;
      }
      case 'Q': {
        const [x1, y1] = transform(command.x1, command.y1);
        const [x, y] = transform(command.x, command.y);
        out.push(`Q${round(x1)} ${round(y1)} ${round(x)} ${round(y)}`);
        break;
      }
      case 'C': {
        const [x1, y1] = transform(command.x1, command.y1);
        const [x2, y2] = transform(command.x2, command.y2);
        const [x, y] = transform(command.x, command.y);
        out.push(`C${round(x1)} ${round(y1)} ${round(x2)} ${round(y2)} ${round(x)} ${round(y)}`);
        break;
      }
      case 'Z':
        out.push('Z');
        break;
      default:
        break;
    }
  }
  return out.join('');
}

/**
 * The separator dot in a glyph's own coordinates (y down, baseline at 0), centred at (cx, -rise).
 * Its x is given before the set width is applied, so it comes out round after it.
 */
function dotCommands(cx: number, dot: NonNullable<LineSpec['dot']>, stretch: number): PathCommand[] {
  const r = dot.size / 2;
  const k = r * 0.5523;
  const cy = -dot.rise;
  const x = (dx: number) => cx + dx / stretch;
  return [
    { type: 'M', x: x(r), y: cy },
    { type: 'C', x1: x(r), y1: cy + k, x2: x(k), y2: cy + r, x: x(0), y: cy + r },
    { type: 'C', x1: x(-k), y1: cy + r, x2: x(-r), y2: cy + k, x: x(-r), y: cy },
    { type: 'C', x1: x(-r), y1: cy - k, x2: x(-k), y2: cy - r, x: x(0), y: cy - r },
    { type: 'C', x1: x(k), y1: cy - r, x2: x(r), y2: cy - k, x: x(r), y: cy },
    { type: 'Z' },
  ] as PathCommand[];
}

/** A date's dash in a glyph's own coordinates (y down, baseline at 0), a bar centred on cx. */
function dashCommands(cx: number, dash: NonNullable<LineSpec['dash']>, stretch: number): PathCommand[] {
  const half = dash.width / 2 / stretch;
  const top = -dash.rise - dash.thickness / 2;
  const bottom = -dash.rise + dash.thickness / 2;
  return [
    { type: 'M', x: cx - half, y: top },
    { type: 'L', x: cx + half, y: top },
    { type: 'L', x: cx + half, y: bottom },
    { type: 'L', x: cx - half, y: bottom },
    { type: 'Z' },
  ] as PathCommand[];
}

/** A straight line of type, centred on x with its baseline at y. */
export function straightLine(font: Font, text: string, spec: LineSpec, x: number, y: number): { d: string; width: number } {
  const { placed, width } = layout(font, text, spec);
  const size = sizeForCap(font, spec.cap);
  const stretch = spec.stretch ?? 1;
  const left = x - width / 2;
  const d = placed
    .map(({ glyph, char, x: gx, advance }) => {
      const commands = char === SEPARATOR && spec.dot
        ? dotCommands(advance / 2 / stretch, spec.dot, stretch)
        : char === DASH && spec.dash
          ? dashCommands(advance / 2 / stretch, spec.dash, stretch)
          : glyph.getPath(0, 0, size).commands;
      return commandsToD(commands, (px, py) => [left + gx + px * stretch, y + py]);
    })
    .join('');
  return { d, width };
}

export type ArcSpec = LineSpec & {
  /** The centre of the curve the baseline follows. */
  cx: number;
  cy: number;
  /** The baseline's radius; on an oval, its horizontal semi-axis. */
  r: number;
  /** An oval baseline's vertical semi-axis. Left out, the baseline is a circle of radius r. */
  ry?: number;
  /**
   * The baseline runs this far inside the circle or oval, along its normal: parallel to a die's
   * ring, as the owner's clinic oval sets its type. Left out, the baseline is the curve itself.
   */
  inset?: number;
  /** 'top' reads over the top of the curve, letters upright and outward; 'bottom' smiles along
   * the foot, letters upright and inward. */
  side: 'top' | 'bottom';
};

type Curve = Pick<ArcSpec, 'cx' | 'cy' | 'r' | 'ry' | 'inset' | 'side'>;

/** The baseline's point at a parameter angle: on the curve, or `inset` inside it along its normal. */
function pointAt(curve: Curve, t: number): [number, number] {
  const ry = curve.ry ?? curve.r;
  const x = curve.cx + curve.r * Math.cos(t);
  const y = curve.cy + ry * Math.sin(t);
  const inset = curve.inset ?? 0;
  if (!inset) return [x, y];
  // The ellipse's inward normal at t.
  const nx = -ry * Math.cos(t);
  const ny = -curve.r * Math.sin(t);
  const length = Math.hypot(nx, ny);
  return [x + (inset * nx) / length, y + (inset * ny) / length];
}

/** Steps per half turn when an oval's length is walked; enough for a tenth of a unit at stamp size. */
const STEPS = 2048;

/**
 * The parameter angle a distance along the baseline reaches, measured from the middle of its side
 * (the top or the foot) and positive in reading order. A circle has it in closed form; an oval is
 * walked by arc length, so letters stand evenly spaced however the curve tightens at the ends.
 */
function parameterAt(curve: Curve): (distance: number) => number {
  const top = curve.side === 'top';
  const centre = top ? -Math.PI / 2 : Math.PI / 2;
  // Over the top reading order runs with the parameter; along the foot, against it.
  const sign = top ? 1 : -1;
  const ry = curve.ry ?? curve.r;
  if (ry === curve.r) return (distance) => centre + (sign * distance) / (curve.r - (curve.inset ?? 0));
  const step = Math.PI / STEPS;
  // lengths[k] is the distance along the baseline from the centre to centre + k * step.
  const lengths = [0];
  let previous = pointAt(curve, centre);
  for (let k = 1; k <= STEPS; k += 1) {
    const point = pointAt(curve, centre + k * step);
    lengths.push(lengths[k - 1] + Math.hypot(point[0] - previous[0], point[1] - previous[1]));
    previous = point;
  }
  // The oval is symmetric about its vertical axis, so one side's table serves both directions.
  return (distance) => {
    const d = Math.min(Math.abs(distance), lengths[STEPS]);
    let lo = 0;
    let hi = STEPS;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (lengths[mid] <= d) lo = mid;
      else hi = mid;
    }
    const span = lengths[hi] - lengths[lo];
    const offset = (lo + (span > 0 ? (d - lengths[lo]) / span : 0)) * step;
    return centre + sign * Math.sign(distance) * offset;
  };
}

/** The length of baseline a span of the curve's parameter holds, centred on its side. */
export function arcLength(curve: Curve, spanDeg: number): number {
  const ry = curve.ry ?? curve.r;
  const half = (spanDeg * Math.PI) / 360;
  if (ry === curve.r) return 2 * half * (curve.r - (curve.inset ?? 0));
  const steps = Math.max(8, Math.ceil((STEPS * half) / Math.PI));
  const step = half / steps;
  const centre = curve.side === 'top' ? -Math.PI / 2 : Math.PI / 2;
  let length = 0;
  let previous = pointAt(curve, centre);
  for (let k = 1; k <= steps; k += 1) {
    const point = pointAt(curve, centre + k * step);
    length += Math.hypot(point[0] - previous[0], point[1] - previous[1]);
    previous = point;
  }
  return 2 * length;
}

/** A line of type along an arc of a circle or an oval, centred on the top or the foot. */
export function arcLine(font: Font, text: string, spec: ArcSpec): { d: string; width: number; spanDeg: number } {
  const { placed, width } = layout(font, text, spec);
  const size = sizeForCap(font, spec.cap);
  const stretch = spec.stretch ?? 1;
  const ry = spec.ry ?? spec.r;
  const top = spec.side === 'top';
  const at = parameterAt(spec);
  const d = placed.map(({ glyph, char, x: gx, advance }) => {
    const t = at(gx + advance / 2 - width / 2);
    const [bx, by] = pointAt(spec, t);
    // The letter stands on the curve's tangent, turned to read left to right on either side.
    const rotation = top
      ? Math.atan2(ry * Math.cos(t), -spec.r * Math.sin(t))
      : Math.atan2(-ry * Math.cos(t), spec.r * Math.sin(t));
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    // The glyph is drawn centred on its own advance, baseline at 0, then turned onto the curve.
    const commands = char === SEPARATOR && spec.dot
      ? dotCommands(0, spec.dot, stretch)
      : char === DASH && spec.dash
        ? dashCommands(0, spec.dash, stretch)
        : glyph.getPath(-advance / 2 / stretch, 0, size).commands;
    return commandsToD(commands, (px, py) => {
      const sx = px * stretch;
      return [bx + sx * cos - py * sin, by + sx * sin + py * cos];
    });
  }).join('');
  const spanDeg = Math.abs(at(width / 2) - at(-width / 2)) * (180 / Math.PI);
  return { d, width, spanDeg };
}
