import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';
import { compareValues } from '../compareValues';

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

describe('compareValues', () => {
  it('should return 0 if both values are null', () => {
    // Arrange
    const key: keyof TestObject = 'name';
    const a = { ...obj5 }; // name: null
    const b = { ...obj5 }; // name: null
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBe(0);
  });

  it('should return 0 if both values are undefined', () => {
    // Arrange
    const key: keyof TestObject = 'value';
    const a = { ...obj6 }; // value: undefined
    const b = { ...obj6 }; // value: undefined
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBe(0);
  });

  it('should return 0 if one value is null and the other is undefined', () => {
    // Arrange
    const key: keyof TestObject = 'date';
    const a = { ...obj5 }; // date: null
    const b = { ...obj6 }; // date: undefined
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBe(0);
  });

  it('should sort null/undefined values after non-null values (a is null)', () => {
    // Arrange
    const key: keyof TestObject = 'name';
    const a = { ...obj5 }; // name: null
    const b = { ...obj1 }; // name: 'Charlie'
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBe(1); // a > b (comes after)
  });

  it('should sort null/undefined values after non-null values (b is null)', () => {
    // Arrange
    const key: keyof TestObject = 'value';
    const a = { ...obj3 }; // value: 20
    const b = { ...obj5 }; // value: null
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBe(-1); // a < b (comes before)
  });

  it('should correctly compare numbers (a < b)', () => {
    // Arrange
    const key: keyof TestObject = 'value';
    const a = { ...obj4 }; // value: 5
    const b = { ...obj2 }; // value: 10
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBeLessThan(0); // 5 - 10 = -5
  });

  it('should correctly compare numbers (a > b)', () => {
    // Arrange
    const key: keyof TestObject = 'value';
    const a = { ...obj1 }; // value: 30
    const b = { ...obj3 }; // value: 20
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBeGreaterThan(0); // 30 - 20 = 10
  });

  it('should correctly compare numbers (a === b)', () => {
    // Arrange
    const key: keyof TestObject = 'value';
    const a = { ...obj3 }; // value: 20
    const b = { ...obj3 }; // value: 20
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBe(0); // 20 - 20 = 0
  });

  it('should correctly compare strings using localeCompare (a < b)', () => {
    // Arrange
    const key: keyof TestObject = 'name';
    const a = { ...obj2 }; // name: 'Alice'
    const b = { ...obj3 }; // name: 'Bob'
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBeLessThan(0); // 'Alice'.localeCompare('Bob') < 0
  });

  it('should correctly compare strings using localeCompare (a > b)', () => {
    // Arrange
    const key: keyof TestObject = 'name';
    const a = { ...obj1 }; // name: 'Charlie'
    const b = { ...obj3 }; // name: 'Bob'
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBeGreaterThan(0); // 'Charlie'.localeCompare('Bob') > 0
  });

  it('should correctly compare strings using localeCompare (a === b)', () => {
    // Arrange
    const key: keyof TestObject = 'name';
    const a = { ...obj2 }; // name: 'Alice'
    const b = { ...obj4 }; // name: 'Alice'
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBe(0); // 'Alice'.localeCompare('Alice') === 0
  });

  it('should correctly compare Dates (a < b)', () => {
    // Arrange
    const key: keyof TestObject = 'date';
    const a = { ...obj2 }; // date: 2022-05-20
    const b = { ...obj1 }; // date: 2023-01-15
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBeLessThan(0);
  });

  it('should correctly compare Dates (a > b)', () => {
    // Arrange
    const key: keyof TestObject = 'date';
    const a = { ...obj3 }; // date: 2024-03-10
    const b = { ...obj7 }; // date: 2023-08-01
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBeGreaterThan(0);
  });

  it('should correctly compare Dates (a === b)', () => {
    // Arrange
    const key: keyof TestObject = 'date';
    const a = { ...obj2 }; // date: 2022-05-20
    const b = { ...obj4 }; // date: 2022-05-20
    // Act
    const result = compareValues(key, a, b);
    // Assert
    expect(result).toBe(0);
  });

  it('should return 0 and warn for unsupported/mixed types', () => {
    // Arrange
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {}); // Spy and suppress console.warn
    const key = 'mixedField' as any; // Simulate a key leading to mixed types
    const a = { mixedField: 10 };
    const b = { mixedField: '2' };

    // Act
    const result = compareValues(key, a, b as any); // Cast to any to avoid TypeScript error

    // Assert
    expect(result).toBe(0);
    expect(warnSpy).toHaveBeenCalledWith(
      `useSortedData: Attempting to compare unsupported types (number vs string) for key "mixedField". Treating as equal.`,
    );

    // Clean up spy
    warnSpy.mockRestore();
  });
});
