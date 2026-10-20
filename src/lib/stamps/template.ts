// A layout family: the authored composition of one kind of stamp. Every position here was measured
// off the owner's stamps (the demo set in handoff/reference/assets/stamps-demo and the references
// in tools/stamps/references) and is part of the design. The compiler never
// decides where anything goes; it fills these slots.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export type Box = { x: number; y: number; width: number; height: number };

/** Which bundled face a slot is set in (compile.StampFonts). */
export type Face = 'claim' | 'name' | 'meta';

/** The separator dot as a stamp prints it (glyphs.LineSpec.dot). */
export type Dot = { size: number; rise: number; gap?: number };

/** A date's dash as a stamp prints it (glyphs.LineSpec.dash). */
export type Dash = { width: number; thickness: number; rise: number; gap: number };

export type ArcSlot = {
  kind: 'arc';
  cx: number;
  cy: number;
  /** The baseline's radius; on an oval, its horizontal semi-axis. */
  r: number;
  /** An oval baseline's vertical semi-axis; left out, the baseline is a circle. */
  ry?: number;
  /** The baseline runs this far inside the circle or oval, parallel to it (glyphs.ArcSpec.inset). */
  inset?: number;
  side: 'top' | 'bottom';
  /** Cap height at its largest, and the smallest it may be set before a longer layout is tried. */
  cap: number;
  minCap: number;
  tracking: number;
  /** The set width the stamp cutter used (glyphs.LineSpec.stretch). */
  stretch?: number;
  /** The widest the line may run, in degrees of its curve's parameter (on a circle, of arc). */
  maxSpanDeg: number;
  /**
   * The owner's stamps set a business name to fill its arc: a short name is cut large, a long one
   * small, and every name runs the same span. The cap is chosen so the line runs `spanDeg`, no
   * larger than `maxCap` (the room between the baseline and what stands above it) and no smaller
   * than minCap. Left out, the line is set at `cap` and only shrinks.
   */
  fill?: { spanDeg: number; maxCap: number };
  /**
   * The least room a name keeps from the die's rings, in the stamp's units. A name large enough to
   * fill its arc can reach a ring (a star's notch, an oval's shoulder); its cap comes down until it
   * keeps this much. The owner's prints set their names at least this far off the rings.
   */
  dieGap?: number;
  dot?: Dot;
  face?: Face;
};

export type LineSlot = {
  kind: 'line';
  /** Centre of the line. */
  x: number;
  /** Baseline. */
  y: number;
  cap: number;
  minCap: number;
  tracking: number;
  stretch?: number;
  maxWidth: number;
  dot?: Dot;
  /** A date's dashes as the stamp prints them (glyphs.LineSpec.dash). */
  dash?: Dash;
  face?: Face;
};

export type Rule = { x1: number; y1: number; x2: number; y2: number; width: number };

/** The year split either side of the emblem, "20" and "26", each centred on x with its baseline at y. */
export type YearSlot = { x: number; y: number; cap: number; stretch?: number; tracking?: number; face?: Face };

export type StampTemplate = {
  id: string;
  /** The die this family is cut on, in the database's terms (stamp_templates.shape). */
  shape: string;
  /** The stamp's own bounds on its reference's canvas, with room for the outer ring's stroke. */
  viewBox: [number, number, number, number];
  die: Array<{ d: string; stroke: number }>;
  /** Where the die is cut away for something that sits across it (the heart-paw's tip): circles
   * inside which no ring is printed, on every ring or on the rings named by their index. */
  dieCuts?: Array<{ cx: number; cy: number; r: number; rings?: number[] }>;
  rules: Rule[];
  businessName: ArcSlot | LineSlot;
  /**
   * The animal's box. `yearGap` is the least room it keeps from each half of the split year, as the
   * family's print keeps its own animal: an animal of another shape (a beaver's tail where the print
   * has an eagle's feet) is drawn smaller, on the same floor, until it clears.
   */
  emblem: Box & { yearGap?: number };
  yearLeft: YearSlot;
  yearRight: YearSlot;
  /** The service claim, the stamp's dominant line. A clinic's family has none. */
  claim?: LineSlot;
  /** A claim too long for one line at minCap is set on two, at this cap, `gap` apart. */
  claimTwoLines?: { cap: number; gap: number };
  /** The visit date, where the family prints one. */
  date?: LineSlot;
  location?: ArcSlot | LineSlot;
  /** A clinic's address, one slot per line. */
  addressLines?: LineSlot[];
  /** A clinic's supporting lines round the foot, printed with the separator between them. */
  footer?: ArcSlot;
  heartPaw: Box;
  /** Which of the owner's marks this family prints (assets/stamps/brand/<name>.svg): the outline
   * heart round a solid paw that most of the owner's stamps carry, Roncy's solid heart, or the
   * plain paw of the Oakville clinic. */
  heartPawArt: 'heart-paw-v1' | 'heart-paw-outline-v1' | 'paw-v1';
};

