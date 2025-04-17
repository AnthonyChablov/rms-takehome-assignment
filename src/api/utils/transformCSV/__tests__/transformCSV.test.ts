import { describe, it, expect, vi } from 'vitest';
import { transformCsvToEarthquakes } from '../transformCSV';
import { EarthquakeRecord } from '@/types/earthquake';
import { CSVRow } from '@/types/csvRow';
import { parseEarthquakeRow } from '../../earthquakeParser/earthquakeParser';

// Mock the parseEarthquakeRow function to control its behavior during tests
vi.mock('../../earthquakeParser/earthquakeParser', () => ({
  parseEarthquakeRow: vi.fn(
    (row: any) =>
      ({
        id: row.id,
        time: row.time,
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
        horizontalError: row.horizontalError
          ? parseFloat(row.horizontalError)
          : null,
        depthError: row.depthError ? parseFloat(row.depthError) : null,
        magError: row.magError ? parseFloat(row.magError) : null,
        magNst: row.magNst ? parseInt(row.magNst, 10) : null,
        status: row.status,
        locationSource: row.locationSource,
        magSource: row.magSource,
        // Added a default empty extra object to the mock for consistency
        extra: {},
      }) as EarthquakeRecord,
  ),
}));

describe('transformCsvToEarthquakes', () => {
  it('should transform an array of CSV rows into an array of EarthquakeRecord objects', () => {
    // Arrange
    const mockRows = [
      {
        id: '1',
        time: '2023-01-01T00:00:00Z',
        latitude: '1.0',
        longitude: '2.0',
        depth: '3.0',
        mag: '4.0',
        magType: 'ml',
        net: 'us',
        updated: '2023-01-01T01:00:00Z',
        place: 'Test Place 1',
        type: 'earthquake',
        rms: '0.5',
        locationSource: 'us',
        magSource: 'us',
      },
      {
        id: '2',
        time: '2023-01-02T00:00:00Z',
        latitude: '5.0',
        longitude: '6.0',
        depth: '7.0',
        mag: '8.0',
        magType: 'mw',
        net: 'us',
        updated: '2023-01-02T01:00:00Z',
        place: 'Test Place 2',
        type: 'earthquake',
        rms: '0.6',
        locationSource: 'us',
        magSource: 'us',
      },
    ];

    // Act
    const result = transformCsvToEarthquakes(mockRows);

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(mockRows.length);
    result.forEach((record, index) => {
      expect(record.id).toBe(mockRows[index].id);
      expect(record.time).toBe(mockRows[index].time);
      expect(record.latitude).toBe(parseFloat(mockRows[index].latitude));
      expect(record.longitude).toBe(parseFloat(mockRows[index].longitude));
      expect(record.depth).toBe(parseFloat(mockRows[index].depth));
      expect(record.mag).toBe(parseFloat(mockRows[index].mag));
      expect(record.magType).toBe(mockRows[index].magType);
      expect(record.net).toBe(mockRows[index].net);
      expect(record.updated).toBe(mockRows[index].updated);
      expect(record.place).toBe(mockRows[index].place);
      expect(record.type).toBe(mockRows[index].type);
      expect(record.rms).toBe(parseFloat(mockRows[index].rms));
      expect(record.locationSource).toBe(mockRows[index].locationSource);
      expect(record.magSource).toBe(mockRows[index].magSource);
      expect(record.extra).toEqual({}); // No extra properties in this test
    });
    expect(parseEarthquakeRow).toHaveBeenCalledTimes(mockRows.length);
    mockRows.forEach((row) => {
      expect(parseEarthquakeRow).toHaveBeenCalledWith(row);
    });
  });

  it('should include extra properties in the "extra" field of the EarthquakeRecord objects', () => {
    // Arrange
    const mockRows = [
      {
        id: '3',
        time: '2023-01-03T00:00:00Z',
        latitude: '9.0',
        longitude: '10.0',
        depth: '11.0',
        mag: '12.0',
        magType: 'mb',
        net: 'us',
        updated: '2023-01-03T01:00:00Z',
        place: 'Test Place 3',
        type: 'earthquake',
        rms: '0.7',
        locationSource: 'us',
        magSource: 'us',
        newColumn1: 'value1',
        anotherField: 123,
      },
    ];

    // Act
    const result = transformCsvToEarthquakes(mockRows);

    // Assert
    expect(result.length).toBe(mockRows.length);
    expect(result[0].id).toBe(mockRows[0].id);
    expect(result[0].extra).toEqual({
      newColumn1: 'value1',
      anotherField: 123,
    });
    expect(parseEarthquakeRow).toHaveBeenCalledTimes(mockRows.length);
    expect(parseEarthquakeRow).toHaveBeenCalledWith(mockRows[0]);
  });

  it('should handle an empty array of CSV rows', () => {
    // Arrange
    const mockRows: any[] = [];

    // Act
    const result = transformCsvToEarthquakes(mockRows);

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
    expect(parseEarthquakeRow).not.toHaveBeenCalled();
  });

  it('should handle rows with missing optional properties without errors', () => {
    // Arrange
    const mockRows = [
      {
        id: '4',
        time: '2023-01-04T00:00:00Z',
        latitude: '13.0',
        longitude: '14.0',
        depth: '15.0',
        mag: '16.0',
        magType: 'mw',
        net: 'us',
        updated: '2023-01-04T01:00:00Z',
        place: 'Test Place 4',
        type: 'earthquake',
        rms: '0.8',
        locationSource: 'us',
        magSource: 'us',
        nst: undefined,
        gap: null,
      },
    ];

    // Act
    const result = transformCsvToEarthquakes(mockRows);

    // Assert
    expect(result.length).toBe(mockRows.length);
    // Since parseEarthquakeRow is mocked, it will return null for undefined/null
    expect(result[0].nst).toBeNull();
    expect(result[0].gap).toBeNull();
    expect(result[0].extra).toEqual({});
    expect(parseEarthquakeRow).toHaveBeenCalledWith(mockRows[0]);
  });

  it('should correctly map and include an extra property when parseEarthquakeRow is called', () => {
    // Arrange
    const mockRows = [
      {
        id: '5',
        time: '2023-01-05T00:00:00Z',
        latitude: '17.0',
        longitude: '18.0',
        depth: '19.0',
        mag: '20.0',
        magType: 'mblg',
        net: 'ci',
        updated: '2023-01-05T01:00:00Z',
        place: 'Another Test Place',
        type: 'quarry blast',
        rms: '0.9',
        locationSource: 'ci',
        magSource: 'ci',
        intensity: 'III', // An extra property
      },
    ];

    // Act
    const result = transformCsvToEarthquakes(mockRows);

    // Assert
    expect(result.length).toBe(mockRows.length);
    expect(result[0].id).toBe(mockRows[0].id);
    expect(result[0].time).toBe(mockRows[0].time);
    expect(result[0].latitude).toBe(parseFloat(mockRows[0].latitude));
    expect(result[0].longitude).toBe(parseFloat(mockRows[0].longitude));
    expect(result[0].depth).toBe(parseFloat(mockRows[0].depth));
    expect(result[0].mag).toBe(parseFloat(mockRows[0].mag));
    expect(result[0].magType).toBe(mockRows[0].magType);
    expect(result[0].net).toBe(mockRows[0].net);
    expect(result[0].updated).toBe(mockRows[0].updated);
    expect(result[0].place).toBe(mockRows[0].place);
    expect(result[0].type).toBe(mockRows[0].type);
    expect(result[0].rms).toBe(parseFloat(mockRows[0].rms));
    expect(result[0].locationSource).toBe(mockRows[0].locationSource);
    expect(result[0].magSource).toBe(mockRows[0].magSource);
    expect(result[0].extra).toEqual({ intensity: 'III' });
    expect(parseEarthquakeRow).toHaveBeenCalledTimes(mockRows.length);
    expect(parseEarthquakeRow).toHaveBeenCalledWith(mockRows[0]);
  });
});
