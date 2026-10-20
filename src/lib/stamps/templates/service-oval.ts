import { ellipse, openEllipse, type StampTemplate } from '../template';

// service_oval_v1, measured off the owner's Cedar & Coat Grooming reference
// (tools/stamps/references/cedar-coat-oval.png): an oval cut twice, heavy outside
// and fine inside, the fine ring opened where the heart's tip passes through it; the business name
// arched over the top on an oval of its own; the country's animal between the split year, each half
// over a rule; the claim across the full width; the visit date and the place, each between two
// rules; the heart-paw at the foot.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const serviceOvalV1: StampTemplate = {
  id: 'service_oval_v1',
  shape: 'oval',
  // The die's bounds and 30 more each way: the impression is pressed up to 1.2 degrees off square.
  viewBox: [-18, 116, 1290, 1066],
  die: [
    { d: ellipse(626.5, 648.5, 602.5, 490), stroke: 25 },
    { d: openEllipse(626.5, 648.5, 574, 458.5, 86, 94), stroke: 11 },
  ],
  rules: [
    { x1: 226.5, y1: 644.5, x2: 332.5, y2: 644.5, width: 15 },
    { x1: 924.5, y1: 644.5, x2: 1027.5, y2: 644.5, width: 15 },
    { x1: 243.5, y1: 875.5, x2: 382.5, y2: 875.5, width: 13 },
    { x1: 869.5, y1: 875.5, x2: 1008.5, y2: 875.5, width: 13 },
    { x1: 339.5, y1: 939.5, x2: 465.5, y2: 939.5, width: 11 },
    { x1: 791.5, y1: 939.5, x2: 919.5, y2: 939.5, width: 11 },
  ],
  businessName: { kind: 'arc', cx: 626.5, cy: 704, r: 483, ry: 384, side: 'top', cap: 95, minCap: 64, tracking: -0.09, stretch: 1.2, maxSpanDeg: 140, fill: { spanDeg: 135.0, maxCap: 112 }, dieGap: 8, face: 'claim' },
  emblem: { x: 364, y: 403, width: 518, height: 251, yearGap: 32 },
  yearLeft: { x: 276, y: 612, cap: 75, stretch: 1.3, face: 'claim' },
  yearRight: { x: 975.5, y: 612, cap: 75, stretch: 1.3, face: 'claim' },
  claim: { kind: 'line', x: 628.5, y: 833, cap: 149, minCap: 100, tracking: 0, stretch: 1.15, maxWidth: 930 },
  date: { kind: 'line', x: 624, y: 892, cap: 46, minCap: 36, tracking: 0.175, stretch: 1.2, maxWidth: 447, face: 'name' },
  location: { kind: 'line', x: 627, y: 948, cap: 39, minCap: 30, tracking: 0.205, stretch: 1.2, maxWidth: 296 },
  heartPaw: { x: 539, y: 959, width: 174, height: 153 },
  heartPawArt: 'heart-paw-outline-v1',
};
