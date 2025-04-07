/**
 * Generic comparison function for sorting.
 * This function compares two values (from objects) based on a specific key and handles different data types like numbers, strings, Dates, and null/undefined values.
 * It sorts null/undefined values to the end by default.
 *
 * @param key The key within the object (T) used for comparison (e.g., a property name of the objects).
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @returns A negative value if `a` is less than `b`, zero if they are equal, or a positive value if `a` is greater than `b`.
 *
 * The function compares values based on their type:
 * - **Numbers**: Subtracts the two values for numerical comparison.
 * - **Strings**: Uses `localeCompare` for a locale-aware string comparison.
 * - **Dates**: Compares by timestamp values.
 * - **Null/Undefined**: Sorts null/undefined values to the end (this is the default behavior).
 *
 * If the types are unsupported or mixed, a warning is logged, and the values are treated as equal.
 */
export function compareValues<T>(key: keyof T, a: T, b: T): number {
  const valA = a[key];
  const valB = b[key];

  // Handle null/undefined: push them to the end
  const aIsNull = valA === null || valA === undefined;
  const bIsNull = valB === null || valB === undefined;

  if (aIsNull && bIsNull) return 0; // both null/undefined, treat as equal
  if (aIsNull) return 1; // only a is null/undefined, sort a after b
  if (bIsNull) return -1; // only b is null/undefined, sort a before b

  // --- Specific Type Comparisons ---
  // Numbers: Simple subtraction
  if (typeof valA === 'number' && typeof valB === 'number') {
    return valA - valB;
  }

  // Strings: Locale-aware comparison
  if (typeof valA === 'string' && typeof valB === 'string') {
    return valA.localeCompare(valB);
  }

  // Dates: Compare timestamps
  if (valA instanceof Date && valB instanceof Date) {
    return valA.getTime() - valB.getTime();
  }

  // Fallback for unhandled types or mixed types (treat as equal)
  console.warn(
    `useSortedData: Attempting to compare unsupported types (${typeof valA} vs ${typeof valB}) for key "${String(key)}". Treating as equal.`,
  );
  return 0;
}
