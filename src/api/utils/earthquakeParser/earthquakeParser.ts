import { CSVRow } from '@/types/csvRow';
import { EarthquakeRecord } from '@/types/earthquake';
import { formatDate } from '@/utils/utils';
/**
 * Parses a single row of CSV data representing an earthquake record into a structured
 * `EarthquakeRecord` object with appropriate data types and transformations.
 *
 * @param row - A CSVRow object representing a row of earthquake data, typically retrieved
 *              from a CSV file.
 *
 * @returns {EarthquakeRecord} - An object containing the parsed earthquake data with fields
 *                               formatted according to the `EarthquakeRecord` type.
 *
 * The `EarthquakeRecord` object includes the following fields:
 * - `id`: A unique identifier for the earthquake event.
 * - `time`: The time of the earthquake event, formatted as a human-readable string.
 * - `latitude`: The latitude of the earthquake's location, parsed as a floating-point number.
 * - `longitude`: The longitude of the earthquake's location, parsed as a floating-point number.
 * - `depth`: The depth of the earthquake in kilometers, parsed as a floating-point number.
 * - `mag`: The magnitude of the earthquake, parsed as a floating-point number.
 * - `magType`: The type of magnitude (e.g., "mb", "ml", etc.).
 * - `nst`: The number of stations that reported the earthquake; if not present, returns null.
 * - `gap`: The azimuthal gap, representing the angular distance between the farthest and nearest stations.
 * - `dmin`: The minimum distance to the earthquake's epicenter from a station.
 * - `rms`: The root mean square amplitude of the earthquake signal.
 * - `net`: The network responsible for reporting the earthquake.
 * - `updated`: The timestamp of when the earthquake data was last updated, formatted as a string.
 * - `place`: A description of the earthquake's location (e.g., "10km SW of San Francisco").
 * - `type`: The type of earthquake event (e.g., "earthquake").
 * - `horizontalError`: The estimated error in the horizontal location of the earthquake's epicenter.
 * - `depthError`: The estimated error in the earthquake's depth.
 * - `magError`: The estimated error in the earthquake's magnitude.
 * - `magNst`: The number of stations used to determine the magnitude; if not present, returns null.
 * - `status`: The status of the earthquake (e.g., "Reviewed").
 * - `locationSource`: The source of the earthquake's location data.
 * - `magSource`: The source of the earthquake's magnitude data.
 *
 * The function ensures that values like `latitude`, `longitude`, `depth`, `mag`, etc., are
 * correctly parsed to their expected types (e.g., `float` or `int`). Optional fields are
 * parsed conditionally and return `null` if missing or not applicable.
 *
 * Example usage:
 *
 * ```typescript
 * const csvRow: CSVRow = {
 *   id: '12345',
 *   time: '2022-04-03T12:00:00Z',
 *   latitude: '34.0522',
 *   longitude: '-118.2437',
 *   depth: '10.0',
 *   mag: '4.5',
 *   magType: 'mb',
 *   nst: '50',
 *   gap: '80',
 *   dmin: '0.5',
 *   rms: '1.2',
 *   net: 'us',
 *   updated: '2022-04-03T14:00:00Z',
 *   place: 'Los Angeles, CA',
 *   type: 'earthquake',
 *   horizontalError: '0.1',
 *   depthError: '0.5',
 *   magError: '0.1',
 *   magNst: '45',
 *   status: 'Reviewed',
 *   locationSource: 'us',
 *   magSource: 'us',
 * };
 *
 * const earthquakeRecord = parseEarthquakeRow(csvRow);
 * ```
 */
export const parseEarthquakeRow = (row: CSVRow): EarthquakeRecord => ({
  id: row.id,
  time: formatDate(row.time),
  latitude: parseFloat(row.latitude),
  longitude: parseFloat(row.longitude),
  depth: parseFloat(row.depth),
  mag: parseFloat(row.mag),
  magType: row.magType,
  nst: row.nst ? parseInt(row.nst, 10) : null,
  gap: row.gap ? parseFloat(row.gap) : null,
  dmin: row.dmin ? parseFloat(row.dmin) : null,
  rms: parseFloat(row.rms),
  net: row.net,
  updated: formatDate(row.updated),
  place: row.place,
  type: row.type,
  horizontalError: row.horizontalError ? parseFloat(row.horizontalError) : null,
  depthError: row.depthError ? parseFloat(row.depthError) : null,
  magError: row.magError ? parseFloat(row.magError) : null,
  magNst: row.magNst ? parseInt(row.magNst, 10) : null,
  status: row.status,
  locationSource: row.locationSource,
  magSource: row.magSource,
});
