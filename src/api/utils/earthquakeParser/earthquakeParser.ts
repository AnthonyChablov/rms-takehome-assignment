import { EarthquakeRecord } from '@/types/earthquake';
import { formatDate } from '@/utils/utils';
import { CSVRow } from '@/types/csvRow'; // Keep this import for type safety on known properties

/**
 * Parses a single row of CSV data (with a generic structure) into a structured
 * `EarthquakeRecord` object by explicitly mapping known properties. Any
 * unmapped properties in the input row are ignored.
 *
 * @param row - An object representing a row of CSV data with potentially
 * any set of keys and string values.
 *
 * @returns {EarthquakeRecord} - An object containing the parsed earthquake data
 * with fields formatted according to the
 * `EarthquakeRecord` type.
 */
export const parseEarthquakeRow = <T extends Record<string, any>>(
  row: T,
): EarthquakeRecord => ({
  id: row.id as string, // Assuming 'id' exists in T and is a string
  time: formatDate(row.time as string), // Assuming 'time' exists and is a string
  latitude: parseFloat(row.latitude as string), // Assuming 'latitude' exists and is a string
  longitude: parseFloat(row.longitude as string), // Assuming 'longitude' exists and is a string
  depth: parseFloat(row.depth as string), // Assuming 'depth' exists and is a string
  mag: parseFloat(row.mag as string), // Assuming 'mag' exists and is a string
  magType: row.magType as string, // Assuming 'magType' exists and is a string
  nst: row.nst ? parseInt(row.nst as string, 10) : null, // Assuming 'nst' exists and is a string
  gap: row.gap ? parseFloat(row.gap as string) : null, // Assuming 'gap' exists and is a string
  dmin: row.dmin ? parseFloat(row.dmin as string) : null, // Assuming 'dmin' exists and is a string
  rms: parseFloat(row.rms as string), // Assuming 'rms' exists and is a string
  net: row.net as string, // Assuming 'net' exists and is a string
  updated: formatDate(row.updated as string), // Assuming 'updated' exists and is a string
  place: row.place as string, // Assuming 'place' exists and is a string
  type: row.type as string, // Assuming 'type' exists and is a string
  horizontalError: row.horizontalError
    ? parseFloat(row.horizontalError as string)
    : null, // Assuming 'horizontalError' exists and is a string
  depthError: row.depthError ? parseFloat(row.depthError as string) : null, // Assuming 'depthError' exists and is a string
  magError: row.magError ? parseFloat(row.magError as string) : null, // Assuming 'magError' exists and is a string
  magNst: row.magNst ? parseInt(row.magNst as string, 10) : null, // Assuming 'magNst' exists and is a string
  status: row.status as string, // Assuming 'status' exists and is a string
  locationSource: row.locationSource as string, // Assuming 'locationSource' exists and is a string
  magSource: row.magSource as string, // Assuming 'magSource' exists and is a string
});
