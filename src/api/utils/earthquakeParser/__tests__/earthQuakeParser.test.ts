import { cn, formatDate } from '@/utils/utils';
import { describe, it, expect } from 'vitest';

describe('cn()', () => {
  it('should return the single className', () => {
    // Act
    const result = cn('text-red-500');

    // Assert
    expect(result).toBe('text-red-500');
  });

  it('should merge multiple class names', () => {
    // Act
    const result = cn('text-red-500', 'bg-blue-500');

    // Assert
    expect(result).toBe('text-red-500 bg-blue-500');
  });

  it('should merge conflicting class names using twMerge', () => {
    // Act
    const result = cn('text-red-500', 'text-blue-500');

    // Assert
    expect(result).toBe('text-blue-500'); // twMerge should resolve the conflict to "text-blue-500"
  });

  it('should ignore falsy values like undefined or null', () => {
    // Act
    const result = cn('text-red-500', undefined, 'bg-blue-500', null);

    // Assert
    expect(result).toBe('text-red-500 bg-blue-500'); // should not include undefined or null
  });
});

describe('formatDate()', () => {
  it('should format a valid date string to a locale date string', () => {
    // Arrange
    const dateString = '2023-10-26T10:00:00Z';
    const expectedFormattedDate = new Date(dateString).toLocaleDateString();

    // Act
    const formattedDate = formatDate(dateString);

    // Assert
    expect(formattedDate).toBe(expectedFormattedDate);
  });

  it('should format a Date object to a locale date string', () => {
    // Arrange
    const dateObject = new Date(2024, 0, 15); // January 15, 2024
    const expectedFormattedDate = dateObject.toLocaleDateString();

    // Act
    const formattedDate = formatDate(dateObject);

    // Assert
    expect(formattedDate).toBe(expectedFormattedDate);
  });

  it('should return the original value as a string for invalid date strings', () => {
    // Arrange
    const invalidDateString = 'not a date';

    // Act
    const formattedDate = formatDate(invalidDateString);

    // Assert
    expect(formattedDate).toBe('Invalid Date');
  });

  it('should return the original value as a string for numbers', () => {
    // Arrange
    const timestamp = 1678886400000; // Example timestamp
    const expectedDateString = new Date(timestamp).toLocaleDateString();

    // Act
    const formattedDate = formatDate(timestamp);

    // Assert
    expect(formattedDate).toBe(expectedDateString);
  });

  it('should return an empty string for null or undefined values', () => {
    // Arrange
    const nullValue = null;
    const undefinedValue = undefined;

    // Act
    const formattedDateFromNull = formatDate(nullValue);
    const formattedDateFromUndefined = formatDate(undefinedValue);

    // Assert
    expect(formattedDateFromNull).toEqual('');
    expect(formattedDateFromUndefined).toEqual('');
  });

  it('should handle different date formats correctly', () => {
    // Arrange
    const dateStringWithTimezone = '2023-11-01T15:30:00+05:30';
    const expectedFormattedDate = new Date(
      dateStringWithTimezone,
    ).toLocaleDateString();

    // Act
    const formattedDate = formatDate(dateStringWithTimezone);

    // Assert
    expect(formattedDate).toBe(expectedFormattedDate);
  });
});
