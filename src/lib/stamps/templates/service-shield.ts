import { shield, type StampTemplate } from '../template';

// service_shield_v1, measured off Wattle Lane Pet Daycare (demo stamp-19): a shield cut twice, heavy
// outside and fine inside, peaked at the top, straight at the sides and curving in to a point at
// the foot; the business name arched under the peak on an oval of its own; the country's animal
// between the split year, with no rules; the claim between two rules the width of the die; the
// place beneath; the heart-paw between two rules in the point. The die is drawn symmetric about
// its sides' centre; the print's peak sits a few units right of it.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const serviceShieldV1: StampTemplate = {
  id: 'service_shield_v1',
  shape: 'shield',
  // The die's bounds and 30 more each way: the impression is pressed up to 1.2 degrees off square.
  viewBox: [136, 62, 985, 1151],
  die: [
    { d: shield(628, 106.5, [453, 301.4], 682, 331, [39.6, 2], 1173, { peak: 39, shoulder: 33 }), stroke: 20 },
    { d: shield(628, 140.7, [424, 321.75], 683, 307, [33, 1.7], 1144, { peak: 40, shoulder: 13 }), stroke: 11 },
  ],
  rules: [
    { x1: 288, y1: 628, x2: 968, y2: 628, width: 12 },
    { x1: 291, y1: 842, x2: 968, y2: 842, width: 12 },
    { x1: 428.5, y1: 990.5, x2: 509.5, y2: 990.5, width: 11 },
    { x1: 748.5, y1: 990.5, x2: 828.5, y2: 990.5, width: 11 },
  ],
  businessName: { kind: 'arc', cx: 628, cy: 572.3, r: 391.7, ry: 266.9, side: 'top', cap: 56, minCap: 40, tracking: 0.01, stretch: 1, maxSpanDeg: 126, fill: { spanDeg: 123.0, maxCap: 78 }, dieGap: 8 },
  emblem: { x: 353, y: 394, width: 549, height: 210, yearGap: 27 },
  yearLeft: { x: 289, y: 584, cap: 63, stretch: 0.97 },
  yearRight: { x: 967.5, y: 584, cap: 63, stretch: 0.97 },
  claim: { kind: 'line', x: 628, y: 816, cap: 162, minCap: 110, tracking: 0, stretch: 1.14, maxWidth: 705 },
  location: { kind: 'line', x: 630, y: 919.5, cap: 48, minCap: 36, tracking: 0.05, stretch: 1, maxWidth: 640, dot: { size: 17, rise: 21.5 } },
  heartPaw: { x: 543, y: 942, width: 172, height: 158 },
  heartPawArt: 'heart-paw-outline-v1',
};
