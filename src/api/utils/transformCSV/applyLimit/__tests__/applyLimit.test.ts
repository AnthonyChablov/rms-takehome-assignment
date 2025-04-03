import { describe, it, expect } from 'vitest';
import { applyLimit } from '../applyLimit';
import { EarthquakeRecord } from '@/types/earthquake';

describe('applyLimit', () => {
  const mockEarthquakes: EarthquakeRecord[] = [
    {
      time: '2023-11-01T08:15:00.000Z',
      latitude: 37.7749,
      longitude: -122.4194,
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
      mag: 6.3,
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
      latitude: 39.2,
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
    {
      time: '2023-11-05T17:20:00.000Z',
      latitude: 20.8,
      longitude: -156.3,
      depth: 35.0,
      mag: 4.7,
      magType: 'ml',
      nst: 75,
      gap: 80,
      dmin: 2.0,
      rms: 0.85,
      net: 'hv',
      id: 'hv7890qrst',
      updated: '2023-11-05T18:05:00.000Z',
      place: 'Near Maui, Hawaii',
      type: 'earthquake',
      horizontalError: 2.2,
      depthError: 3.8,
      magError: 0.18,
      magNst: 55,
      status: 'reviewed',
      locationSource: 'hv',
      magSource: 'hv',
    },
    {
      time: '2023-11-06T09:55:00.000Z',
      latitude: 47.6,
      longitude: -122.33,
      depth: 22.0,
      mag: 3.2,
      magType: 'ml',
      nst: 35,
      gap: 125,
      dmin: 0.25,
      rms: 0.55,
      net: 'uw',
      id: 'uw13579abc',
      updated: '2023-11-06T10:40:00.000Z',
      place: 'Near Seattle, Washington',
      type: 'earthquake',
      horizontalError: 1.5,
      depthError: 2.1,
      magError: 0.3,
      magNst: 28,
      status: 'reviewed',
      locationSource: 'uw',
      magSource: 'uw',
    },
  ];

  it('should limit the array to the specified number of records', () => {
    // Act
    const result = applyLimit(mockEarthquakes, 3);

    // Assert
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(mockEarthquakes[0]);
    expect(result[1]).toEqual(mockEarthquakes[1]);
    expect(result[2]).toEqual(mockEarthquakes[2]);
  });

  it('should return the entire array when limit is greater than array length', () => {
    // Act
    const result = applyLimit(mockEarthquakes, 10);

    // Assert
    expect(result).toHaveLength(mockEarthquakes.length);
    expect(result).toEqual(mockEarthquakes);
    // While equal in content, it should be a new array (not the same reference)
    expect(result).not.toBe(mockEarthquakes);
  });

  it('should return an empty array when limit is 0', () => {
    // Act
    const result = applyLimit(mockEarthquakes, 0);

    // Assert
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return the original array when limit is undefined', () => {
    // Act
    const result = applyLimit(mockEarthquakes);

    // Assert
    expect(result).toHaveLength(mockEarthquakes.length);
    expect(result).toEqual(mockEarthquakes);
    // Reference should be the same as we're returning the original array
    expect(result).toBe(mockEarthquakes);
  });

  it('should return the original array when limit is negative', () => {
    // Act
    const result = applyLimit(mockEarthquakes, -3);

    // Assert
    expect(result).toHaveLength(mockEarthquakes.length);
    expect(result).toEqual(mockEarthquakes);
    expect(result).toBe(mockEarthquakes);
  });

  it('should handle empty array input', () => {
    // Act
    const result = applyLimit([], 5);

    // Assert
    expect(result).toEqual([]);
  });
});
