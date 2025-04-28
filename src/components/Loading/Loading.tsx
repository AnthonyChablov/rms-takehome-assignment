import React from 'react';

/**
 * Loading Component
 *
 * This component renders skeleton loaders for a plot, a table, and pagination controls
 * to display during data fetching or processing. The skeleton loaders give users a
 * visual cue that content is being loaded. This improves user experience by providing
 * a placeholder layout while the actual content is being rendered.
 *
 * The skeleton loaders are animated using the `animate-pulse` class from Tailwind CSS
 * to simulate a "pulsing" effect, which gives the impression that the content is
 * actively being loaded.
 *
 * The component includes three main sections:
 * - **Pagination Skeleton**: A placeholder for the pagination controls.
 * - **PlotPane Skeleton**: A placeholder for a plot or chart.
 * - **TablePane Skeleton**: A placeholder for a table with headers and rows.
 *
 * @returns JSX.Element - The skeleton loading screen
 */
const Loading = () => {
  return (
    <>
      {/* Skeleton for Pagination */}
      <div className="animate-pulse flex items-center justify-between py-5 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 h-8 rounded w-32"></div>
          {/* Items per page select */}
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 h-8 rounded w-20"></div>
          {/* Previous button */}
          <div className="bg-gray-200 h-6 rounded w-20"></div>
          {/* Page number display */}
          <div className="bg-gray-200 h-8 rounded w-20"></div>
          {/* Next button */}
        </div>
      </div>

      {/* Skeleton for PlotPane and TablePane */}
      <div className="py-6 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between">
        {/* Skeleton for PlotPane */}
        <div
          data-testid="loading-plot"
          className="animate-pulse bg-white rounded-lg  w-full lg:w-7/12 flex flex-col"
        >
          {/* Menu skeletons */}
          <div className="mb-4 flex items-center space-x-4 py-4 px-0">
            <div>
              <div className="bg-gray-200 h-4 rounded w-12 mb-2"></div>
              <div className="bg-gray-200 h-10 rounded w-34"></div>
            </div>
            <div>
              <div className="bg-gray-200 h-4 rounded w-12 mb-2"></div>
              <div className="bg-gray-200 h-10 rounded w-34"></div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-md w-full flex-grow"></div>
        </div>

        {/* Skeleton for TablePane */}
        <div
          data-testid="loading-table"
          className="animate-pulse bg-white rounded-lg w-full lg:w-5/12 flex flex-col"
        >
          <div className="bg-gray-200 h-6 rounded w-64 mb-4 p-4"></div>
          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-200">
                <tr>
                  {/* Table header skeletons */}
                  {Array.from({ length: 22 }).map((_, index) => (
                    <th
                      key={`header-${index}`}
                      className="px-5 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      <div className="bg-gray-300 h-4 rounded w-16"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="h-fit">
                {/* Table row skeletons */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr className="space-x-3 py-3 h-18" key={`row-${index}`}>
                    {Array.from({ length: 22 }).map((_, cellIndex) => (
                      <td
                        key={`cell-${index}-${cellIndex}`}
                        className="px-5 py-3 border-b text-left border-gray-200 bg-white text-sm"
                      >
                        <div className="bg-gray-300 h-6 rounded w-24"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
