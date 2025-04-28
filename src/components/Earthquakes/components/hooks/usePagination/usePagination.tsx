// hooks/usePagination.ts
import { useMemo } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  currentPage: number;
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  paginatedData: T[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
  handleItemsPerPageChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  ) => void;
}

export function usePagination<T>({
  data,
  currentPage,
  itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  // Handle edge case of empty data array
  const totalPages = useMemo(() => {
    if (data.length === 0) return 0;

    // Handle edge case of zero or negative itemsPerPage
    const validItemsPerPage = Math.max(1, itemsPerPage);
    return Math.ceil(data.length / validItemsPerPage);
  }, [data.length, itemsPerPage]);

  // Ensure itemsPerPage is always at least 1
  const safeItemsPerPage = Math.max(1, itemsPerPage);

  // Calculate indices
  const startIndex = (currentPage - 1) * safeItemsPerPage;
  const endIndex = startIndex + safeItemsPerPage;

  const paginatedData = useMemo(() => {
    // Handle empty data array
    if (data.length === 0) return [];

    // Handle case where current page exceeds total pages
    if (currentPage > totalPages && totalPages > 0) return [];

    // Handle negative or zero itemsPerPage
    if (itemsPerPage <= 0) return [];

    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex, currentPage, totalPages, itemsPerPage]);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const parsedValue = parseInt(event.target.value, 10);

    // Handle invalid or negative items per page
    if (isNaN(parsedValue) || parsedValue <= 0) {
      // Default to 10 if the value is invalid
      setItemsPerPage(10);
    } else {
      setItemsPerPage(parsedValue);
    }

    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return {
    paginatedData,
    totalPages,
    startIndex,
    endIndex,
    handleItemsPerPageChange,
  };
}
