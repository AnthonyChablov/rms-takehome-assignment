// src/hooks/useSortedData.ts
import React from 'react';

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

/**
 * Custom hook to memoize sorting an array of objects by a specific key.
 * This hook is useful for sorting data client-side in a performant way, especially when working with dynamic or interactive data in React components.
 *
 * The hook will return a memoized, sorted array of objects based on the provided sorting key. If no sorting key is provided, it will return the original data (unsorted).
 * The sorting is done using the `compareValues` function, which supports sorting based on numbers, strings, Dates, and handles null/undefined values appropriately.
 *
 * @template T The type of objects in the array.
 * @param {T[] | undefined | null} data The array of data to sort. This could be `undefined` or `null` if data isn't available.
 * @param {keyof T | undefined | null} sortKey The key within each object to sort by (e.g., a property name of the objects).
 *  If `null` or `undefined` is passed, the data is returned unsorted.
 * @returns {T[]} A new, memoized, sorted array based on the sortKey, or the original data structure if sorting is not possible or needed.
 *
 * @example
 * const sortedData = useSortedData(data, 'date');
 * // This would sort the data by the 'date' property.
 *
 * @note
 * - The `useMemo` hook ensures that the sorting operation is only re-executed when the `data` or `sortKey` changes, optimizing performance.
 * - The sorting happens client-side, meaning that large datasets could have performance implications. Consider server-side sorting for larger datasets.
 */
function useSortedData<T>(
  data: T[] | undefined | null,
  sortKey: keyof T | undefined | null,
): T[] {
  const sortedData = React.useMemo(() => {
    // Only proceed if we have data and a key to sort by
    if (data && sortKey) {
      // Create a shallow copy to avoid mutating the original array
      const dataToSort = [...data];

      // Sort using the generalized comparison function
      dataToSort.sort((a, b) => compareValues(sortKey, a, b));

      return dataToSort;
    }

    // If no data or sortKey, return the original data or an empty array
    // (avoids returning null/undefined from the hook)
    return data || [];
  }, [data, sortKey]); // Re-run the memoization only if data or sortKey changes

  return sortedData;
}

export default useSortedData;
