/**
 * Represents a single row of parsed earthquake data from a CSV file.
 */
export interface CSVRow {
  /** Timestamp of the earthquake event (ISO format) */
  time: string;

  /** Latitude of the earthquake's epicenter */
  latitude: string;

  /** Longitude of the earthquake's epicenter */
  longitude: string;

  /** Depth of the earthquake in kilometers */
  depth: string;

  /** Magnitude of the earthquake */
  mag: string;

  /** Type of magnitude used (e.g., mb, ml, mw) */
  magType: string;

  /** Number of seismic stations that reported the event (optional) */
  nst: string | undefined;

  /** Gap in degrees between the closest and furthest stations (optional) */
  gap: string | undefined;

  /** Minimum distance to the nearest station (optional) */
  dmin: string | undefined;

  /** Root mean square of the amplitude spectrum of the event */
  rms: string;

  /** Network that reported the event (e.g., us, ci, nc) */
  net: string;

  /** Unique identifier for the earthquake */
  id: string;

  /** Timestamp of the last update to this record */
  updated: string;

  /** Human-readable location description */
  place: string;

  /** Type of seismic event (e.g., earthquake, quarry blast) */
  type: string;

  /** Horizontal location error in kilometers (optional) */
  horizontalError: string | undefined;

  /** Vertical location error or uncertainty in depth */
  depthError: string;

  /** Error or uncertainty in the magnitude value (optional) */
  magError: string | undefined;

  /** Number of stations used to calculate magnitude (optional) */
  magNst: string | undefined;

  /** Review status of the event (e.g., reviewed, automatic) */
  status: string;

  /** Source network for the location data */
  locationSource: string;

  /** Source network for the magnitude data */
  magSource: string;

  /**
   * Allows for additional properties with string keys and any value type.
   * This makes the type extendable.
   */
  [key: string]: any;
}
