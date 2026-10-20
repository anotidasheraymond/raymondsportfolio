import { roundedRect, type StampTemplate } from '../template';

// service_rounded_v1, measured off Roncy Grooming Room (demo stamp-10): a rounded rectangle cut
// twice, heavy outside and fine inside; the business name arched over the top; the country's animal
// between the split year, each half between two rules; the claim across the full width; the
// heart-paw between two rules; the place smiling along the foot.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const serviceRoundedV1: StampTemplate = {
  id: 'service_rounded_v1',
  shape: 'rounded',
  // The die's bounds and 30 more each way: the impression is pressed up to 1.2 degrees off square.
  viewBox: [20, 138, 1214, 1006],
  die: [
    { d: roundedRect(64, 183.5, 1125, 915.5, 88), stroke: 25 },
    { d: roundedRect(98, 216.5, 1057, 853.5, 58), stroke: 13 },
  ],
  rules: [
    { x1: 226, y1: 471, x2: 380, y2: 471, width: 7 },
    { x1: 205, y1: 600, x2: 388, y2: 600, width: 7 },
    { x1: 874, y1: 471, x2: 1028, y2: 471, width: 7 },
    { x1: 866, y1: 600, x2: 1049, y2: 600, width: 7 },
    { x1: 228, y1: 858, x2: 500, y2: 858, width: 7 },
    { x1: 752, y1: 858, x2: 1025, y2: 858, width: 7 },
  ],
  businessName: { kind: 'arc', cx: 650, cy: 1571, r: 1235, side: 'top', cap: 84, minCap: 56, tracking: 0.03, stretch: 0.855, maxSpanDeg: 54, fill: { spanDeg: 44.3, maxCap: 100 }, dieGap: 8 },
  emblem: { x: 392, y: 398, width: 430, height: 222, yearGap: 56 },
  yearLeft: { x: 300, y: 568, cap: 64 },
  yearRight: { x: 952, y: 568, cap: 64 },
  claim: { kind: 'line', x: 630, y: 809, cap: 165, minCap: 110, tracking: 0.01, stretch: 0.95, maxWidth: 990, face: 'name' },
  claimTwoLines: { cap: 96, gap: 22 },
  heartPaw: { x: 540, y: 826, width: 176, height: 154 },
  heartPawArt: 'heart-paw-v1',
  location: { kind: 'arc', cx: 628, cy: 80, r: 965, side: 'bottom', cap: 60, minCap: 44, tracking: 0.165, stretch: 0.95, maxSpanDeg: 64, dot: { size: 28, rise: 25 } },
};
