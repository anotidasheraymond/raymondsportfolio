import { circle, type StampTemplate } from '../template';

// service_circle_v1, measured off Camden Common Walk Club (demo stamp-01): a circle cut twice, heavy
// outside and fine inside; the business name arched round the top from shoulder to shoulder; the
// country's animal between the split year, each half over a rule; the claim across the full width;
// the heart-paw between two rules; the place smiling along the foot.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const serviceCircleV1: StampTemplate = {
  id: 'service_circle_v1',
  shape: 'circle',
  // The die's bounds and 30 more each way: the impression is pressed up to 1.2 degrees off square.
  viewBox: [26, 24, 1198, 1198],
  die: [
    { d: circle(625, 623, 556.5), stroke: 25 },
    { d: circle(625, 623, 520), stroke: 10 },
  ],
  rules: [
    { x1: 257.5, y1: 639.5, x2: 336.5, y2: 639.5, width: 11 },
    { x1: 917.5, y1: 639.5, x2: 997.5, y2: 639.5, width: 11 },
    { x1: 352.5, y1: 909.5, x2: 481.5, y2: 909.5, width: 11 },
    { x1: 771.5, y1: 909.5, x2: 899.5, y2: 909.5, width: 11 },
  ],
  businessName: { kind: 'arc', cx: 625, cy: 623, r: 399, side: 'top', cap: 73, minCap: 50, tracking: 0.04, stretch: 0.975, maxSpanDeg: 166, fill: { spanDeg: 164.3, maxCap: 92 }, dieGap: 8 },
  emblem: { x: 370, y: 348, width: 554, height: 301, yearGap: 27 },
  yearLeft: { x: 302.5, y: 609, cap: 57, stretch: 1.28 },
  yearRight: { x: 947.5, y: 609, cap: 57, stretch: 1.28 },
  claim: { kind: 'line', x: 635, y: 841, cap: 158, minCap: 110, tracking: 0, stretch: 1.01, maxWidth: 925 },
  heartPaw: { x: 519, y: 852, width: 216, height: 191 },
  heartPawArt: 'heart-paw-outline-v1',
  location: { kind: 'arc', cx: 625, cy: 623, r: 485, side: 'bottom', cap: 46, minCap: 34, tracking: 0.2, stretch: 1.4, maxSpanDeg: 104, dot: { size: 28, rise: 25 } },
};
