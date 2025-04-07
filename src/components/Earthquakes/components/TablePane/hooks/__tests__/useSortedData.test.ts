// src/hooks/useSortedData.test.ts
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useSortedData from '../useSortedData'; // Assuming functions are exported from here

// --- Test Data Setup ---
interface TestObject {
  id: number;
  name: string | null | undefined;
  value: number | null | undefined;
  date: Date | null | undefined;
}

const obj1: TestObject = {
  id: 1,
  name: 'Charlie',
  value: 30,
  date: new Date('2023-01-15'),
};
const obj2: TestObject = {
  id: 2,
  name: 'Alice',
  value: 10,
  date: new Date('2022-05-20'),
};
const obj3: TestObject = {
  id: 3,
  name: 'Bob',
  value: 20,
  date: new Date('2024-03-10'),
};
const obj4: TestObject = {
  id: 4,
  name: 'Alice',
  value: 5,
  date: new Date('2022-05-20'),
}; // Duplicate name/date

const obj5: TestObject = { id: 5, name: null, value: null, date: null };
const obj6: TestObject = {
  id: 6,
  name: undefined,
  value: undefined,
  date: undefined,
};
const obj7: TestObject = {
  id: 7,
  name: 'David',
  value: 15,
  date: new Date('2023-08-01'),
};

const testDataUnsorted: TestObject[] = [
  obj1,
  obj2,
  obj3,
  obj4,
  obj5,
  obj6,
  obj7,
];
const testDataWithNullsUnsorted: TestObject[] = [obj1, obj5, obj3, obj6, obj2]; // Mixed valid and nulls

