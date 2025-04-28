import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePagination } from '../usePagination';

describe('usePagination.tsx', () => {
  it('should', () => {
    // Arrange
    const mockData = Array.from({ length: 100 }, (_, index) => ({ id: index }));
    const currentPage = 1;
    const itemsPerPage = 10;
    const setItemsPerPage = vi.fn();
    const setCurrentPage = vi.fn();

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Assert
    expect(result.current.paginatedData).toEqual(
      mockData.slice(0, itemsPerPage),
    );
    expect(result.current.totalPages).toBe(
      Math.ceil(mockData.length / itemsPerPage),
    );
  });

  it('should handle items per page change', () => {
    // Arrange
    const mockData = Array.from({ length: 100 }, (_, index) => ({ id: index }));
    const currentPage = 1;
    const itemsPerPage = 10;
    const setItemsPerPage = vi.fn();
    const setCurrentPage = vi.fn();

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Assert
    expect(result.current.handleItemsPerPageChange).toBeDefined();
  });

  it('should calculate start and end index correctly', () => {
    // Arrange
    const mockData = Array.from({ length: 100 }, (_, index) => ({ id: index }));
    const currentPage = 2;
    const itemsPerPage = 10;

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Assert
    expect(result.current.startIndex).toBe(10);
    expect(result.current.endIndex).toBe(20);
  });
  it('should reset current page to 1 when items per page changes', () => {
    // Arrange
    const mockData = Array.from({ length: 100 }, (_, index) => ({ id: index }));
    const currentPage = 2;
    const itemsPerPage = 10;
    const setItemsPerPage = vi.fn();
    const setCurrentPage = vi.fn();

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Create a mock event with just the minimum needed properties
    const mockEvent = {
      target: { value: '20' },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;

    // Assert
    result.current.handleItemsPerPageChange(
      mockEvent,
      setItemsPerPage,
      setCurrentPage,
    );
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });

  it('should return paginated data based on current page and items per page', () => {
    // Arrange
    const mockData = Array.from({ length: 100 }, (_, index) => ({ id: index }));
    const currentPage = 2;
    const itemsPerPage = 10;

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Assert
    expect(result.current.paginatedData).toEqual(mockData.slice(10, 20));
  });
  it('should return empty array if data is empty', () => {
    // Arrange
    const mockData: any[] = []; // Empty data array
    const currentPage = 1;
    const itemsPerPage = 10;

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Assert
    expect(result.current.paginatedData).toEqual([]);
  });
  it('should return total pages as 0 if data is empty', () => {
    // Arrange
    const mockData: any[] = []; // Empty data array
    const currentPage = 1;
    const itemsPerPage = 10;

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Assert
    expect(result.current.totalPages).toBe(0);
  });
  it('should handle edge case of current page exceeding total pages', () => {
    // Arrange
    const mockData = Array.from({ length: 100 }, (_, index) => ({ id: index }));
    const currentPage = 20; // Exceeding total pages
    const itemsPerPage = 10;

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Assert
    expect(result.current.paginatedData).toEqual([]);
  });
  it('should handle edge case of items per page being zero', () => {
    // Arrange
    const mockData = Array.from({ length: 100 }, (_, index) => ({ id: index }));
    const currentPage = 1;
    const itemsPerPage = 0; // Zero items per page

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Assert
    expect(result.current.paginatedData).toEqual([]);
  });
  it('should handle edge case of items per page being negative', () => {
    // Arrange
    const mockData = Array.from({ length: 100 }, (_, index) => ({ id: index }));
    const currentPage = 1;
    const itemsPerPage = -10; // Negative items per page

    // Act
    const { result } = renderHook(() =>
      usePagination({
        data: mockData,
        currentPage,
        itemsPerPage,
      }),
    );

    // Assert
    expect(result.current.paginatedData).toEqual([]);
  });
});
