export interface CSVRow {
  time: string;
  latitude: string;
  longitude: string;
  depth: string;
  mag: string;
  magType: string;
  nst: string | undefined;
  gap: string | undefined;
  dmin: string | undefined;
  rms: string;
  net: string;
  id: string;
  updated: string;
  place: string;
  type: string;
  horizontalError: string | undefined;
  depthError: string;
  magError: string | undefined;
  magNst: string | undefined;
  status: string;
  locationSource: string;
  magSource: string;
}
