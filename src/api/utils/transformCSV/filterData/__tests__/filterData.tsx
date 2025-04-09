import { describe, it, expect } from 'vitest';
import { filterData } from '../filterData';

interface EarthquakeRecord {
  time: string;
  latitude: number | null;
  longitude: number | null;
  depth: number;
  mag: number | null;
  magType: string | null;
  nst?: number;
  gap?: number;
  dmin?: number;
  rms?: number;
  net: string;
  id: string;
  updated: string;
  place: string;
  type: string;
  horizontalError?: number;
  depthError?: number;
  magError?: number;
  magNst?: number;
  status?: string;
  locationSource?: string;
  magSource?: string;
}

interface User {
  id: number;
  name: string | null;
  age?: number | null;
  isActive: boolean | null;
}

describe('filterData', () => {
  const mockEarthquakes: EarthquakeRecord[] = [
    {
      time: '2023-11-01T08:15:00.000Z',
      latitude: 37.7749,
      longitude: null,
      depth: 5.2,
      mag: 3.5,
      magType: 'ml',
      net: 'nc',
      id: 'nc1234abcd',
      updated: '2023-11-01T09:00:00.000Z',
      place: '5km SW of San Francisco, CA',
      type: 'earthquake',
    },
    {
      time: '2023-11-02T14:30:00.000Z',
      latitude: 60.5,
      longitude: -148.0,
      depth: 20.0,
      mag: 5.1,
      magType: 'mw',
      net: 'ak',
      id: 'ak5678efgh',
      updated: '2023-11-02T15:15:00.000Z',
      place: '120km SE of Valdez, Alaska',
      type: 'earthquake',
    },
    {
      time: '2023-11-03T21:00:00.000Z',
      latitude: -20.0,
      longitude: -175.5,
      depth: 45.0,
      mag: null,
      magType: 'mww',
      net: 'us',
      id: 'us9012ijkl',
      updated: '2023-11-03T21:45:00.000Z',
      place: 'Near Tonga Islands',
      type: 'earthquake',
    },
    {
      time: '2023-11-04T03:45:00.000Z',
      latitude: null,
      longitude: -123.3,
      depth: 8.0,
      mag: 3.9,
      magType: 'md',
      net: 'nc',
      id: 'nc3456mnop',
      updated: '2023-11-04T04:30:00.000Z',
      place: '25km NW of Ukiah, CA',
      type: 'earthquake',
    },
  ];

  it('should filter out records with null or undefined value for the specified yAxisKey (longitude)', () => {
    const result = filterData(mockEarthquakes, 'longitude');
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      mockEarthquakes[1],
      mockEarthquakes[2],
      mockEarthquakes[3],
    ]);
  });

  it('should filter out records with null or undefined value for the specified yAxisKey (latitude)', () => {
    const result = filterData(mockEarthquakes, 'latitude');
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      mockEarthquakes[0],
      mockEarthquakes[1],
      mockEarthquakes[2],
    ]);
  });

  it('should filter out records with null or undefined value for a different yAxisKey (mag)', () => {
    const result = filterData(mockEarthquakes, 'mag');
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      mockEarthquakes[0],
      mockEarthquakes[1],
      mockEarthquakes[3],
    ]);
  });

  it('should return an empty array if all records have null or undefined for the specified yAxisKey', () => {
    const result = filterData(mockEarthquakes, 'magType');
    expect(result).toHaveLength(4); // No null or undefined magType in the mock data

    const modifiedData = mockEarthquakes.map((item) => ({
      ...item,
      magType: null,
    }));
    const emptyResult = filterData(modifiedData, 'magType');
    expect(emptyResult).toHaveLength(0);
  });

  it('should handle an empty input array', () => {
    const result = filterData([], 'longitude');
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  // Test with a different data type
  const mockUsers: User[] = [
    { id: 1, name: 'Alice', age: 30, isActive: true },
    { id: 2, name: null, age: 25, isActive: true },
    { id: 3, name: 'Charlie', age: null, isActive: false },
    { id: 4, name: 'Bob', age: 40, isActive: null },
  ];

  it('should work with a different data type (User) and filter by name', () => {
    const result = filterData(mockUsers, 'name');
    expect(result).toHaveLength(3);
    expect(result).toEqual([mockUsers[0], mockUsers[2], mockUsers[3]]);
  });

  it('should work with a different data type (User) and filter by age', () => {
    const result = filterData(mockUsers, 'age');
    expect(result).toHaveLength(2);
    expect(result).toEqual([mockUsers[0], mockUsers[1]]);
  });

  it('should work with a different data type (User) and filter by isActive', () => {
    const result = filterData(mockUsers, 'isActive');
    expect(result).toHaveLength(2);
    expect(result).toEqual([mockUsers[0], mockUsers[1]]);
  });
});