/** A rounded rectangle's outline, as the die's ring. */
export function roundedRect(x: number, y: number, width: number, height: number, radius: number): string {
  const r = Math.min(radius, width / 2, height / 2);
  const right = x + width;
  const bottom = y + height;
  return [
    `M${x + r} ${y}`, `H${right - r}`, `A${r} ${r} 0 0 1 ${right} ${y + r}`,
    `V${bottom - r}`, `A${r} ${r} 0 0 1 ${right - r} ${bottom}`,
    `H${x + r}`, `A${r} ${r} 0 0 1 ${x} ${bottom - r}`,
    `V${y + r}`, `A${r} ${r} 0 0 1 ${x + r} ${y}`, 'Z',
  ].join('');
}

/** A circle's outline, as the die's ring: two half arcs, so every renderer draws it the same. */
export function circle(cx: number, cy: number, r: number): string {
  return ellipse(cx, cy, r, r);
}

/** An ellipse's outline, as the die's ring. */
export function ellipse(cx: number, cy: number, rx: number, ry: number): string {
  return `M${cx - rx} ${cy}A${rx} ${ry} 0 1 1 ${cx + rx} ${cy}A${rx} ${ry} 0 1 1 ${cx - rx} ${cy}Z`;
}

const at = (value: number) => Math.round(value * 10) / 10;

/**
 * An ellipse's outline left open between two parameter angles (degrees, 0 east, 90 south), where
 * the die is cut away for something that passes through it: the heart's tip on the owner's oval.
 */
export function openEllipse(cx: number, cy: number, rx: number, ry: number, gapFrom: number, gapTo: number): string {
  const point = (deg: number) => {
    const t = (deg * Math.PI) / 180;
    return `${at(cx + rx * Math.cos(t))} ${at(cy + ry * Math.sin(t))}`;
  };
  // From the gap's far end clockwise all the way round to its near end, in two arcs.
  const middle = gapTo + (360 - (gapTo - gapFrom)) / 2;
  return `M${point(gapTo)}A${rx} ${ry} 0 0 1 ${point(middle)}A${rx} ${ry} 0 0 1 ${point(gapFrom + 360)}`;
}

/**
 * A closed polygon's outline with its corners rounded, as the die's ring: one radius for every
 * corner, or one per corner. Points run clockwise on screen; a radius of 0 leaves a corner sharp.
 */
/**
 * One corner of a die's outline rounded: where the round leaves the edge coming in (`from`) and
 * the arc that turns it onto the edge going out. The outline runs clockwise on screen.
 */
function roundCorner(previous: [number, number], [x, y]: [number, number], next: [number, number], radius: number): { from: string; arc: string } {
  const [px, py] = previous;
  const [nx, ny] = next;
  const inLength = Math.hypot(x - px, y - py);
  const outLength = Math.hypot(nx - x, ny - y);
  // The corner's turn, and how far back along each edge the round begins.
  const cos = ((px - x) * (nx - x) + (py - y) * (ny - y)) / (inLength * outLength);
  const half = Math.acos(Math.max(-1, Math.min(1, cos))) / 2;
  const trim = Math.min(radius / Math.tan(half), inLength / 2, outLength / 2);
  const r = trim * Math.tan(half);
  const ax = x + ((px - x) / inLength) * trim;
  const ay = y + ((py - y) / inLength) * trim;
  const bx = x + ((nx - x) / outLength) * trim;
  const by = y + ((ny - y) / outLength) * trim;
  return {
    from: `${at(ax)} ${at(ay)}`,
    arc: r > 0 ? `A${at(r)} ${at(r)} 0 0 1 ${at(bx)} ${at(by)}` : `L${at(bx)} ${at(by)}`,
  };
}

export function roundedPolygon(points: Array<[number, number]>, radii: number | number[]): string {
  const n = points.length;
  const parts: string[] = [];
  points.forEach((point, index) => {
    const radius = typeof radii === 'number' ? radii : radii[index];
    const corner = roundCorner(points[(index + n - 1) % n], point, points[(index + 1) % n], radius);
    parts.push(`${index === 0 ? 'M' : 'L'}${corner.from}`, corner.arc);
  });
  return `${parts.join('')}Z`;
}

/**
 * An octagon cut square to its box with its four corners taken off at 45 degrees: `cutTop` along
 * the top edge and down the sides from it, `cutBottom` along the foot and up the sides from it.
 */
export function octagon(left: number, top: number, right: number, bottom: number, cutTop: number, cutBottom: number, radius: number): string {
  return roundedPolygon([
    [left + cutTop, top], [right - cutTop, top], [right, top + cutTop], [right, bottom - cutBottom],
    [right - cutBottom, bottom], [left + cutBottom, bottom], [left, bottom - cutBottom], [left, top + cutTop],
  ], radius);
}

/**
 * A five-pointed star drawn as the owner's are, symmetric about x = axis: each pair of points
 * given as [half width, y] from the top point clockwise (upper notches, arm tips, lower notches,
 * feet), the tips rounded to `tip` and the notches to `notch`.
 */
