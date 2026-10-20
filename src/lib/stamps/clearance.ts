// How near the parts of a stamp come to each other, measured on their outlines: a name set large
// enough to fill its arc must not run into the die's rings, and a country's animal, whatever its
// shape, must not run into the split year either side of it. The owner's prints keep both apart;
// the compiler keeps them apart the same way for every name and every animal.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export type Point = [number, number];

const NUMBER = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;

/** A point every `step` units along a straight run, the end included. */
function line(out: Point[], from: Point, to: Point, step: number) {
  const n = Math.max(1, Math.ceil(Math.hypot(to[0] - from[0], to[1] - from[1]) / step));
  for (let k = 1; k <= n; k += 1) out.push([from[0] + ((to[0] - from[0]) * k) / n, from[1] + ((to[1] - from[1]) * k) / n]);
}

/** A curve given as a function of 0..1, sampled finely enough for `step`. */
function curve(out: Point[], at: (t: number) => Point, roughLength: number, step: number) {
  const n = Math.max(2, Math.ceil(roughLength / step));
  for (let k = 1; k <= n; k += 1) out.push(at(k / n));
}

/** An SVG elliptical arc from its endpoints to its centre form (SVG 1.1 appendix F.6.5). */
function arc(out: Point[], from: Point, values: number[], step: number) {
  let [rx, ry] = [Math.abs(values[0]), Math.abs(values[1])];
  const phi = (values[2] * Math.PI) / 180;
  const [large, sweep] = [values[3] !== 0, values[4] !== 0];
  const to: Point = [values[5], values[6]];
  if (!rx || !ry) {
    line(out, from, to, step);
    return;
  }
  const [cos, sin] = [Math.cos(phi), Math.sin(phi)];
  const dx = (from[0] - to[0]) / 2;
  const dy = (from[1] - to[1]) / 2;
  const x1 = cos * dx + sin * dy;
  const y1 = -sin * dx + cos * dy;
  const lambda = (x1 * x1) / (rx * rx) + (y1 * y1) / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  const numerator = rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1;
  const root = Math.sqrt(Math.max(0, numerator / (rx * rx * y1 * y1 + ry * ry * x1 * x1)));
  const sign = large === sweep ? -1 : 1;
  const cx1 = (sign * root * rx * y1) / ry;
  const cy1 = (-sign * root * ry * x1) / rx;
  const cx = cos * cx1 - sin * cy1 + (from[0] + to[0]) / 2;
  const cy = sin * cx1 + cos * cy1 + (from[1] + to[1]) / 2;
  const angle = (ux: number, uy: number, vx: number, vy: number) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const start = angle(1, 0, (x1 - cx1) / rx, (y1 - cy1) / ry);
  let delta = angle((x1 - cx1) / rx, (y1 - cy1) / ry, (-x1 - cx1) / rx, (-y1 - cy1) / ry);
  if (!sweep && delta > 0) delta -= 2 * Math.PI;
  if (sweep && delta < 0) delta += 2 * Math.PI;
  curve(out, (t) => {
    const theta = start + delta * t;
    const [ex, ey] = [rx * Math.cos(theta), ry * Math.sin(theta)];
    return [cos * ex - sin * ey + cx, sin * ex + cos * ey + cy];
  }, Math.abs(delta) * Math.max(rx, ry), step);
}

/**
 * Points along a path's outline, no further apart than about `step`. Reads the absolute commands
 * the die helpers and the glyph layout write: M, L, H, V, A, Q, C and Z.
 */
