import { describe, it, expect } from 'vitest';
import { sortEarthquakes } from '../sortEarthquakes';
import { EarthquakeRecord } from '@/types/earthquake';

describe('sortEarthquakes', () => {
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
    {
      time: '2023-11-06T09:55:00.000Z',
      latitude: 10.0,
      longitude: -160.0,
      depth: null,
      mag: 2.0,
      magType: 'mb',
      nst: 20,
      gap: 150,
      dmin: 5.0,
      rms: 1.5,
      net: 'ci',
      id: 'ci0000uvwx',
      updated: '2023-11-07T01:00:00.000Z',
      place: 'Mid-Pacific Ocean',
      type: 'earthquake',
      horizontalError: null,
      depthError: null,
      magError: null,
      magNst: null,
      status: 'automatic',
      locationSource: 'ci',
      magSource: 'ci',
    },
  ];

  it('should return the original array if sortBy is null or undefined', () => {
    expect(sortEarthquakes(mockEarthquakes, null)).toEqual(mockEarthquakes);
    expect(sortEarthquakes(mockEarthquakes, undefined)).toEqual(
      mockEarthquakes,
    );
  });

  it('should sort earthquakes by magnitude in ascending order', () => {
    const sortedByMag = sortEarthquakes(mockEarthquakes, 'mag');

    // Check if the array is sorted by magnitude
    expect(sortedByMag[0].mag).toBe(2.0); // Smallest magnitude
    expect(sortedByMag[sortedByMag.length - 1].mag).toBe(6.3); // Largest magnitude

    // Verify the entire array is sorted
    for (let i = 0; i < sortedByMag.length - 1; i++) {
      // Use type assertion to tell TypeScript that these values are numbers
      const currentMag = sortedByMag[i].mag as number;
      const nextMag = sortedByMag[i + 1].mag as number;
      expect(currentMag).toBeLessThanOrEqual(nextMag);
    }
  });

  it('should sort earthquakes by depth with null values at the end', () => {
    const sortedByDepth = sortEarthquakes(mockEarthquakes, 'depth');

    // Check the first value is the shallowest non-null depth
    expect(sortedByDepth[0].depth).toBe(5.2);

    // The earthquake with null depth should be last
    const lastEarthquake = sortedByDepth[sortedByDepth.length - 1];
    expect(lastEarthquake.depth).toBeNull();

    // All non-null depths should be in ascending order
    const nonNullEntries = sortedByDepth.filter((eq) => eq.depth !== null);
    for (let i = 0; i < nonNullEntries.length - 1; i++) {
      // Type assertion to tell TypeScript these are non-null numbers
      const currentDepth = nonNullEntries[i].depth as number;
      const nextDepth = nonNullEntries[i + 1].depth as number;
      expect(currentDepth).toBeLessThanOrEqual(nextDepth);
    }
  });

  it('should sort earthquakes by place name alphabetically', () => {
    const sortedByPlace = sortEarthquakes(mockEarthquakes, 'place');

    // Extract place names and ensure we're dealing only with strings (no nulls)
    const places = sortedByPlace
      .map((eq) => eq.place)
      .filter((place): place is string => typeof place === 'string');

    // Create a manually sorted copy to compare against
    const manualSorted = [...places].sort((a, b) => a.localeCompare(b));

    expect(places).toEqual(manualSorted);
  });

  it('should sort earthquakes by time chronologically', () => {
    const sortedByTime = sortEarthquakes(mockEarthquakes, 'time');

    // Check if sorted chronologically
    for (let i = 0; i < sortedByTime.length - 1; i++) {
      // All time values in our test data are strings, so this is safe
      const timeA = new Date(sortedByTime[i].time as string).getTime();
      const timeB = new Date(sortedByTime[i + 1].time as string).getTime();
      expect(timeA).toBeLessThanOrEqual(timeB);
    }
  });

  it('should not mutate the original array', () => {
    const originalArray = JSON.parse(JSON.stringify(mockEarthquakes));
    sortEarthquakes(mockEarthquakes, 'mag');

    // Verify original array hasn't changed
    expect(mockEarthquakes).toEqual(originalArray);
  });

  it('should handle earthquakes with identical values for the sort key', () => {
    // The dataset has two earthquakes with identical times
    const sortedByTime = sortEarthquakes(mockEarthquakes, 'time');

    // Find the two entries with identical times
    const sameTimeEntries = mockEarthquakes.filter(
      (eq) => eq.time === '2023-11-06T09:55:00.000Z',
    );

    expect(sameTimeEntries.length).toBe(2); // Verify we have 2 earthquakes with the same time

    // Check that both entries exist in the sorted array
    const sortedIds = sortedByTime.map((eq) => eq.id);
    sameTimeEntries.forEach((entry) => {
      expect(sortedIds).toContain(entry.id);
    });
  });

  it('should handle sorting by fields with null values', () => {
    const sortedByHorizontalError = sortEarthquakes(
      mockEarthquakes,
      'horizontalError',
    );

    // Check that non-null values are sorted
    const nonNullEntries = sortedByHorizontalError.filter(
      (eq): eq is EarthquakeRecord & { horizontalError: number } =>
        eq.horizontalError !== null,
    );

    for (let i = 0; i < nonNullEntries.length - 1; i++) {
      expect(nonNullEntries[i].horizontalError).toBeLessThanOrEqual(
        nonNullEntries[i + 1].horizontalError,
      );
    }

    // Check that null values are at the end
    const nullEntries = sortedByHorizontalError.filter(
      (eq) => eq.horizontalError === null,
    );
    expect(nullEntries.length).toBeGreaterThan(0);
    expect(
      sortedByHorizontalError[sortedByHorizontalError.length - 1]
        .horizontalError,
    ).toBeNull();
  });

  it('should handle sorting by nonexistent properties', () => {
    // @ts-ignore - Intentionally testing with invalid property
    const result = sortEarthquakes(mockEarthquakes, 'nonExistentProperty');

    // Should return a copy of the array without errors
    expect(result).toHaveLength(mockEarthquakes.length);
    expect(result).not.toBe(mockEarthquakes); // Check it's a new array (copy)
  });
});