export function star(
  axis: number,
  top: number,
  pairs: { upperNotch: [number, number]; arm: [number, number]; lowerNotch: [number, number]; foot: [number, number] },
  bottomNotch: number,
  tip: number,
  notch: number,
): string {
  const right = ([half, y]: [number, number]): [number, number] => [axis + half, y];
  const left = ([half, y]: [number, number]): [number, number] => [axis - half, y];
  return roundedPolygon([
    [axis, top], right(pairs.upperNotch), right(pairs.arm), right(pairs.lowerNotch), right(pairs.foot),
    [axis, bottomNotch], left(pairs.foot), left(pairs.lowerNotch), left(pairs.arm), left(pairs.upperNotch),
  ], [tip, notch, tip, notch, tip, notch, tip, notch, tip, notch]);
}

/**
 * A hexagon standing on a point, symmetric about x = axis: the top point, the upper and lower
 * shoulders as [half width, y], the bottom point, every corner rounded to `radius`.
 */
export function hexagon(axis: number, top: number, upper: [number, number], lower: [number, number], bottom: number, radius: number): string {
  return roundedPolygon([
    [axis, top], [axis + upper[0], upper[1]], [axis + lower[0], lower[1]],
    [axis, bottom], [axis - lower[0], lower[1]], [axis - upper[0], upper[1]],
  ], radius);
}

/**
 * A shield, symmetric about x = axis: a peak, two shoulders ([half width, y]), straight sides down
 * to `sideEnd`, and each lower side one curve into the bottom point, leaving its straight side
 * tangent to it (`handle` below `sideEnd`) and arriving at the point from `tip` ([dx, dy] back from
 * it). The peak and the shoulders are rounded.
 */
export function shield(
  axis: number,
  peak: number,
  shoulder: [number, number],
  sideEnd: number,
  handle: number,
  tip: [number, number],
  bottom: number,
  radii: { peak: number; shoulder: number },
): string {
  const [half, shoulderY] = shoulder;
  const top: [number, number] = [axis, peak];
  const right: [number, number] = [axis + half, shoulderY];
  const left: [number, number] = [axis - half, shoulderY];
  const rightFoot: [number, number] = [axis + half, sideEnd];
  const leftFoot: [number, number] = [axis - half, sideEnd];
  const peakCorner = roundCorner(left, top, right, radii.peak);
  const rightCorner = roundCorner(top, right, rightFoot, radii.shoulder);
  const leftCorner = roundCorner(leftFoot, left, top, radii.shoulder);
  const [dx, dy] = tip;
  return [
    `M${peakCorner.from}`, peakCorner.arc,
    `L${rightCorner.from}`, rightCorner.arc,
    `L${at(axis + half)} ${at(sideEnd)}`,
    `C${at(axis + half)} ${at(sideEnd + handle)} ${at(axis + dx)} ${at(bottom - dy)} ${at(axis)} ${at(bottom)}`,
    `C${at(axis - dx)} ${at(bottom - dy)} ${at(axis - half)} ${at(sideEnd + handle)} ${at(axis - half)} ${at(sideEnd)}`,
    `L${leftCorner.from}`, leftCorner.arc,
    'Z',
  ].join('');
}

/**
 * A ticket, symmetric about x = axis: a rectangle (its edges' centrelines, `half` either side of
 * the axis, `top` and `bottom`) with each corner cut away by a circle round it and a round notch in
 * each side. Each circle is [its centre's distance out from the axis, its centre's y, its radius]:
 * one for the top corners, one for the bottom corners, one for the notches.
 */
export function ticket(
  axis: number,
  half: number,
  top: number,
  bottom: number,
  topCorner: [number, number, number],
  bottomCorner: [number, number, number],
  notch: [number, number, number],
): string {
  // Where a circle centred `dx` out from the axis crosses a side, and where it crosses a top or foot.
  const onSide = ([dx, cy, r]: [number, number, number], sign: 1 | -1) => cy + sign * Math.sqrt(r * r - (dx - half) ** 2);
  const onEdge = ([dx, cy, r]: [number, number, number], y: number) => dx - Math.sqrt(r * r - (y - cy) ** 2);
  const topIn = onEdge(topCorner, top);
  const bottomIn = onEdge(bottomCorner, bottom);
  const topSide = onSide(topCorner, 1);
  const bottomSide = onSide(bottomCorner, -1);
  const notchTop = onSide(notch, -1);
  const notchFoot = onSide(notch, 1);
  const [, , rt] = topCorner;
  const [, , rb] = bottomCorner;
  const [, , rn] = notch;
  // The cuts curve into the ticket, so every arc turns against the outline's clockwise run.
  const arc = (r: number, x: number, y: number) => `A${at(r)} ${at(r)} 0 0 0 ${at(x)} ${at(y)}`;
  return [
    `M${at(axis - topIn)} ${at(top)}`, `H${at(axis + topIn)}`,
    arc(rt, axis + half, topSide), `V${at(notchTop)}`,
    arc(rn, axis + half, notchFoot), `V${at(bottomSide)}`,
    arc(rb, axis + bottomIn, bottom), `H${at(axis - bottomIn)}`,
    arc(rb, axis - half, bottomSide), `V${at(notchFoot)}`,
    arc(rn, axis - half, notchTop), `V${at(topSide)}`,
    arc(rt, axis - topIn, top), 'Z',
  ].join('');
}
