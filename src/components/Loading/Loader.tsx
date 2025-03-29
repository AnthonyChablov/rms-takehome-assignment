import React from 'react';

const Loader = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Skeleton for PlotPane */}
      <div className="bg-gray-100 rounded-lg shadow-md p-6 h-[33rem] w-full mb-6 flex flex-col">
        <div className="mb-4 flex items-center space-x-4">
          <div>
            <div className="bg-gray-200 h-8 rounded w-24 mb-2"></div>
            <div className="bg-gray-200 h-10 rounded w-48"></div>
          </div>
          <div>
            <div className="bg-gray-200 h-8 rounded w-24 mb-2"></div>
            <div className="bg-gray-200 h-10 rounded w-48"></div>
          </div>
        </div>
        <div className="bg-gray-200 rounded-md flex-grow"></div>
      </div>

      {/* Skeleton for TablePane */}
      <div className="bg-gray-100 rounded-lg shadow-md p-6 h-96 w-full">
        <div className="bg-gray-200 h-8 rounded w-32 mb-4"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-100">
              <tr>
                {Array.from({ length: 22 }).map((_, index) => (
                  <th
                    key={`header-${index}`}
                    className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    <div className="bg-gray-300 h-4 rounded w-16"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={`row-${index}`}>
                  {Array.from({ length: 22 }).map((_, cellIndex) => (
                    <td
                      key={`cell-${index}-${cellIndex}`}
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
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
  );
};

export default Loader;
