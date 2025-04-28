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
        `flex space-x-4 justify-between items-center  bg-white border-gray-200 ${className}`,
      )}
    >
      <div className="flex flex-col mb-4 justify-start items-start space-x-4   ">
        <label
          htmlFor="itemsPerPage"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Items Per Page:
        </label>
        <div className="relative hover:cursor-pointer">
          <select
            id="itemsPerPage"
            className="block appearance-none w-full bg-gray-200 border border-gray-200 
            text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
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
            {/* Arrow icon for dropdown */}
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
      <div className="flex items-center space-x-4">
        <ActionButton
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md text-md bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </ActionButton>
        <span className="text-md text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <ActionButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md text-md font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </ActionButton>
      </div>
    </div>
  );
}

export default Pagination;
