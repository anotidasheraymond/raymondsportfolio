import { ellipse, type StampTemplate } from '../template';

// clinic_oval_v1, measured off the owner's Animal Hospital of Oakville reference
// (tools/stamps/references/animal-hospital-oakville-oval.png, 1536 by 1024): a
// wide oval cut twice, heavy outside and fine inside; the business name arched over the top and the
// supporting lines round the foot, both set parallel to the fine ring; a scene across the middle
// between the split year, each half over a rule; the clinic's address on two lines; the paw between
// two rules. A clinic's stamp prints no claim: its lines round the foot say what it does.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const clinicOvalV1: StampTemplate = {
  id: 'clinic_oval_v1',
  shape: 'oval',
  // The die's bounds and 30 more each way: the impression is pressed up to 1.2 degrees off square.
  viewBox: [-13, -21, 1561, 1051],
  die: [
    { d: ellipse(767.25, 504.75, 739.25, 484.75), stroke: 22 },
    { d: ellipse(767, 505, 708.5, 455.5), stroke: 10 },
  ],
  rules: [
    { x1: 171, y1: 559, x2: 264, y2: 559, width: 16 },
    { x1: 1280, y1: 559, x2: 1369, y2: 559, width: 16 },
    { x1: 503, y1: 789, x2: 665, y2: 789, width: 10 },
    { x1: 867, y1: 789, x2: 1033, y2: 789, width: 10 },
  ],
  businessName: { kind: 'arc', cx: 767, cy: 505, r: 708.5, ry: 455.5, inset: 119, side: 'top', cap: 94, minCap: 64, tracking: 0, stretch: 1.055, maxSpanDeg: 150, fill: { spanDeg: 143.2, maxCap: 112 }, dieGap: 8, face: 'claim' },
  emblem: { x: 298, y: 243, width: 946, height: 377, yearGap: 44 },
  yearLeft: { x: 217.5, y: 530, cap: 79, stretch: 1.2, face: 'claim' },
  yearRight: { x: 1325, y: 530, cap: 79, stretch: 1.2, face: 'claim' },
  addressLines: [
    { kind: 'line', x: 767, y: 672, cap: 35, minCap: 26, tracking: 0.085, stretch: 1.2, maxWidth: 660, face: 'name' },
    { kind: 'line', x: 767.5, y: 724, cap: 34.5, minCap: 26, tracking: 0.085, stretch: 1.2, maxWidth: 660, face: 'name' },
  ],
  footer: { kind: 'arc', cx: 767, cy: 505, r: 708.5, ry: 455.5, inset: 31, side: 'bottom', cap: 32, minCap: 24, tracking: 0.1, stretch: 1.1, maxSpanDeg: 126, dot: { size: 20, rise: 16, gap: 34 }, face: 'name' },
  heartPaw: { x: 705, y: 748, width: 130, height: 116 },
  heartPawArt: 'paw-v1',
};
