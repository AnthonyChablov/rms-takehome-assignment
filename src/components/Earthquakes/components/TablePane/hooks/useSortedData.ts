import React from 'react';
import { compareValues } from './utils/compareValues';

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
