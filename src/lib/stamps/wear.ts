import { hashSeed, seededRandom, seededRange } from './seed';

// Rubber-stamp wear. The textures are the owner's own: the paper that shows through the ink on the
// demo prints, cut out once (tools/stamps/wear_texture.py) and kept as paths. A stamp takes one of
// them, chosen by its id, and places it with a small offset, scale and turn from the same seed, so
// no two stamps wear alike and one stamp always wears the same way.
//
// The texture is a mask: it takes ink away rather than painting paper over it, so the stamp stays
// transparent wherever it is worn.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

/** Holes in the ink, as a path on a 1254 square. */
export type WearTexture = { size: number; d: string };

export function wearMask(
  stampId: string,
  textures: WearTexture[],
  viewBox: [number, number, number, number],
): { id: string; defs: string; transform: string } {
  const seed = hashSeed(stampId);
  const next = seededRandom(seed);
  const texture = textures[seed % textures.length];
  const [vx, vy, vw, vh] = viewBox;
  const cx = vx + vw / 2;
  const cy = vy + vh / 2;
  // The texture's placement: moved up to 40 either way, scaled 0.93 to 1.08, turned a little.
  const dx = seededRange(next, -40, 40);
  const dy = seededRange(next, -40, 40);
  const scale = seededRange(next, 0.93, 1.08);
  const turn = seededRange(next, -8, 8);
  // The whole impression sits a little off square, as a hand-pressed stamp does.
  const tilt = seededRange(next, -1.2, 1.2);
  const id = `wear-${seed.toString(36)}`;
  const place = `translate(${(cx + dx).toFixed(1)} ${(cy + dy).toFixed(1)}) rotate(${turn.toFixed(2)}) scale(${scale.toFixed(4)}) translate(${-texture.size / 2} ${-texture.size / 2})`;
  const defs = `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="${vx - 60}" y="${vy - 60}" width="${vw + 120}" height="${vh + 120}">`
    + `<rect x="${vx - 60}" y="${vy - 60}" width="${vw + 120}" height="${vh + 120}" fill="#fff"/>`
    + `<path transform="${place}" fill="#000" d="${texture.d}"/></mask></defs>`;
  return { id, defs, transform: `rotate(${tilt.toFixed(2)} ${cx.toFixed(1)} ${cy.toFixed(1)})` };
}