describe('useSortedData', () => {
  it('should return an empty array if data is null', () => {
    // Arrange
    const data = null;
    const sortKey = 'name';
    // Act
    const { result } = renderHook(() => useSortedData(data, sortKey));
    // Assert
    expect(result.current).toEqual([]);
  });

  it('should return an empty array if data is undefined', () => {
    // Arrange
    const data = undefined;
    const sortKey = 'name';
    // Act
    const { result } = renderHook(() => useSortedData(data, sortKey));
    // Assert
    expect(result.current).toEqual([]);
  });

  it('should return an empty array if data is an empty array', () => {
    // Arrange
    const data: TestObject[] = [];
    const sortKey = 'name';
    // Act
    const { result } = renderHook(() => useSortedData(data, sortKey));
    // Assert
    expect(result.current).toEqual([]);
    expect(result.current).not.toBe(data); // Should return new empty array instance
  });

  it('should return the original data array instance if sortKey is null', () => {
    // Arrange
    const data = [...testDataUnsorted]; // Use a copy
    const sortKey = null;
    // Act
    const { result } = renderHook(() => useSortedData(data, sortKey));
    // Assert
    expect(result.current).toEqual(data); // Content is the same
    // Note: Depending on whether useMemo gets the exact same `data` reference,
    // `toBe` might pass or fail. `toEqual` is safer here. If you expect the *exact*
    // same reference back when sortKey is null, you might need to adjust the check.
    // However, the hook returns `data || []`, so if `data` is truthy, it *should* return `data`.
    // Let's test it returns the exact reference passed in if sortKey is null
    expect(result.current).toBe(data);
  });

  it('should return the original data array instance if sortKey is undefined', () => {
    // Arrange
    const data = [...testDataUnsorted]; // Use a copy
    const sortKey = undefined;
    // Act
    const { result } = renderHook(() => useSortedData(data, sortKey));
    // Assert
    expect(result.current).toEqual(data);
    expect(result.current).toBe(data); // Should be the same reference
  });

  it('should sort data by a number key in ascending order', () => {
    // Arrange
    const data = [...testDataUnsorted];
    const sortKey: keyof TestObject = 'value';
    const expectedSorted = [obj4, obj2, obj7, obj3, obj1, obj5, obj6]; // 5, 10, 15, 20, 30, null, undefined
    // Act
    const { result } = renderHook(() => useSortedData(data, sortKey));
    // Assert
    expect(result.current).toEqual(expectedSorted);
  });

  it('should sort data by a string key in alphabetical order', () => {
    // Arrange
    const data = [...testDataUnsorted];
    const sortKey: keyof TestObject = 'name';
    // Allow for either Alice to come first based on stable sort or id
    const expectedSortedOption1 = [obj2, obj4, obj3, obj1, obj7, obj5, obj6]; // Alice, Alice, Bob, Charlie, David, null, undefined
    const expectedSortedOption2 = [obj4, obj2, obj3, obj1, obj7, obj5, obj6]; // Alice, Alice, Bob, Charlie, David, null, undefined

    // Act
    const { result } = renderHook(() => useSortedData(data, sortKey));

    // Assert
    // Since Array.sort isn't guaranteed stable, either order for 'Alice' is acceptable
    expect(result.current).toEqual(
      expect.arrayContaining(expectedSortedOption1),
    );
    expect(result.current.length).toBe(expectedSortedOption1.length);
    // More specific check for the beginning and end:
    expect(result.current.slice(0, 2)).toEqual(
      expect.arrayContaining([obj2, obj4]),
    ); // Both Alices first
    expect(result.current[2]).toEqual(obj3); // Bob next
    expect(result.current[3]).toEqual(obj1); // Charlie
    expect(result.current[4]).toEqual(obj7); // David
    expect(result.current.slice(5)).toEqual(
      expect.arrayContaining([obj5, obj6]),
    ); // null/undefined last
  });

  it('should sort data by a Date key in chronological order', () => {
    // Arrange
    const data = [...testDataUnsorted];
    const sortKey: keyof TestObject = 'date';
    // Allow for either 2022-05-20 obj to come first
    const expectedSorted = [obj2, obj4, obj1, obj7, obj3, obj5, obj6]; // 2022-05-20, 2022-05-20, 2023-01-15, 2023-08-01, 2024-03-10, null, undefined
    // Act
    const { result } = renderHook(() => useSortedData(data, sortKey));
    // Assert
    expect(result.current.slice(0, 2)).toEqual(
      expect.arrayContaining([obj2, obj4]),
    ); // Both earliest dates first
    expect(result.current[2]).toEqual(obj1);
    expect(result.current[3]).toEqual(obj7);
    expect(result.current[4]).toEqual(obj3);
    expect(result.current.slice(5)).toEqual(
      expect.arrayContaining([obj5, obj6]),
    ); // null/undefined last
  });

  it('should place null/undefined values at the end when sorting', () => {
    // Arrange
    const data = [...testDataWithNullsUnsorted]; // [obj1, obj5, obj3, obj6, obj2]
    const sortKey: keyof TestObject = 'value';
    const expectedSorted = [obj2, obj3, obj1, obj5, obj6]; // 10, 20, 30, null, undefined
    // Act
    const { result } = renderHook(() => useSortedData(data, sortKey));
    // Assert
    expect(result.current).toEqual(expectedSorted);
  });

  it('should not mutate the original data array', () => {
    // Arrange
    const originalData = [...testDataUnsorted];
    const dataCopy = [...testDataUnsorted]; // Keep a pristine copy for comparison
    const sortKey: keyof TestObject = 'name';
    // Act
    const { result } = renderHook(() => useSortedData(originalData, sortKey));
    // Assert
    expect(result.current).not.toBe(originalData); // Should be a new array instance
    expect(originalData).toEqual(dataCopy); // Original array should remain unchanged
  });

  it('should return a memoized array reference if data and sortKey do not change', () => {
    // Arrange
    const data = [...testDataUnsorted];
    const sortKey: keyof TestObject = 'id';
    const { result, rerender } = renderHook(
      ({ currentData, currentSortKey }) =>
        useSortedData(currentData, currentSortKey),
      { initialProps: { currentData: data, currentSortKey: sortKey } },
    );
    const firstResult = result.current; // Get the initial sorted array reference

    // Act
    rerender({ currentData: data, currentSortKey: sortKey }); // Rerender with the exact same props
    const secondResult = result.current;

    // Assert
    expect(secondResult).toBe(firstResult); // References should be identical due to memoization
  });

  it('should return a new array reference if data reference changes', () => {
    // Arrange
    const initialData = [...testDataUnsorted];
    const newData = [...testDataUnsorted]; // Same content, but different array reference
    const sortKey: keyof TestObject = 'id';
    const { result, rerender } = renderHook(
      ({ currentData, currentSortKey }) =>
        useSortedData(currentData, currentSortKey),
      { initialProps: { currentData: initialData, currentSortKey: sortKey } },
    );
    const firstResult = result.current; // Get the initial sorted array reference

    // Act
    rerender({ currentData: newData, currentSortKey: sortKey }); // Rerender with a new data array reference
    const secondResult = result.current;

    // Assert
    expect(secondResult).not.toBe(firstResult); // References should be different
    expect(secondResult).toEqual(firstResult); // Content should be the same (sorted by id)
  });
});
