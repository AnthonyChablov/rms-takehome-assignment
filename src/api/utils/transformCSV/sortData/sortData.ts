/**
 * Sorts an array of objects based on a specified key.
 * Creates a new sorted array (does not mutate the original).
 * Handles string, number, and potentially Date comparisons.
 * @param items - The array of objects to sort.
 * @param sortBy - The key to sort by. If null or undefined, the original array order is returned.
 * @returns A new, sorted array of objects.
 */
export const sortData = <T>(
  items: T[],
  sortBy?: keyof T | string | null,
): T[] => {
  if (!sortBy) {
    return items; // Return original order if no sort key
  }

  // Create a shallow copy to avoid mutating the original array
  const sortedData = [...items];

  sortedData.sort((a, b) => {
    const valA = a[sortBy as keyof T];
    const valB = b[sortBy as keyof T];

    // Handle null/undefined values - sort them to the end
    if (valA == null && valB == null) return 0; // a == b
    if (valA == null) return 1; // a > b (nulls last)
    if (valB == null) return -1; // a < b (nulls last)

    // Type-specific comparisons
    if (typeof valA === 'string' && typeof valB === 'string') {
      return (valA as string).localeCompare(valB as string); // Use localeCompare for strings
    }
    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA as number) - (valB as number); // Ascending order for numbers
    }
    if (valA instanceof Date && valB instanceof Date) {
      return valA.getTime() - valB.getTime(); // Ascending order for Dates
    }

    return 0; // Treat as equal if types are unhandled/mixed
  });

  return sortedData;
};
