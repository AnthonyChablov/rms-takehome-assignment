export interface EarthquakeRecord {
  time: string;
  latitude: number | null;
  longitude: number | null;
  depth: number | null;
  mag: number | null;
  magType: string;
  nst: number | null;
  gap: number | null;
  dmin: number | null;
  rms: number | null;
  net: string | null;
  id: string | null;
  updated: string | null;
  place: string | null;
  type: string | null;
  horizontalError: number | null;
  depthError: number | null;
  magError: number | null;
  magNst: number | null;
  status: string | null;
  locationSource: string | null;
  magSource: string | null;
}
