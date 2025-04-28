import { EarthquakeRecord } from '@/types/earthquake';
import { parseEarthquakeRow } from '../earthquakeParser/earthquakeParser';

/**
 * Transforms an array of generic objects (parsed CSV rows from Papa Parse)
 * into structured EarthquakeRecord objects, dynamically handling varying CSV
 * column structures.
 *
 * @param rows - An array of parsed CSV rows, where each row is an object
 * with keys corresponding to the CSV headers. The type `T` allows for
 * flexibility in the structure of each row.
 * @returns An array of EarthquakeRecord objects. Fields not explicitly
 * mapped by `parseEarthquakeRow` will be included in the `extra` property
 * of each `EarthquakeRecord`.
 */
export const transformCsvToEarthquakes = <T extends Record<string, any>>(
  rows: T[],
): EarthquakeRecord[] => {
  // Use the 'map' function to iterate over each 'row' in the 'rows' array.
  // For each 'row', a new EarthquakeRecord object will be created and returned.
  return rows.map((row) => {
    // Call the 'parseEarthquakeRow' function to transform the current generic 'row'
    // into a base 'EarthquakeRecord' object. Note that 'row' is implicitly
    // cast to 'any' here to satisfy the type expectation of 'parseEarthquakeRow',
    // which likely expects a 'CSVRow' type with specific properties.
    const earthquakeRecord = parseEarthquakeRow(row as any);

    // Initialize an empty object called 'extra'. This object will store any
    // properties from the current 'row' that are not part of the standard
    // 'EarthquakeRecord' structure (i.e., dynamically added columns).
    const extra: Record<string, any> = {};
    let hasExtra = false;

    // Iterate over all the keys in the current 'row' object.
    for (const key in row) {
      // Check if the current 'key' belongs directly to the 'row' object
      // and is not inherited from its prototype.
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        // Check if the current 'key' is NOT present as a direct property in the
        // 'earthquakeRecord' object. This means it's an extra, unmapped column
        // from the CSV.
        if (!(key in earthquakeRecord)) {
          // If the 'key' is not in 'earthquakeRecord', add it to the 'extra' object,
          // preserving its original value from the 'row'.
          extra[key] = row[key];
          hasExtra = true;
        }
      }
    }

    // Conditionally add the 'extra' property only if there are extra fields
    return hasExtra ? { ...earthquakeRecord, extra } : earthquakeRecord;
  });
};
