/**
 * Represents a normalized and type-safe earthquake record,
 * typically used after parsing and converting raw CSV data.
 */
export interface EarthquakeRecord {
  /** ISO timestamp of the earthquake occurrence */
  time: string;

  /** Latitude of the earthquake's epicenter, or null if missing */
  latitude: number | null;

  /** Longitude of the earthquake's epicenter, or null if missing */
  longitude: number | null;

  /** Depth of the earthquake in kilometers, or null if missing */
  depth: number | null;

  /** Magnitude value of the earthquake, or null if missing */
  mag: number | null;

  /** Type of magnitude used (e.g., mb, ml, mw) */
  magType: string;

  /** Number of seismic stations used, or null if unavailable */
  nst: number | null;

  /** Gap in station coverage (in degrees), or null if not reported */
  gap: number | null;

  /** Distance to nearest station (in degrees), or null */
  dmin: number | null;

  /** Root mean square of amplitude spectrum, or null */
  rms: number | null;

  /** Network identifier (e.g., us, ci, nc), or null */
  net: string | null;

  /** Unique ID for the earthquake record, or null if unavailable */
  id: string | null;

  /** Timestamp of last update to this record, or null */
  updated: string | null;

  /** Human-readable location description (e.g., "5km NW of San Jose"), or null */
  place: string | null;

  /** Type of seismic event (e.g., "earthquake", "quarry blast"), or null */
  type: string | null;

  /** Horizontal location error in kilometers, or null */
  horizontalError: number | null;

  /** Vertical location error (depth uncertainty) in kilometers, or null */
  depthError: number | null;

  /** Estimated magnitude error, or null */
  magError: number | null;

  /** Number of stations used to calculate magnitude, or null */
  magNst: number | null;

  /** Review status (e.g., "reviewed", "automatic"), or null */
  status: string | null;

  /** Source network for location data, or null */
  locationSource: string | null;

  /** Source network for magnitude data, or null */
  magSource: string | null;

  /**
   * Allows for additional properties with string keys and any value type.
   * This makes the type extendable.
   */
  [key: string]: any;
}
