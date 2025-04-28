import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDataFiltering } from '../useDataFiltering';

describe('useDataFiltering.tsx', () => {
  it('should filter data based on xAxisKey and yAxisKey', () => {
    // Arrange
    const mockData = [
      { id: 1, x: 10, y: 20 },
      { id: 2, x: null, y: 30 },
      { id: 3, x: 40, y: null },
      { id: 4, x: 50, y: 60 },
    ];
    const xAxisKey = 'x';
    const yAxisKey = 'y';
    const isLoading = false;
    const isError = false;

    // Act
    const { result } = renderHook(() =>
      useDataFiltering({
        data: mockData,
        xAxisKey,
        yAxisKey,
        isLoading,
        isError,
      }),
    );

    // Assert
    expect(result.current.filteredData).toEqual([
      { id: 1, x: 10, y: 20 },
      { id: 4, x: 50, y: 60 },
    ]);
    expect(result.current.filteredOutCount).toBe(2);
  });
});
