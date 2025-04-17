import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePlotTableStore } from '../plotTableStore';
import { act } from '@testing-library/react';
import { EarthquakeRecord } from '@/types/earthquake';
import { GetEarthQuakesFilters } from '@/api/earthquakesApi';

// Mock for an earthquake record
const mockEarthquakeRecord: EarthquakeRecord = {
  id: 'test123',
  time: '2023-01-15T12:30:45Z',
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
  updated: '2023-01-15T13:00:00Z',
  place: 'Los Angeles, CA',
  type: 'earthquake',
  horizontalError: 0.15,
  depthError: 0.8,
  magError: 0.1,
  magNst: 38,
  status: 'Reviewed',
  locationSource: 'us',
  magSource: 'us',
};

const mockEarthquakeRecord2: EarthquakeRecord = {
  id: 'test456',
  time: '2023-01-16T10:00:00Z',
  latitude: 35.0,
  longitude: -119.0,
  depth: 5.0,
  mag: 5.1,
  magType: 'mw',
  nst: 50,
  gap: 60.0,
  dmin: 0.6,
  rms: 1.1,
  net: 'us',
  updated: '2023-01-16T10:30:00Z',
  place: 'Bakersfield, CA',
  type: 'earthquake',
  horizontalError: 0.2,
  depthError: 1.0,
  magError: 0.05,
  magNst: 45,
  status: 'Reviewed',
  locationSource: 'us',
  magSource: 'us',
};

