// services/earthquakes/earthquakeParser.ts
import { RawEarthquake } from '../../types/earthquake';
import { CSVRow } from '../../types/csvRow';

export const parseEarthquakeRow = (row: CSVRow): RawEarthquake => ({
  id: row.id,
  time: row.time, // Keep as string as per RawEarthquake type
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
  updated: row.updated,
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
