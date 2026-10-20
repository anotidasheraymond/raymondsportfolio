import { star, type StampTemplate } from '../template';

// service_star_v1, measured off Mercer Street Pet Lodge (demo stamp-09): a five-pointed star cut
// twice, heavy outside and fine inside, its points rounded and its notches sharp, both rings cut
// away round the heart-paw in the bottom notch; the business name arched over the animal on an
// oval of its own; the split year, each half over a rule; the claim across the star's waist; the
// place between two rules.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const serviceStarV1: StampTemplate = {
  id: 'service_star_v1',
  shape: 'star',
  // The die's bounds and 30 more each way: the impression is pressed up to 1.2 degrees off square.
  viewBox: [11, 21, 1231, 1211],
  die: [
    {
      d: star(626.5, 21.6, { upperNotch: [220.1, 399.4], arm: [605.05, 494.5], lowerNotch: [349.4, 811.3], foot: [417.75, 1217.15] }, 1043.2, 41, 2),
      stroke: 23,
    },
    {
      d: star(626.5, 89.9, { upperNotch: [196.4, 426.8], arm: [545.3, 514.4], lowerNotch: [314.9, 801.6], foot: [375.7, 1165.3] }, 1008.6, 12, 2),
      stroke: 15,
    },
  ],
  dieCuts: [{ cx: 627, cy: 1020, r: 99 }],
  rules: [
    { x1: 389, y1: 745, x2: 473, y2: 745, width: 10 },
    { x1: 780, y1: 745, x2: 865, y2: 745, width: 10 },
    { x1: 330.5, y1: 951.5, x2: 385.5, y2: 951.5, width: 9 },
    { x1: 869.5, y1: 951.5, x2: 923.5, y2: 951.5, width: 9 },
  ],
  businessName: { kind: 'arc', cx: 627, cy: 740.6, r: 279.4, ry: 315.7, side: 'top', cap: 60, minCap: 42, tracking: -0.03, stretch: 0.96, maxSpanDeg: 150, fill: { spanDeg: 146.3, maxCap: 78 }, dieGap: 0 },
  emblem: { x: 447, y: 509, width: 359, height: 270, yearGap: 28 },
  yearLeft: { x: 426.5, y: 716, cap: 56, stretch: 1.3, face: 'claim' },
  yearRight: { x: 825.5, y: 716, cap: 56, stretch: 1.3, face: 'claim' },
  claim: { kind: 'line', x: 628, y: 909, cap: 132, minCap: 90, tracking: 0, stretch: 1.05, maxWidth: 600 },
  location: { kind: 'line', x: 627, y: 962, cap: 34, minCap: 26, tracking: 0.1, stretch: 1.2, maxWidth: 460, dot: { size: 13, rise: 17.5 } },
  heartPaw: { x: 540, y: 980, width: 174, height: 140 },
  heartPawArt: 'heart-paw-outline-v1',
};