export function outlinePoints(d: string, step: number): Point[] {
  const out: Point[] = [];
  let at: Point = [0, 0];
  let start: Point = [0, 0];
  for (const [, command, args] of d.matchAll(/([MLHVAQCZ])([^MLHVAQCZ]*)/g)) {
    const v = (args.match(NUMBER) ?? []).map(Number);
    switch (command) {
      case 'M':
        at = [v[0], v[1]];
        start = at;
        out.push(at);
        for (let k = 2; k + 1 < v.length; k += 2) {
          line(out, at, [v[k], v[k + 1]], step);
          at = [v[k], v[k + 1]];
        }
        break;
      case 'L':
        for (let k = 0; k + 1 < v.length; k += 2) {
          line(out, at, [v[k], v[k + 1]], step);
          at = [v[k], v[k + 1]];
        }
        break;
      case 'H':
        line(out, at, [v[0], at[1]], step);
        at = [v[0], at[1]];
        break;
      case 'V':
        line(out, at, [at[0], v[0]], step);
        at = [at[0], v[0]];
        break;
      case 'A':
        for (let k = 0; k + 7 <= v.length; k += 7) {
          arc(out, at, v.slice(k, k + 7), step);
          at = [v[k + 5], v[k + 6]];
        }
        break;
      case 'Q':
        for (let k = 0; k + 4 <= v.length; k += 4) {
          const [p0, p1, p2] = [at, [v[k], v[k + 1]] as Point, [v[k + 2], v[k + 3]] as Point];
          const rough = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) + Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
          curve(out, (t) => [
            (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
            (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1],
          ], rough, step);
          at = p2;
        }
        break;
      case 'C':
        for (let k = 0; k + 6 <= v.length; k += 6) {
          const [p0, p1, p2, p3] = [at, [v[k], v[k + 1]] as Point, [v[k + 2], v[k + 3]] as Point, [v[k + 4], v[k + 5]] as Point];
          const rough = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) + Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) + Math.hypot(p3[0] - p2[0], p3[1] - p2[1]);
          curve(out, (t) => {
            const u = 1 - t;
            return [
              u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
              u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
            ];
          }, rough, step);
          at = p3;
        }
        break;
      case 'Z':
        line(out, at, start, step);
        at = start;
        break;
    }
  }
  return out;
}

/**
 * Stroked centre lines (a die's rings, each with half its stroke either side), bucketed so that
 * "is anything within this distance" asks only the few cells near a point.
 */
export class StrokeField {
  private readonly cells = new Map<string, Array<[number, number, number]>>();

  constructor(strokes: Array<{ points: Point[]; half: number }>, private readonly size = 48) {
    for (const { points, half } of strokes) {
      for (const [x, y] of points) {
        const key = `${Math.floor(x / size)},${Math.floor(y / size)}`;
        const cell = this.cells.get(key);
        if (cell) cell.push([x, y, half]);
        else this.cells.set(key, [[x, y, half]]);
      }
    }
  }

  /** Whether every point keeps at least `gap` from the strokes' ink. */
  clears(points: Point[], gap: number): boolean {
    for (const [x, y] of points) {
      const cx = Math.floor(x / this.size);
      const cy = Math.floor(y / this.size);
      // Far enough out to hold the gap and the widest half-stroke, which is under a cell.
      const reach = 1 + Math.ceil(gap / this.size);
      for (let i = cx - reach; i <= cx + reach; i += 1) {
        for (let j = cy - reach; j <= cy + reach; j += 1) {
          const cell = this.cells.get(`${i},${j}`);
          if (!cell) continue;
          for (const [px, py, half] of cell) {
            const room = gap + half;
            const ddx = px - x;
            const ddy = py - y;
            if (ddx * ddx + ddy * ddy < room * room) return false;
          }
        }
      }
    }
    return true;
  }
}

/**
 * The least distance from any point to a band of an artwork's ink: each row of `rows` is the
 * leftmost and rightmost ink across one horizontal slice of the artwork (null where it has none),
 * the artwork placed at (x, y) and scaled by `scale`.
 */
export function distanceToRows(points: Point[], rows: Array<[number, number] | null>, height: number, x: number, y: number, scale: number): number {
  const band = (height / rows.length) * scale;
  let least = Infinity;
  rows.forEach((row, index) => {
    if (!row) return;
    const left = x + row[0] * scale;
    const right = x + row[1] * scale;
    const top = y + index * band;
    const bottom = top + band;
    for (const [px, py] of points) {
      const dx = px < left ? left - px : px > right ? px - right : 0;
      const dy = py < top ? top - py : py > bottom ? py - bottom : 0;
      const distance = Math.hypot(dx, dy);
      if (distance < least) least = distance;
    }
  });
  return least;
}
