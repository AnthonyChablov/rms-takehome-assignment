import React, { Dispatch, SetStateAction } from 'react';
import ActionButton from '../TablePane/components/Button/ActionButton';
import { cn } from '@/utils/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
  pageSizeOptions?: number[];
  className?: string;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 75, 100];

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  onItemsPerPageChange,
  itemsPerPage,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  className = '',
}: PaginationProps) {
  const handlePrevPage = () =>
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));

  const handleNextPage = () =>
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));

  return (
    <div
      data-testid="pagination"
      className={cn(
        `flex items-center justify-between py-3 px-4 bg-white border-t border-gray-200 ${className}`,
      )}
    >
      {/* Items Per Page Dropdown */}
      <div className="flex items-center py-4">
        <label
          htmlFor="itemsPerPage"
          className="text-sm font-medium text-gray-700 mr-2"
        >
          Items Per Page:
        </label>
        <div className="relative">
          <select
            id="itemsPerPage"
            className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500 text-sm"
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Pagination Buttons and Info */}
      <div className="flex items-center space-x-4">
        <ActionButton
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-sm py-2 px-3 text-sm font-medium disabled:opacity-50"
        >
          Previous
        </ActionButton>
        <span className="text-sm text-gray-600">
          {`Page ${currentPage} of ${totalPages}`}
        </span>
        <ActionButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-sm py-2 px-3 text-sm font-medium disabled:opacity-50"
        >
          Next
        </ActionButton>
      </div>
    </div>
  );
}

export default Pagination;
