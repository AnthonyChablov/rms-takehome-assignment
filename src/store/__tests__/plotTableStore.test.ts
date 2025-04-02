import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePlotTableStore } from '../plotTableStore';
import { GetEarthQuakesFilters } from '@/api/earthquakesApi';

describe('usePlotTableStore', () => {
  // Helper function to get the current state of the store
  const getState = () => usePlotTableStore.getState();

  it('should have the correct initial state', () => {
    // Arrange
    const initialState = getState();

    // Act
    // No explicit action needed as we are checking the initial state

    // Assert
    expect(initialState.filters).toEqual({ limit: 100 });
    expect(initialState.xAxisKey).toBe('latitude');
    expect(initialState.yAxisKey).toBe('longitude');
    expect(initialState.selectedRecord).toBeNull();
    expect(initialState.sortedData).toBeUndefined();
  });

  it('should update filters correctly', () => {
    // Arrange
    const newFilters: GetEarthQuakesFilters = { limit: 5 };

    // Act
    act(() => {
      getState().setFilters(newFilters);
    });

    // Assert
    expect(getState().filters).toEqual(newFilters);
  });

  it('should update xAxisKey correctly', () => {
    // Arrange

    // Act
    act(() => {
      getState().setXAxisKey('depth');
    });

    // Assert
    expect(getState().xAxisKey).toBe('depth');
  });

  it('should update yAxisKey correctly', () => {
    // Arrange

    // Act
    act(() => {
      getState().setYAxisKey('magnitude');
    });

    // Assert
    expect(getState().yAxisKey).toBe('magnitude');
  });

  it('should update selectedRecord correctly', () => {
    // Arrange
    const record = { id: '1', latitude: 1, longitude: 1, magnitude: 5 } as any; // Mock EarthquakeRecord

    // Act
    act(() => {
      getState().setSelectedRecord(record);
    });

    // Assert
    expect(getState().selectedRecord).toEqual(record);
  });

  it('should update sortedData correctly when xAxisKey is provided', () => {
    // Arrange
    const data = [
      { id: '1', latitude: 3 },
      { id: '2', latitude: 1 },
      { id: '3', latitude: 2 },
    ] as any[];

    // Act
    act(() => {
      getState().setSortedData(data, 'latitude');
    });

    // Assert
    expect(getState().sortedData).toEqual([
      { id: '2', latitude: 1 },
      { id: '3', latitude: 2 },
      { id: '1', latitude: 3 },
    ]);
  });

  it('should update sortedData correctly when xAxisKey is not provided', () => {
    // Arrange
    const data = [
      { id: '1', latitude: 3 },
      { id: '2', latitude: 1 },
      { id: '3', latitude: 2 },
    ] as any[];

    // Act
    act(() => {
      getState().setSortedData(data, null);
    });

    // Assert
    expect(getState().sortedData).toEqual(data);
  });
});
