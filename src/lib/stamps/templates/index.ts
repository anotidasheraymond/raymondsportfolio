import type { StampTemplate } from '../template';
import { clinicOvalV1 } from './clinic-oval';
import { serviceCircleV1 } from './service-circle';
import { serviceHexagonV1 } from './service-hexagon';
import { serviceOctagonV1 } from './service-octagon';
import { serviceOvalV1 } from './service-oval';
import { serviceRoundedV1 } from './service-rounded';
import { serviceShieldV1 } from './service-shield';
import { serviceStarV1 } from './service-star';
import { serviceTicketV1 } from './service-ticket';

// Every layout family by its id. A stamp's render config names one; nothing chooses a family by
// looking at the text it has to set.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

export const TEMPLATES: Record<string, StampTemplate> = {
  [clinicOvalV1.id]: clinicOvalV1,
  [serviceCircleV1.id]: serviceCircleV1,
  [serviceHexagonV1.id]: serviceHexagonV1,
  [serviceOctagonV1.id]: serviceOctagonV1,
  [serviceOvalV1.id]: serviceOvalV1,
  [serviceRoundedV1.id]: serviceRoundedV1,
  [serviceShieldV1.id]: serviceShieldV1,
  [serviceStarV1.id]: serviceStarV1,
  [serviceTicketV1.id]: serviceTicketV1,
};
