type AnyRecord = Record<string, unknown>;

const isPlainObject = (value: unknown): value is AnyRecord =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype;

/**
 * Recursively merge plain objects without mutating any source. Arrays are
 * concatenated and deduped. Anything that is not a plain object is replaced.
 */
export const deepMerge = (
  target: AnyRecord,
  ...sources: ReadonlyArray<AnyRecord | undefined>
): AnyRecord => {
  let result: AnyRecord = isPlainObject(target) ? { ...target } : {};

  for (const source of sources) {
    if (!isPlainObject(source)) continue;
    const next: AnyRecord = { ...result };
    for (const key of Object.keys(source)) {
      const srcValue = source[key];
      const tgtValue = next[key];
      if (isPlainObject(srcValue)) {
        next[key] = deepMerge(
          isPlainObject(tgtValue) ? tgtValue : {},
          srcValue,
        );
      } else if (Array.isArray(srcValue) && Array.isArray(tgtValue)) {
        next[key] = Array.from(new Set([...tgtValue, ...srcValue]));
      } else {
        next[key] = srcValue;
      }
    }
    result = next;
  }

  return result;
};
