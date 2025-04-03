import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import usePlotPaneData from '../usePlotPlaneData';

describe('usePlotPaneData.tsx', () => {
  it('should initialize with null axis keys and empty numeric keys array', () => {
    // Arrange & Act
    const { result } = renderHook(() => usePlotPaneData([]));

    // Assert
    expect(result.current.xAxisKey).toBeNull();
    expect(result.current.yAxisKey).toBeNull();
    expect(result.current.numericKeys).toEqual([]);
  });

  it('should extract numeric keys from data', () => {
    // Arrange
    const testData = [{ id: '1', name: 'Test', value1: 10, value2: 20 }];

    // Act
    const { result } = renderHook(() => usePlotPaneData(testData));

    // Assert
    expect(result.current.numericKeys).toEqual(['value1', 'value2']);
  });

  it('should automatically set first two numeric keys as x and y axis when available', () => {
    // Arrange
    const testData = [
      { id: '1', name: 'Test', value1: 10, value2: 20, value3: 30 },
    ];

    // Act
    const { result } = renderHook(() => usePlotPaneData(testData));

    // Assert
    expect(result.current.xAxisKey).toBe('value1');
    expect(result.current.yAxisKey).toBe('value2');
  });

  it('should set only x-axis when only one numeric field is available', () => {
    // Arrange
    const testData = [
      { id: '1', name: 'Test', value1: 10, text: 'Not a number' },
    ];

    // Act
    const { result } = renderHook(() => usePlotPaneData(testData));

    // Assert
    expect(result.current.xAxisKey).toBe('value1');
    expect(result.current.yAxisKey).toBeNull();
  });

  it('should update axis keys when data changes', () => {
    // Arrange
    type TestData = Record<string, any>; // Use a more flexible type

    const initialData: TestData[] = [
      { id: '1', name: 'Test', oldValue1: 10, oldValue2: 20 },
    ];

    // Act - Initial render
    const { result, rerender } = renderHook(
      (props: TestData[]) => usePlotPaneData(props),
      { initialProps: initialData },
    );

    // Assert - Initial state
    expect(result.current.numericKeys).toEqual(['oldValue1', 'oldValue2']);
    expect(result.current.xAxisKey).toBe('oldValue1');
    expect(result.current.yAxisKey).toBe('oldValue2');

    // Act - Update with new data
    const newData: TestData[] = [
      { id: '2', name: 'Test2', newValue1: 30, newValue2: 40 },
    ];
    rerender(newData);

    // Assert - Updated state
    expect(result.current.numericKeys).toEqual(['newValue1', 'newValue2']);
    expect(result.current.xAxisKey).toBe('newValue1');
    expect(result.current.yAxisKey).toBe('newValue2');
  });

  it('should allow manual setting of axis keys', () => {
    // Arrange
    const testData = [
      { id: '1', name: 'Test', value1: 10, value2: 20, value3: 30 },
    ];

    // Act
    const { result } = renderHook(() => usePlotPaneData(testData));

    // Initial state
    expect(result.current.xAxisKey).toBe('value1');
    expect(result.current.yAxisKey).toBe('value2');

    // Update X-axis
    act(() => {
      result.current.setXAxisKey('value3');
    });

    // Assert X-axis update
    expect(result.current.xAxisKey).toBe('value3');

    // Update Y-axis
    act(() => {
      result.current.setYAxisKey('value1');
    });

    // Assert Y-axis update
    expect(result.current.yAxisKey).toBe('value1');
  });

  it('should handle empty data properly', () => {
    // Arrange
    const emptyData: Record<string, any>[] = [];

    // Act
    const { result } = renderHook(() => usePlotPaneData(emptyData));

    // Assert
    expect(result.current.numericKeys).toEqual([]);
    expect(result.current.xAxisKey).toBeNull();
    expect(result.current.yAxisKey).toBeNull();
  });
});
