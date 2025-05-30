import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePlotTableStore } from '@/store/plotTableStore/plotTableStore';
import { act } from '@testing-library/react';
import { EarthquakeRecord } from '@/types/earthquake';
import { GetEarthQuakesFilters } from '@/api/earthquakesApi';

// Mock for an earthquake record
const mockEarthquakeRecordId = 'test123';

const mockEarthquakeRecordId2 = 'test456';

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
    const records = new Set<string | number | null>([mockEarthquakeRecordId]);

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
        .setSelectedRecords(new Set([mockEarthquakeRecordId]));
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
      initialState.addSelectedRecord(mockEarthquakeRecordId);
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(
      new Set([mockEarthquakeRecordId]),
    );

    // Act - Add another record
    act(() => {
      initialState.addSelectedRecord(mockEarthquakeRecordId2);
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(
      new Set([mockEarthquakeRecordId, mockEarthquakeRecordId2]),
    );
  });

  it('should remove a single record from the selected records by id', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    act(() => {
      initialState.setSelectedRecords(
        new Set([mockEarthquakeRecordId, mockEarthquakeRecordId2]),
      );
    });

    // Act
    act(() => {
      initialState.removeSelectedRecord('test123');
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(
      new Set([mockEarthquakeRecordId2]),
    );

    // Act - Try to remove a non-existent record
    act(() => {
      initialState.removeSelectedRecord('nonexistent');
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecords).toEqual(
      new Set([mockEarthquakeRecordId2]),
    );
  });

  it('should check if a record is selected', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    act(() => {
      initialState.setSelectedRecords(new Set([mockEarthquakeRecordId]));
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
    const initialRecords = new Set([mockEarthquakeRecordId]);
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
    const initialRecords = new Set([mockEarthquakeRecordId]);

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
    const initialRecords = new Set([mockEarthquakeRecordId]);

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
      mockEarthquakeRecordId,
      mockEarthquakeRecordId2,
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