describe('usePlotTableStore', () => {
  // Reset the store state before each test
  beforeEach(() => {
    act(() => {
      usePlotTableStore.setState({
        filters: { limit: 100 },
        xAxisKey: 'latitude',
        yAxisKey: 'longitude',
        selectedRecords: new Set(), // Initialize as an empty Set
      });
    });
  });

  // Clean up after each test
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default values', () => {
    // Arrange & Act
    const state = usePlotTableStore.getState();

    // Assert
    expect(state.filters).toEqual({ limit: 100 });
    expect(state.xAxisKey).toBe('latitude');
    expect(state.yAxisKey).toBe('longitude');
    expect(state.selectedRecords).toEqual(new Set());
  });

  it('should set filters correctly', () => {
    // Arrange
    const newFilters: GetEarthQuakesFilters = {
      limit: 100,
    };

    // Act
    act(() => {
      usePlotTableStore.getState().setFilters(newFilters);
    });

    // Assert
    expect(usePlotTableStore.getState().filters).toEqual(newFilters);
  });

  it('should set filters to undefined when called with no parameters', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();

    // Act
    act(() => {
      initialState.setFilters();
    });

    // Assert
    expect(usePlotTableStore.getState().filters).toBeUndefined();
  });

  it('should set X-axis key correctly', () => {
    // Arrange
    const newXAxisKey = 'mag';

    // Act
    act(() => {
      usePlotTableStore.getState().setXAxisKey(newXAxisKey);
    });

    // Assert
    expect(usePlotTableStore.getState().xAxisKey).toBe(newXAxisKey);
  });

  it('should set X-axis key to null when provided null', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();

    // Act
    act(() => {
      initialState.setXAxisKey(null);
    });

    // Assert
    expect(usePlotTableStore.getState().xAxisKey).toBeNull();
  });

  it('should set Y-axis key correctly', () => {
    // Arrange
    const newYAxisKey = 'depth';

    // Act
    act(() => {
      usePlotTableStore.getState().setYAxisKey(newYAxisKey);
    });

    // Assert
    expect(usePlotTableStore.getState().yAxisKey).toBe(newYAxisKey);
  });

  it('should set Y-axis key to null when provided null', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();

    // Act
    act(() => {
      initialState.setYAxisKey(null);
    });

    // Assert
    expect(usePlotTableStore.getState().yAxisKey).toBeNull();
  });

  it('should set selected records correctly', () => {
    // Arrange
    const records = new Set<string | number | null>([mockEarthquakeRecord.id]);

    // Act
    act(() => {
      usePlotTableStore.getState().setSelectedRecords(records);
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(records);
  });

  it('should set selected records to an empty Set when provided an empty array', () => {
    // Arrange
    act(() => {
      usePlotTableStore
        .getState()
        .setSelectedRecords(new Set([mockEarthquakeRecord.id]));
    });

    // Act
    act(() => {
      usePlotTableStore.getState().setSelectedRecords(new Set());
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(new Set());
  });

  it('should add a single record to the selected records', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();

    // Act
    act(() => {
      initialState.addSelectedRecord(mockEarthquakeRecord);
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(
      new Set([mockEarthquakeRecord.id]),
    );

    // Act - Add another record
    act(() => {
      initialState.addSelectedRecord(mockEarthquakeRecord2);
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(
      new Set([mockEarthquakeRecord.id, mockEarthquakeRecord2.id]),
    );
  });

  it('should remove a single record from the selected records by id', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    act(() => {
      initialState.setSelectedRecords(
        new Set([mockEarthquakeRecord.id, mockEarthquakeRecord2.id]),
      );
    });

    // Act
    act(() => {
      initialState.removeSelectedRecord('test123');
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(
      new Set([mockEarthquakeRecord2.id]),
    );

    // Act - Try to remove a non-existent record
    act(() => {
      initialState.removeSelectedRecord('nonexistent');
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(
      new Set([mockEarthquakeRecord2.id]),
    );
  });

  it('should check if a record is selected', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    act(() => {
      initialState.setSelectedRecords(new Set([mockEarthquakeRecord.id]));
    });

    // Act & Assert
    expect(initialState.isRecordSelected('test123')).toBe(true);
    expect(initialState.isRecordSelected('test456')).toBe(false);
  });

  it('should maintain other state properties when updating filters', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    const newXAxisKey = 'depth';
    const newYAxisKey = 'mag';
    const initialRecords = new Set([mockEarthquakeRecord.id]);
    const newFilters: GetEarthQuakesFilters = { limit: 100 };

    // Set some initial values
    act(() => {
      initialState.setXAxisKey(newXAxisKey);
      initialState.setYAxisKey(newYAxisKey);
      initialState.setSelectedRecords(initialRecords);
    });

    // Act
    // Update just the filters
    act(() => {
      usePlotTableStore.getState().setFilters(newFilters);
    });

    // Assert
    const finalState = usePlotTableStore.getState();
    expect(finalState.filters).toEqual(newFilters);
    expect(finalState.xAxisKey).toBe(newXAxisKey);
    expect(finalState.yAxisKey).toBe(newYAxisKey);
    expect(finalState.selectedRecords).toEqual(initialRecords);
  });

  it('should maintain other state properties when updating X-axis key', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    const newFilters: GetEarthQuakesFilters = { limit: 50 };
    const newYAxisKey = 'mag';
    const initialRecords = new Set([mockEarthquakeRecord.id]);

    // Set some initial values
    act(() => {
      initialState.setFilters(newFilters);
      initialState.setYAxisKey(newYAxisKey);
      initialState.setSelectedRecords(initialRecords);
    });

    // Act
    // Update just the X-axis key
    act(() => {
      usePlotTableStore.getState().setXAxisKey('depth');
    });

    // Assert
    const finalState = usePlotTableStore.getState();
    expect(finalState.xAxisKey).toBe('depth');
    expect(finalState.filters).toEqual(newFilters);
    expect(finalState.yAxisKey).toBe(newYAxisKey);
    expect(finalState.selectedRecords).toEqual(initialRecords);
  });

  it('should maintain other state properties when updating Y-axis key', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    const newFilters: GetEarthQuakesFilters = { limit: 50 };
    const newXAxisKey = 'depth';
    const initialRecords = new Set([mockEarthquakeRecord.id]);

    // Set some initial values
    act(() => {
      initialState.setFilters(newFilters);
      initialState.setXAxisKey(newXAxisKey);
      initialState.setSelectedRecords(initialRecords);
    });

    // Act
    // Update just the Y-axis key
    act(() => {
      usePlotTableStore.getState().setYAxisKey('rms');
    });

    // Assert
    const finalState = usePlotTableStore.getState();
    expect(finalState.yAxisKey).toBe('rms');
    expect(finalState.filters).toEqual(newFilters);
    expect(finalState.xAxisKey).toBe(newXAxisKey);
    expect(finalState.selectedRecords).toEqual(initialRecords);
  });

  it('should maintain other state properties when updating selected records', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    const newFilters: GetEarthQuakesFilters = { limit: 50 };
    const newXAxisKey = 'depth';
    const newYAxisKey = 'rms';
    const newRecords = new Set([
      mockEarthquakeRecord.id,
      mockEarthquakeRecord2.id,
    ]);

    // Set some initial values
    act(() => {
      initialState.setFilters(newFilters);
      initialState.setXAxisKey(newXAxisKey);
      initialState.setYAxisKey(newYAxisKey);
    });

    // Act
    // Update just the selected record
    act(() => {
      usePlotTableStore.getState().setSelectedRecords(newRecords);
    });

    // Assert
    const finalState = usePlotTableStore.getState();
    expect(finalState.selectedRecords).toEqual(newRecords);
    expect(finalState.filters).toEqual(newFilters);
    expect(finalState.xAxisKey).toBe(newXAxisKey);
    expect(finalState.yAxisKey).toBe(newYAxisKey);
  });
});
