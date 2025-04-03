import { EarthquakeRecord } from '@/types/earthquake';
/**
 * Sorts an array of EarthquakeRecord objects based on a specified key.
 * Creates a new sorted array (does not mutate the original).
 * Handles string, number, and potentially Date comparisons.
 * @param earthquakes - The array of EarthquakeRecord objects to sort.
 * @param sortBy - The key to sort by. If null or undefined, the original array order is returned.
 * @returns A new, sorted array of EarthquakeRecord objects.
 */
export const sortEarthquakes = (
  earthquakes: EarthquakeRecord[],
  sortBy?: string | null,
): EarthquakeRecord[] => {
  if (!sortBy) {
    return earthquakes; // Return original order if no sort key
  }

  // Create a shallow copy to avoid mutating the original array
  const sortedData = [...earthquakes];

  sortedData.sort((a, b) => {
    const valA = a[sortBy as keyof EarthquakeRecord];
    const valB = b[sortBy as keyof EarthquakeRecord];

    // Handle null/undefined values - sort them to the end
    if (valA == null && valB == null) return 0; // a == b
    if (valA == null) return 1; // a > b (nulls last)
    if (valB == null) return -1; // a < b (nulls last)

    // Type-specific comparisons
    if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB); // Use localeCompare for strings
    }
    if (typeof valA === 'number' && typeof valB === 'number') {
      return valA - valB; // Ascending order for numbers
    }

    return 0; // Treat as equal if types are unhandled/mixed
  });

  return sortedData;
};
