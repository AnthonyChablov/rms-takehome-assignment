import { EarthquakeRecord } from '@/types/earthquake';
import { CSVRow } from '@/types/csvRow';
// Assuming parseEarthquakeRow is correctly defined in earthquakeParser.ts
// Or move its implementation here if preferred.
import { parseEarthquakeRow } from '../earthquakeParser/earthquakeParser';

/**
 * Transforms raw CSVRow data into structured EarthquakeRecord objects.
 * @param rows - An array of parsed CSVRow objects.
 * @returns An array of EarthquakeRecord objects.
 */
export const transformCsvToEarthquakes = (
  rows: CSVRow[],
): EarthquakeRecord[] => {
  try {
    return rows.map(parseEarthquakeRow);
  } catch (error) {
    console.error(
      'Error during CSV to EarthquakeRecord transformation:',
      error,
    );
    // Depending on requirements, you might return an empty array or re-throw
    // Re-throwing makes the overall fetch fail, which might be desired.
    throw new Error(
      `Failed to transform CSV data. ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

/**
 * Filters earthquake records, removing those unsuitable for display/sorting.
 * Specifically removes records where the sortBy key or the yAxisKey value is null or undefined.
 * @param earthquakes - The array of EarthquakeRecord objects.
 * @param sortBy - The key used for sorting (string or null/undefined).
 * @param yAxisKey - The key representing the Y-axis value for plotting (defaults to 'longitude').
 * @returns A filtered array of EarthquakeRecord objects.
 */
export const filterInvalidEarthquakes = (
  earthquakes: EarthquakeRecord[],
  sortBy?: string | null,
  yAxisKey: keyof EarthquakeRecord = 'longitude', // Default or make required if always needed
): EarthquakeRecord[] => {
  return earthquakes.filter((item) => {
    const yValue = item[yAxisKey];
    // Check if yAxis value is valid (not null or undefined)
    const isYValueValid = yValue !== null && yValue !== undefined;

    // If sortBy key is provided, check if its value is also valid
    let isSortValueValid = true; // Assume valid if no sortBy key
    if (sortBy) {
      const sortValue = item[sortBy as keyof EarthquakeRecord];
      isSortValueValid = sortValue !== null && sortValue !== undefined;
    }

    return isYValueValid && isSortValueValid;
  });
};

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
