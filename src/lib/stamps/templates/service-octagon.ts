import { octagon, type StampTemplate } from '../template';

// service_octagon_v1, measured off the owner's Petworking Stays reference
// (tools/stamps/references/petworking-stays-octagon.png): an octagon cut twice,
// heavy outside and fine inside; the business name arched over the top on an oval of its own; the
// animal between the split year, each half over a rule; the claim across the full width; the visit
// date between two rules; the heart-paw between two rules at the foot. This family prints no place.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const serviceOctagonV1: StampTemplate = {
  id: 'service_octagon_v1',
  shape: 'octagon',
  // The die's bounds and 30 more each way: the impression is pressed up to 1.2 degrees off square.
  viewBox: [22, 26, 1208, 1198],
  die: [
    { d: octagon(64.5, 67.5, 1187.5, 1181.5, 310.5, 317, 28), stroke: 25 },
    { d: octagon(101, 100, 1154, 1149, 290, 297, 23), stroke: 15 },
  ],
  rules: [
    { x1: 232, y1: 655, x2: 329, y2: 655, width: 16 },
    { x1: 923, y1: 655, x2: 1020, y2: 655, width: 16 },
    { x1: 277, y1: 919, x2: 389, y2: 919, width: 16 },
    { x1: 862, y1: 919, x2: 974, y2: 919, width: 16 },
    { x1: 393, y1: 1029, x2: 493, y2: 1029, width: 16 },
    { x1: 759, y1: 1029, x2: 859, y2: 1029, width: 16 },
  ],
  businessName: { kind: 'arc', cx: 626, cy: 548, r: 382, ry: 305, side: 'top', cap: 95, minCap: 64, tracking: -0.06, stretch: 1.3, maxSpanDeg: 156, fill: { spanDeg: 152.0, maxCap: 112 }, dieGap: 8, face: 'claim' },
  emblem: { x: 344, y: 346, width: 566, height: 352, yearGap: 39 },
  yearLeft: { x: 281, y: 618, cap: 90, stretch: 1.14, face: 'claim' },
  yearRight: { x: 972, y: 618, cap: 90, stretch: 1.14, face: 'claim' },
  claim: { kind: 'line', x: 629.5, y: 852, cap: 129, minCap: 90, tracking: 0, stretch: 0.88, maxWidth: 1000 },
  date: { kind: 'line', x: 627, y: 938, cap: 55, minCap: 42, tracking: 0.08, stretch: 0.98, maxWidth: 440, dash: { width: 25, thickness: 11, rise: 23, gap: 8.5 }, face: 'name' },
  heartPaw: { x: 521, y: 962, width: 212, height: 182 },
  heartPawArt: 'heart-paw-outline-v1',
};
