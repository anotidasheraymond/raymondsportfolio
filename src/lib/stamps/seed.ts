// The stamp's own randomness, which is not random: every value comes from the stamp's id, so the
// same stamp is pressed the same way on every screen, in every export and on paper, for ever.
//
// This file is kept byte-identical in mobile/src/lib/stamps and web/src/lib/stamps.

/** FNV-1a over the string's UTF-16 units: a 32-bit seed from a stamp id. */
export function hashSeed(text: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32: a small deterministic generator. Each call gives the next value in [0, 1). */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A value between min and max from the generator. */
export function seededRange(next: () => number, min: number, max: number): number {
  return min + (max - min) * next();
}
