import { EarthquakeRecord } from '@/types/earthquake';
/**
 * Applies a limit to the number of records in the array.
 * Creates a new array slice.
 * @param earthquakes - The array of EarthquakeRecord objects.
 * @param limit - The maximum number of records to return. If undefined or negative, returns the original array.
 * @returns A new array containing at most 'limit' records.
 */
export const applyLimit = (
  earthquakes: EarthquakeRecord[],
  limit?: number,
): EarthquakeRecord[] => {
  if (limit !== undefined && limit >= 0) {
    return earthquakes.slice(0, limit);
  }
  return earthquakes; // Return original array if limit is invalid/not provided
};
