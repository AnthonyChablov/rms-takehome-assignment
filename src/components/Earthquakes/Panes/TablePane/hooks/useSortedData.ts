// src/hooks/useSortedData.ts
import React from 'react';

/**
 * Generic comparison function for sorting.
 * Handles numbers, strings, Dates, and null/undefined values.
 * Sorts null/undefined values to the end.
 * @param key The key to access the value for comparison within objects a and b.
 * @param a The first object.
 * @param b The second object.
 * @returns A negative value if a < b, zero if a === b, a positive value if a > b.
 */
function compareValues<T>(key: keyof T, a: T, b: T): number {
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
  // You might want to add logging here if needed.
  console.warn(
    `useSortedData: Attempting to compare unsupported types (${typeof valA} vs ${typeof valB}) for key "${String(key)}". Treating as equal.`,
  );
  return 0;
}

/**
 * Custom hook to memoize sorting an array of objects by a specific key.
 *
 * @template T The type of objects in the array.
 * @param {T[] | undefined | null} data The array of data to sort.
 * @param {keyof T | undefined | null} sortKey The key (property name) within T to sort by. If null/undefined, data is returned unsorted.
 * @returns {T[]} A new, memoized, sorted array based on the sortKey, or the original data structure if sorting is not possible/needed.
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
