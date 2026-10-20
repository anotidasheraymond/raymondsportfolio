import { ARTWORK, WEAR, type ArtworkName } from './artwork';
import { compileStampSvg, StampLayoutError, type Artwork, type StampConfig, type StampFonts } from './compile';
import { hashSeed } from './seed';
import { TEMPLATES } from './templates';
import type { WearTexture } from './wear';

// What a stamp is drawn from, decided by rule and never by looking at the text: the die the
// business chose picks its layout family, and the issuing country picks the animal, the way the
// owner's demo set pairs them. Every surface resolves a stamp through here and draws the result
// of compileStampSvg, so the Studio, the passport, a stamp's own page and an export agree.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

/** The layout family each die is cut in (stamp_templates.key to templates/). */
export const FAMILY_FOR_DIE: Record<string, string> = {
  circle: 'service_circle_v1',
  oval: 'service_oval_v1',
  octagon: 'service_octagon_v1',
  rounded: 'service_rounded_v1',
  star: 'service_star_v1',
  hexagon: 'service_hexagon_v1',
  shield: 'service_shield_v1',
  ticket: 'service_ticket_v1',
};

/** A clinic's stamps are cut in the clinic family whatever die it chose. */
export const CLINIC_FAMILY = 'clinic_oval_v1';


/**
 * The country's animal. Canada's is one of the owner's ten beaver masters (the one both Canadian
 * families were tuned with); every other animal is traced off the owner's demo prints until
 * masters come. Ireland prints the badger, as stamp_emblems has it.
 */
export const COUNTRY_EMBLEM: Record<string, ArtworkName> = {
  CA: 'emblems/ca-beaver-09-v1',
  US: 'emblems/us-eagle-02-v1',
  GB: 'emblems/gb-badger-01-v1',
  IE: 'emblems/gb-badger-01-v1',
  AU: 'emblems/au-platypus-01-v1',
  JP: 'emblems/jp-fox-01-v1',
};

/** Where a family prints a country's animal as the owner's own stamp in that family does. */
export const FAMILY_EMBLEM: Record<string, Record<string, ArtworkName>> = {
  service_star_v1: { US: 'emblems/us-eagle-01-v1' },
  service_ticket_v1: { GB: 'emblems/gb-badger-02-v1', IE: 'emblems/gb-badger-02-v1' },
  clinic_oval_v1: { CA: 'emblems/ca-beaver-scene-01-v1' },
};

/**
 * The dies this engine can actually cut, and the countries whose animal it has.
 *
 * Nothing may offer a parameter that is not in here. A die with no family and a country with no
 * animal both resolve to a gap, and a gap draws nothing: that is how a Studio came to offer eleven
 * shapes while the compiler held eight, and how a household in Japan got a stamp with no animal in
 * it at all. Reading the lists off the engine rather than restating them means a picker cannot
 * drift away from what can be pressed, and `tests/stamp-parameters.test.mjs` fails the build if one
 * ever does.
 *
 * Three of the owner's eleven dies are not in here, and the reason is the same for all three:
 * every family in this engine was measured off one of the owner's own prints, and nothing may be
 * drawn that the owner did not print. The twenty-five demo prints carry circle, oval, hexagon,
 * octagon, rounded, shield, star and ticket. `square` is in the set (prints 04, 12, 16 and 22) and
 * is owed a family measured off them. `diamond` and `banner` are in no print, so they are owed a
 * print before they are owed anything else.
 */
export const CUTTABLE_DIES: readonly string[] = Object.keys(FAMILY_FOR_DIE)
  .filter((die) => Boolean(TEMPLATES[FAMILY_FOR_DIE[die]]));

/** The countries whose animal this engine holds, in the order the launch list names them. */
export const EMBLEM_COUNTRIES: readonly string[] = Object.keys(COUNTRY_EMBLEM);

export type StampRequest = {
  /** The die the stamp was cut on, as stamp_templates.key names it. */
  die: string;
  /** A clinic's stamp: cut in the clinic family. */
  clinic?: boolean;
  /** The issuing business's country, which picks the animal. */
  country: string | null;
  /** An approved animal of the business's own (Petworking Stays' dog), in place of the country's. */
  emblem?: ArtworkName;
  config: StampConfig;
};

/** Why a stamp cannot be drawn yet: nothing is drawn in its place. */
export type StampGap =
  | { kind: 'family'; die: string }
  | { kind: 'emblem'; country: string | null }
  | { kind: 'layout'; part: StampLayoutError['part'] };

export type Resolved = { svg: string; viewBox: [number, number, number, number] } | { gap: StampGap };

const loaded = new Map<ArtworkName, Promise<Artwork>>();

/** One piece of artwork, loaded once for every stamp that needs it. */
export function artwork(name: ArtworkName): Promise<Artwork> {
  let found = loaded.get(name);
  if (!found) {
    found = ARTWORK[name]().then((module) => module.default);
    loaded.set(name, found);
  }
  return found;
}

/** The family and animal a request resolves to, or what is missing. */
export function plan(request: StampRequest): { family: string; emblem: ArtworkName } | { gap: StampGap } {
  const family = request.clinic ? CLINIC_FAMILY : FAMILY_FOR_DIE[request.die];
  if (!family || !TEMPLATES[family]) return { gap: { kind: 'family', die: request.die } };
  const country = request.country?.toUpperCase() ?? null;
  const emblem = request.emblem
    ?? (country ? FAMILY_EMBLEM[family]?.[country] ?? COUNTRY_EMBLEM[country] : undefined);
  if (!emblem) return { gap: { kind: 'emblem', country } };
  return { family, emblem };
}

/** Resolve a request, load what it draws, and compile it. */
export async function renderStamp(request: StampRequest, fonts: StampFonts): Promise<Resolved> {
  const planned = plan(request);
  if ('gap' in planned) return planned;
  const template = TEMPLATES[planned.family];
  // One wear texture: the one wear.ts would pick out of all six by the stamp's id, loaded alone.
  const wearName = WEAR[hashSeed(request.config.id) % WEAR.length];
  const [emblem, heartPaw, wearArt] = await Promise.all([
    artwork(planned.emblem),
    artwork(`brand/${template.heartPawArt}` as ArtworkName),
    artwork(wearName),
  ]);
  const wear: WearTexture[] = [{ size: wearArt.width, d: wearArt.d }];
  try {
    return { svg: compileStampSvg(request.config, { template, fonts, emblem, heartPaw, wear }), viewBox: template.viewBox };
  } catch (error) {
    if (error instanceof StampLayoutError) return { gap: { kind: 'layout', part: error.part } };
    throw error;
  }
}
