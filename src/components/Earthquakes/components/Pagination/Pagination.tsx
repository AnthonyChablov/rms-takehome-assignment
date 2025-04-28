import React, { Dispatch, SetStateAction } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
  pageSizeOptions?: number[];
}

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  onItemsPerPageChange,
  itemsPerPage,
  pageSizeOptions = [10, 25, 50, 75, 100],
}: PaginationProps) {
  const handlePrevPage = () =>
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  const handleNextPage = () =>
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));

  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
        >
          {pageSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
