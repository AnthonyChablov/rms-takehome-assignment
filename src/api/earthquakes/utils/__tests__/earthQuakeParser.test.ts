// services/earthquakes/earthquakeParser.test.ts
import { CSVRow } from '@/types/csvRow';
import { EarthquakeRecord } from '@/types/earthquake';
import { parseEarthquakeRow } from '../earthquakeParser';

describe('parseEarthquakeRow', () => {
  it('should correctly parse a valid CSV row', () => {
    // Arrange
    const row: CSVRow = {
      id: 'ak020c02116',
      time: '2024-03-30T23:00:04.910Z',
      latitude: '60.1923',
      longitude: '-152.028',
      depth: '84.8',
      mag: '1.7',
      magType: 'ml',
      nst: 'null',
      gap: '158.4',
      dmin: '0.04689',
      rms: '0.67',
      net: 'ak',
      updated: '2024-03-30T23:06:58.269Z',
      place: '22 km W of Tyonek, Alaska',
      type: 'earthquake',
      horizontalError: 'null',
      depthError: '0.5',
      magError: 'null',
      magNst: 'null',
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    const expectedRecord: EarthquakeRecord = {
      id: 'ak020c02116',
      time: '2024-03-30T23:00:04.910Z',
      latitude: 60.1923,
      longitude: -152.028,
      depth: 84.8,
      mag: 1.7,
      magType: 'ml',
      nst: null,
      gap: 158.4,
      dmin: 0.04689,
      rms: 0.67,
      net: 'ak',
      updated: '2024-03-30T23:06:58.269Z',
      place: '22 km W of Tyonek, Alaska',
      type: 'earthquake',
      horizontalError: null,
      depthError: 0.5,
      magError: null,
      magNst: null,
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    // Act
    const actualRecord = parseEarthquakeRow(row);

    // Assert
    expect(actualRecord).toEqual(expectedRecord);
  });

  it('should correctly parse a CSV row with null-like string values', () => {
    // Arrange
    const row: CSVRow = {
      id: 'ak020c02117',
      time: '2024-03-30T22:50:54.680Z',
      latitude: '60.4815',
      longitude: '-152.766',
      depth: '109.9',
      mag: '1.1',
      magType: 'ml',
      nst: 'null',
      gap: 'null',
      dmin: 'null',
      rms: '0.66',
      net: 'ak',
      updated: '2024-03-30T22:56:07.479Z',
      place: '69 km W of Tyonek, Alaska',
      type: 'earthquake',
      horizontalError: 'null',
      depthError: '0.6',
      magError: 'null',
      magNst: 'null',
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    const expectedRecord: EarthquakeRecord = {
      id: 'ak020c02117',
      time: '2024-03-30T22:50:54.680Z',
      latitude: 60.4815,
      longitude: -152.766,
      depth: 109.9,
      mag: 1.1,
      magType: 'ml',
      nst: null,
      gap: null,
      dmin: null,
      rms: 0.66,
      net: 'ak',
      updated: '2024-03-30T22:56:07.479Z',
      place: '69 km W of Tyonek, Alaska',
      type: 'earthquake',
      horizontalError: null,
      depthError: 0.6,
      magError: null,
      magNst: null,
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    // Act
    const actualRecord = parseEarthquakeRow(row);

    // Assert
    expect(actualRecord).toEqual(expectedRecord);
  });

  it('should handle missing optional numeric values', () => {
    // Arrange
    const row: CSVRow = {
      id: 'ak020c02118',
      time: '2024-03-30T22:42:47.340Z',
      latitude: '60.6083',
      longitude: '-152.884',
      depth: '94.2',
      mag: '1.3',
      magType: 'ml',
      nst: undefined,
      gap: undefined,
      dmin: undefined,
      rms: '0.66',
      net: 'ak',
      updated: '2024-03-30T22:48:07.749Z',
      place: '82 km W of Tyonek, Alaska',
      type: 'earthquake',
      horizontalError: undefined,
      depthError: '0.6',
      magError: undefined,
      magNst: undefined,
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    const expectedRecord: EarthquakeRecord = {
      id: 'ak020c02118',
      time: '2024-03-30T22:42:47.340Z',
      latitude: 60.6083,
      longitude: -152.884,
      depth: 94.2,
      mag: 1.3,
      magType: 'ml',
      nst: null,
      gap: null,
      dmin: null,
      rms: 0.66,
      net: 'ak',
      updated: '2024-03-30T22:48:07.749Z',
      place: '82 km W of Tyonek, Alaska',
      type: 'earthquake',
      horizontalError: null,
      depthError: 0.6,
      magError: null,
      magNst: null,
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    // Act
    const actualRecord = parseEarthquakeRow(row);

    // Assert
    expect(actualRecord).toEqual(expectedRecord);
  });

  it('should handle empty string values for optional numeric fields', () => {
    // Arrange
    const row: CSVRow = {
      id: 'ak020c02119',
      time: '2024-03-30T22:36:23.940Z',
      latitude: '60.751',
      longitude: '-153.003',
      depth: '97.2',
      mag: '1.1',
      magType: 'ml',
      nst: '',
      gap: '',
      dmin: '',
      rms: '0.66',
      net: 'ak',
      updated: '2024-03-30T22:41:07.289Z',
      place: '95 km W of Tyonek, Alaska',
      type: 'earthquake',
      horizontalError: '',
      depthError: '0.6',
      magError: '',
      magNst: '',
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    const expectedRecord: EarthquakeRecord = {
      id: 'ak020c02119',
      time: '2024-03-30T22:36:23.940Z',
      latitude: 60.751,
      longitude: -153.003,
      depth: 97.2,
      mag: 1.1,
      magType: 'ml',
      nst: null,
      gap: null,
      dmin: null,
      rms: 0.66,
      net: 'ak',
      updated: '2024-03-30T22:41:07.289Z',
      place: '95 km W of Tyonek, Alaska',
      type: 'earthquake',
      horizontalError: null,
      depthError: 0.6,
      magError: null,
      magNst: null,
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    // Act
    const actualRecord = parseEarthquakeRow(row);

    // Assert
    expect(actualRecord).toEqual(expectedRecord);
  });

  it('should throw an error if required numeric values are invalid', () => {
    // Arrange
    const row: CSVRow = {
      id: 'invalid_id',
      time: 'some_time',
      latitude: 'not a number',
      longitude: '-152.028',
      depth: '84.8',
      mag: '1.7',
      magType: 'ml',
      nst: 'null',
      gap: '158.4',
      dmin: '0.04689',
      rms: '0.67',
      net: 'ak',
      updated: 'some_update_time',
      place: 'some_place',
      type: 'earthquake',
      horizontalError: 'null',
      depthError: '0.5',
      magError: 'null',
      magNst: 'null',
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    // Act & Assert
    expect(() => parseEarthquakeRow(row)).toThrow();
  });

  it('should throw an error if rms is not a valid number', () => {
    // Arrange
    const row: CSVRow = {
      id: 'invalid_id',
      time: 'some_time',
      latitude: '60.1923',
      longitude: '-152.028',
      depth: '84.8',
      mag: '1.7',
      magType: 'ml',
      nst: 'null',
      gap: '158.4',
      dmin: '0.04689',
      rms: 'not a number',
      net: 'ak',
      updated: 'some_update_time',
      place: 'some_place',
      type: 'earthquake',
      horizontalError: 'null',
      depthError: '0.5',
      magError: 'null',
      magNst: 'null',
      status: 'automatic',
      locationSource: 'ak',
      magSource: 'ak',
    };

    // Act & Assert
    expect(() => parseEarthquakeRow(row)).toThrow();
  });
});
