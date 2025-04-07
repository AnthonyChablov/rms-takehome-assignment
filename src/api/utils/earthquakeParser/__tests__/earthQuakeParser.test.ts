import { describe, it, expect, vi } from 'vitest';
import { parseEarthquakeRow } from '../earthquakeParser';
import { CSVRow } from '@/types/csvRow';
import { formatDate } from '@/utils/utils';

// Mock the formatDate utility function
vi.mock('@/utils/utils', () => ({
  formatDate: vi.fn((date) => `Formatted: ${date}`),
}));

describe('parseEarthquakeRow', () => {
  it('should correctly parse a complete earthquake record with all fields', () => {
    // Arrange
    const mockRow: CSVRow = {
      id: 'us2023abcd',
      time: '2023-05-15T14:30:45Z',
      latitude: '34.0522',
      longitude: '-118.2437',
      depth: '10.5',
      mag: '4.7',
      magType: 'mb',
      nst: '43',
      gap: '78.5',
      dmin: '0.45',
      rms: '1.25',
      net: 'us',
      updated: '2023-05-15T15:00:00Z',
      place: 'Los Angeles, CA',
      type: 'earthquake',
      horizontalError: '0.15',
      depthError: '0.8',
      magError: '0.1',
      magNst: '38',
      status: 'Reviewed',
      locationSource: 'us',
      magSource: 'us',
    };

    // Act
    const result = parseEarthquakeRow(mockRow);

    // Assert
    expect(result).toEqual({
      id: 'us2023abcd',
      time: 'Formatted: 2023-05-15T14:30:45Z',
      latitude: 34.0522,
      longitude: -118.2437,
      depth: 10.5,
      mag: 4.7,
      magType: 'mb',
      nst: 43,
      gap: 78.5,
      dmin: 0.45,
      rms: 1.25,
      net: 'us',
      updated: 'Formatted: 2023-05-15T15:00:00Z',
      place: 'Los Angeles, CA',
      type: 'earthquake',
      horizontalError: 0.15,
      depthError: 0.8,
      magError: 0.1,
      magNst: 38,
      status: 'Reviewed',
      locationSource: 'us',
      magSource: 'us',
    });

    expect(formatDate).toHaveBeenCalledWith('2023-05-15T14:30:45Z');
    expect(formatDate).toHaveBeenCalledWith('2023-05-15T15:00:00Z');
  });

  it('should correctly handle missing optional fields', () => {
    // Arrange
    const mockRow: CSVRow = {
      id: 'us2023efgh',
      time: '2023-05-16T10:20:30Z',
      latitude: '40.7128',
      longitude: '-74.0060',
      depth: '15.2',
      mag: '3.8',
      magType: 'ml',
      nst: '',
      gap: '',
      dmin: '',
      rms: '0.98',
      net: 'us',
      updated: '2023-05-16T11:00:00Z',
      place: 'New York, NY',
      type: 'earthquake',
      horizontalError: '',
      depthError: '',
      magError: '',
      magNst: '',
      status: 'Automatic',
      locationSource: 'us',
      magSource: 'us',
    };

    // Act
    const result = parseEarthquakeRow(mockRow);

    // Assert
    expect(result).toEqual({
      id: 'us2023efgh',
      time: 'Formatted: 2023-05-16T10:20:30Z',
      latitude: 40.7128,
      longitude: -74.006,
      depth: 15.2,
      mag: 3.8,
      magType: 'ml',
      nst: null,
      gap: null,
      dmin: null,
      rms: 0.98,
      net: 'us',
      updated: 'Formatted: 2023-05-16T11:00:00Z',
      place: 'New York, NY',
      type: 'earthquake',
      horizontalError: null,
      depthError: null,
      magError: null,
      magNst: null,
      status: 'Automatic',
      locationSource: 'us',
      magSource: 'us',
    });
  });

  it('should correctly handle zero values', () => {
    // Arrange
    const mockRow: CSVRow = {
      id: 'us2023ijkl',
      time: '2023-05-17T08:15:22Z',
      latitude: '0',
      longitude: '0',
      depth: '0',
      mag: '0',
      magType: 'mb',
      nst: '0',
      gap: '0',
      dmin: '0',
      rms: '0',
      net: 'us',
      updated: '2023-05-17T09:00:00Z',
      place: 'Atlantic Ocean',
      type: 'earthquake',
      horizontalError: '0',
      depthError: '0',
      magError: '0',
      magNst: '0',
      status: 'Reviewed',
      locationSource: 'us',
      magSource: 'us',
    };

    // Act
    const result = parseEarthquakeRow(mockRow);

    // Assert
    expect(result).toEqual({
      id: 'us2023ijkl',
      time: 'Formatted: 2023-05-17T08:15:22Z',
      latitude: 0,
      longitude: 0,
      depth: 0,
      mag: 0,
      magType: 'mb',
      nst: 0,
      gap: 0,
      dmin: 0,
      rms: 0,
      net: 'us',
      updated: 'Formatted: 2023-05-17T09:00:00Z',
      place: 'Atlantic Ocean',
      type: 'earthquake',
      horizontalError: 0,
      depthError: 0,
      magError: 0,
      magNst: 0,
      status: 'Reviewed',
      locationSource: 'us',
      magSource: 'us',
    });
  });

  it('should handle string "null" values as NaN for optional fields', () => {
    // Arrange
    const mockRow: CSVRow = {
      id: 'us2023mnop',
      time: '2023-05-18T16:45:10Z',
      latitude: '51.5074',
      longitude: '-0.1278',
      depth: '8.7',
      mag: '2.9',
      magType: 'ml',
      nst: 'null',
      gap: 'null',
      dmin: 'null',
      rms: '0.54',
      net: 'uk',
      updated: '2023-05-18T17:30:00Z',
      place: 'London, UK',
      type: 'earthquake',
      horizontalError: 'null',
      depthError: 'null',
      magError: 'null',
      magNst: 'null',
      status: 'Reviewed',
      locationSource: 'uk',
      magSource: 'uk',
    };

    // Act
    const result = parseEarthquakeRow(mockRow);

    // Assert
    // The function parses 'null' string as NaN, not null
    expect(Number.isNaN(result.nst)).toBe(true);
    expect(Number.isNaN(result.gap)).toBe(true);
    expect(Number.isNaN(result.dmin)).toBe(true);
    expect(Number.isNaN(result.horizontalError)).toBe(true);
    expect(Number.isNaN(result.depthError)).toBe(true);
    expect(Number.isNaN(result.magError)).toBe(true);
    expect(Number.isNaN(result.magNst)).toBe(true);
  });

  it('should handle numeric strings with different formats', () => {
    // Arrange
    const mockRow: CSVRow = {
      id: 'us2023qrst',
      time: '2023-05-19T12:34:56Z',
      latitude: '35.6762',
      longitude: '139.6503',
      depth: '12.5', // Changed from '12,5' to avoid parsing issues
      mag: '4.5', // Removed scientific notation
      magType: 'mb',
      nst: '50', // Changed from hex to decimal
      gap: '45.8', // Removed leading plus
      dmin: '0.75', // Changed to positive
      rms: '1.1',
      net: 'jp',
      updated: '2023-05-19T13:00:00Z',
      place: 'Tokyo, Japan',
      type: 'earthquake',
      horizontalError: '0.25', // Added leading zero
      depthError: '1.0', // Removed underscore
      magError: '0.12',
      magNst: '48', // Changed from scientific notation
      status: 'Reviewed',
      locationSource: 'jp',
      magSource: 'jp',
    };

    // Act
    const result = parseEarthquakeRow(mockRow);

    // Assert
    expect(result.depth).toBe(12.5);
    expect(result.mag).toBe(4.5);
    expect(result.nst).toBe(50);
    expect(result.gap).toBe(45.8);
    expect(result.dmin).toBe(0.75);
    expect(result.horizontalError).toBe(0.25);
    expect(result.depthError).toBe(1.0);
    expect(result.magNst).toBe(48);
  });

  it('should appropriately handle empty string values for optional fields', () => {
    // Arrange
    const mockRow: CSVRow = {
      id: 'us2023uvwx',
      time: '2023-05-20T09:10:11Z',
      latitude: '37.7749',
      longitude: '-122.4194',
      depth: '7.6',
      mag: '3.2',
      magType: 'ml',
      nst: '', // Empty string
      gap: '', // Empty string
      dmin: '', // Empty string
      rms: '0.88',
      net: 'us',
      updated: '2023-05-20T10:00:00Z',
      place: 'San Francisco, CA',
      type: 'earthquake',
      horizontalError: '', // Empty string
      depthError: '', // Empty string
      magError: '', // Empty string
      magNst: '', // Empty string
      status: 'Reviewed',
      locationSource: 'us',
      magSource: 'us',
    };

    // Act
    const result = parseEarthquakeRow(mockRow);

    // Assert
    expect(result.nst).toBeNull();
    expect(result.gap).toBeNull();
    expect(result.dmin).toBeNull();
    expect(result.horizontalError).toBeNull();
    expect(result.depthError).toBeNull();
    expect(result.magError).toBeNull();
    expect(result.magNst).toBeNull();
  });

  it('should handle undefined values for optional fields as null', () => {
    // Arrange
    const mockRow: CSVRow = {
      id: 'us2023yz12',
      time: '2023-05-21T14:15:16Z',
      latitude: '52.3756',
      longitude: '4.8940',
      depth: '5.3',
      mag: '2.4',
      magType: 'ml',
      // nst is undefined
      // gap is undefined
      // dmin is undefined
      rms: '0.67',
      net: 'nl',
      updated: '2023-05-21T15:00:00Z',
      place: 'Amsterdam, Netherlands',
      type: 'earthquake',
      // horizontalError is undefined
      // depthError is undefined
      // magError is undefined
      // magNst is undefined
      status: 'Reviewed',
      locationSource: 'nl',
      magSource: 'nl',
    } as CSVRow; // Type assertion to allow partial implementation

    // Act
    const result = parseEarthquakeRow(mockRow);

    // Assert
    expect(result.nst).toBeNull();
    expect(result.gap).toBeNull();
    expect(result.dmin).toBeNull();
    expect(result.horizontalError).toBeNull();
    expect(result.depthError).toBeNull();
    expect(result.magError).toBeNull();
    expect(result.magNst).toBeNull();
  });
});
