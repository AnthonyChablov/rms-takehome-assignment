import { EarthquakeRecord } from '@/types/earthquake';
/**
 * Applies a limit to the number of records in the array.
 * Creates a new array slice.
 * @param data - The array of EarthquakeRecord objects.
 * @param limit - The maximum number of records to return. If undefined or negative, returns the original array.
 * @returns A new array containing at most 'limit' records.
 */
export const applyLimit = <T>(data: T[], limit?: number): T[] => {
  if (limit !== undefined && limit >= 0) {
    return data.slice(0, limit);
  }
  return data; // Return original array if limit is invalid/not provided
};
