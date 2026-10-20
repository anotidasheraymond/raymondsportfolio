import { ticket, type StampTemplate } from '../template';

// service_ticket_v1, measured off Portobello Pet Sitting Co. (demo stamp-08): a ticket cut twice,
// heavy outside and fine inside, its corners cut away round and a round notch in each side, the
// fine ring opened where the heart's tip meets it; the business name in a shallow arch over the
// animal, on an oval of its own; the split year either side, each half over a rule; the claim
// across the full width; the place beneath; the heart-paw between two rules at the foot.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const serviceTicketV1: StampTemplate = {
  id: 'service_ticket_v1',
  shape: 'ticket',
  // The die's bounds and 30 more each way: the impression is pressed up to 1.2 degrees off square.
  viewBox: [52, 233, 1149, 876],
  die: [
    { d: ticket(626.5, 536, 271, 1071.5, [542.55, 265.65, 113.6], [554.6, 1072.3, 133.15], [564.3, 630, 122.6]), stroke: 16.5 },
    { d: ticket(626.25, 506.25, 300.5, 1042.5, [540.25, 266.6, 142.7], [551.5, 1070.9, 161.4], [569.95, 629.7, 158.65]), stroke: 11 },
  ],
  dieCuts: [{ cx: 626.5, cy: 1042, r: 28, rings: [1] }],
  rules: [
    { x1: 266.5, y1: 650.5, x2: 405.5, y2: 650.5, width: 11 },
    { x1: 847.5, y1: 651, x2: 986.5, y2: 651, width: 10 },
    { x1: 291, y1: 962, x2: 508, y2: 962, width: 10 },
    { x1: 745, y1: 962, x2: 962, y2: 962, width: 10 },
  ],
  businessName: { kind: 'arc', cx: 626, cy: 612, r: 491.4, ry: 214, side: 'top', cap: 62, minCap: 44, tracking: -0.03, stretch: 0.94, maxSpanDeg: 112, fill: { spanDeg: 107.1, maxCap: 80 }, dieGap: 8 },
  emblem: { x: 418, y: 440, width: 444, height: 218, yearGap: 29 },
  yearLeft: { x: 328, y: 604, cap: 66, stretch: 1.1 },
  yearRight: { x: 935, y: 604, cap: 66, stretch: 1.1 },
  claim: { kind: 'line', x: 630, y: 810, cap: 127, minCap: 90, tracking: 0, stretch: 1.24, maxWidth: 780 },
  location: { kind: 'line', x: 626, y: 887, cap: 42, minCap: 30, tracking: 0.19, stretch: 1.1, maxWidth: 740, dot: { size: 20, rise: 19.5 } },
  heartPaw: { x: 541, y: 905, width: 172, height: 143 },
  heartPawArt: 'heart-paw-outline-v1',
};
