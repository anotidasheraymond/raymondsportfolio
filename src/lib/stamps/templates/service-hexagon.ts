import { hexagon, type StampTemplate } from '../template';

// service_hexagon_v1, measured off Hudson Square Behaviour House (demo stamp-05): a hexagon standing
// on a point, cut twice, heavy outside and fine inside; the business name arched over the animal on
// an oval of its own; the split year either side of the animal, with no rules; the claim between
// two rules the width of the die; the place beneath; the heart-paw in the lower point.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const serviceHexagonV1: StampTemplate = {
  id: 'service_hexagon_v1',
  shape: 'hexagon',
  // The die's bounds and 30 more each way: the impression is pressed up to 1.2 degrees off square.
  viewBox: [105, 28, 1042, 1194],
  die: [
    { d: hexagon(626.2, 68.6, [480.35, 347.55], [480.3, 899.5], 1181.6, 56), stroke: 20 },
    { d: hexagon(626.2, 108.1, [447.4, 365.15], [447.35, 882.3], 1144.9, 33), stroke: 12 },
  ],
  rules: [
    { x1: 279.5, y1: 621.5, x2: 978.5, y2: 621.5, width: 11 },
    { x1: 274, y1: 853, x2: 974, y2: 853, width: 10 },
  ],
  businessName: { kind: 'arc', cx: 626, cy: 588.9, r: 345.1, ry: 322.8, side: 'top', cap: 52, minCap: 38, tracking: 0, stretch: 0.9, maxSpanDeg: 150, fill: { spanDeg: 147.6, maxCap: 78 }, dieGap: 8 },
  emblem: { x: 421, y: 354, width: 414, height: 245, yearGap: 44 },
  yearLeft: { x: 393, y: 561, cap: 55, stretch: 1.2, tracking: 0.25 },
  yearRight: { x: 859.5, y: 561, cap: 55, stretch: 1.2, tracking: 0.25 },
  claim: { kind: 'line', x: 629, y: 825, cap: 170, minCap: 110, tracking: 0, stretch: 1.11, maxWidth: 730 },
  location: { kind: 'line', x: 626, y: 922, cap: 38, minCap: 28, tracking: 0.145, stretch: 1.2, maxWidth: 600, dot: { size: 20, rise: 18.5 } },
  heartPaw: { x: 521, y: 946, width: 207, height: 168 },
  heartPawArt: 'heart-paw-outline-v1',
};
