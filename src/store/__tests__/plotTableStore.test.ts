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

describe('usePlotTableStore', () => {
  // Reset the store state before each test
  beforeEach(() => {
    act(() => {
      usePlotTableStore.setState({
        filters: { limit: 100 },
        xAxisKey: 'latitude',
        yAxisKey: 'longitude',
        selectedRecord: null,
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
    expect(state.selectedRecord).toBeNull();
  });

  it('should set filters correctly', () => {
    // Arrange
    const newFilters: GetEarthQuakesFilters = {
      limit: 50,
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

  it('should set selected record correctly', () => {
    // Arrange
    const record = mockEarthquakeRecord;

    // Act
    act(() => {
      usePlotTableStore.getState().setSelectedRecord(record);
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecord).toEqual(record);
  });

  it('should set selected record to null when provided null', () => {
    // Arrange
    // First set a record
    act(() => {
      usePlotTableStore.getState().setSelectedRecord(mockEarthquakeRecord);
    });

    // Act
    // Then clear it
    act(() => {
      usePlotTableStore.getState().setSelectedRecord(null);
    });

    // Assert
    expect(usePlotTableStore.getState().selectedRecord).toBeNull();
  });

  it('should maintain other state properties when updating filters', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    const newXAxisKey = 'depth';
    const newYAxisKey = 'mag';
    const record = mockEarthquakeRecord;
    const newFilters: GetEarthQuakesFilters = { limit: 50 };

    // Set some initial values
    act(() => {
      initialState.setXAxisKey(newXAxisKey);
      initialState.setYAxisKey(newYAxisKey);
      initialState.setSelectedRecord(record);
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
    expect(finalState.selectedRecord).toEqual(record);
  });

  it('should maintain other state properties when updating X-axis key', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    const newFilters: GetEarthQuakesFilters = {
      limit: 50,
    };
    const newYAxisKey = 'mag';
    const record = mockEarthquakeRecord;

    // Set some initial values
    act(() => {
      initialState.setFilters(newFilters);
      initialState.setYAxisKey(newYAxisKey);
      initialState.setSelectedRecord(record);
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
    expect(finalState.selectedRecord).toEqual(record);
  });

  it('should maintain other state properties when updating Y-axis key', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    const newFilters: GetEarthQuakesFilters = {
      limit: 50,
    };
    const newXAxisKey = 'depth';
    const record = mockEarthquakeRecord;

    // Set some initial values
    act(() => {
      initialState.setFilters(newFilters);
      initialState.setXAxisKey(newXAxisKey);
      initialState.setSelectedRecord(record);
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
    expect(finalState.selectedRecord).toEqual(record);
  });

  it('should maintain other state properties when updating selected record', () => {
    // Arrange
    const initialState = usePlotTableStore.getState();
    const newFilters: GetEarthQuakesFilters = {
      limit: 50,
    };
    const newXAxisKey = 'depth';
    const newYAxisKey = 'rms';

    // Set some initial values
    act(() => {
      initialState.setFilters(newFilters);
      initialState.setXAxisKey(newXAxisKey);
      initialState.setYAxisKey(newYAxisKey);
    });

    // Act
    // Update just the selected record
    act(() => {
      usePlotTableStore.getState().setSelectedRecord(mockEarthquakeRecord);
    });

    // Assert
    const finalState = usePlotTableStore.getState();
    expect(finalState.selectedRecord).toEqual(mockEarthquakeRecord);
    expect(finalState.filters).toEqual(newFilters);
    expect(finalState.xAxisKey).toBe(newXAxisKey);
    expect(finalState.yAxisKey).toBe(newYAxisKey);
  });
});
