import { describe, it, expect } from 'vitest';
import { filterEarthquakes } from '../filterEarthquakes';
import { EarthquakeRecord } from '@/types/earthquake';

describe('filterInvalidEarthquakes', () => {
  const mockEarthquakes: EarthquakeRecord[] = [
    {
      time: '2023-11-01T08:15:00.000Z',
      latitude: 37.7749,
      longitude: null,
      depth: 5.2,
      mag: 3.5,
      magType: 'ml',
      nst: 42,
      gap: 110,
      dmin: 0.08,
      rms: 0.6,
      net: 'nc',
      id: 'nc1234abcd',
      updated: '2023-11-01T09:00:00.000Z',
      place: '5km SW of San Francisco, CA',
      type: 'earthquake',
      horizontalError: 1.2,
      depthError: 1.8,
      magError: 0.25,
      magNst: 30,
      status: 'reviewed',
      locationSource: 'nc',
      magSource: 'nc',
    },
    {
      time: '2023-11-02T14:30:00.000Z',
      latitude: 60.5,
      longitude: -148.0,
      depth: 20.0,
      mag: 5.1,
      magType: 'mw',
      nst: 85,
      gap: 75,
      dmin: 3.0,
      rms: 0.9,
      net: 'ak',
      id: 'ak5678efgh',
      updated: '2023-11-02T15:15:00.000Z',
      place: '120km SE of Valdez, Alaska',
      type: 'earthquake',
      horizontalError: 2.5,
      depthError: 3.5,
      magError: 0.12,
      magNst: 60,
      status: 'reviewed',
      locationSource: 'ak',
      magSource: 'ak',
    },
    {
      time: '2023-11-03T21:00:00.000Z',
      latitude: -20.0,
      longitude: -175.5,
      depth: 45.0,
      mag: null,
      magType: 'mww',
      nst: 100,
      gap: 65,
      dmin: 4.5,
      rms: 1.1,
      net: 'us',
      id: 'us9012ijkl',
      updated: '2023-11-03T21:45:00.000Z',
      place: 'Near Tonga Islands',
      type: 'earthquake',
      horizontalError: 3.0,
      depthError: 4.8,
      magError: 0.09,
      magNst: 70,
      status: 'reviewed',
      locationSource: 'us',
      magSource: 'us',
    },
    {
      time: '2023-11-04T03:45:00.000Z',
      latitude: null,
      longitude: -123.3,
      depth: 8.0,
      mag: 3.9,
      magType: 'md',
      nst: 50,
      gap: 90,
      dmin: 0.15,
      rms: 0.75,
      net: 'nc',
      id: 'nc3456mnop',
      updated: '2023-11-04T04:30:00.000Z',
      place: '25km NW of Ukiah, CA',
      type: 'earthquake',
      horizontalError: 1.7,
      depthError: 2.3,
      magError: 0.22,
      magNst: 38,
      status: 'reviewed',
      locationSource: 'nc',
      magSource: 'nc',
    },
  ];

  it('should filter out records with invalid y-axis values by default (longitude)', () => {
    const result = filterEarthquakes(mockEarthquakes);
    expect(result).toHaveLength(3);
    expect(result).toContainEqual(mockEarthquakes[1]);
    expect(result).toContainEqual(mockEarthquakes[2]);
  });

  it('should filter out records with invalid y-axis values when specified', () => {
    const result = filterEarthquakes(mockEarthquakes, 'latitude');
    expect(result).toHaveLength(3);
    expect(result).toContainEqual(mockEarthquakes[1]);
    expect(result).toContainEqual(mockEarthquakes[2]);
  });

  it('should filter out records with invalid sort key values when specified', () => {
    const result = filterEarthquakes(mockEarthquakes, 'mag');
    expect(result).toHaveLength(3);
    expect(result).toContainEqual(mockEarthquakes[1]);
  });
  it('should filter based on both y-axis and sort key values', () => {
    const result = filterEarthquakes(mockEarthquakes, 'latitude');
    expect(result).toHaveLength(3);
    expect(result).toContainEqual(mockEarthquakes[1]);
  });

  it('should return empty array when no records match criteria', () => {
    const result = filterEarthquakes(
      mockEarthquakes,
      'nonExistentProperty' as keyof EarthquakeRecord,
    );
    expect(result).toHaveLength(0);
  });

  it('should handle empty input array', () => {
    const result = filterEarthquakes([]);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
