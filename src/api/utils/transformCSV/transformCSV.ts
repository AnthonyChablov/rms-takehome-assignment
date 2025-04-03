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
