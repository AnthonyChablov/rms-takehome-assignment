import React from 'react';

const Loader = () => {
  return (
    <>
      {/* Skeleton for PlotPane */}
      <div className="animate-pulse bg-white rounded-lg px-6 w-7/12  flex flex-col ">
        <div className="mb-4 flex items-center space-x-4">
          <div>
            <div className="bg-gray-200 h-4 rounded w-12 mb-2"></div>
            <div className="bg-gray-200 h-10 rounded w-34"></div>
          </div>
          <div>
            <div className="bg-gray-200 h-4 rounded w-12 mb-2"></div>
            <div className="bg-gray-200 h-10 rounded w-34"></div>
          </div>
        </div>
        <div className="bg-gray-200 rounded-md flex-grow"></div>
      </div>

      {/* Skeleton for TablePane */}
      <div className="animate-pulse bg-white rounded-lg w-5/12  flex flex-col ">
        {' '}
        <div className="bg-gray-200 h-4 rounded w-64 mb-2"></div>
        <div className="bg-gray-200 rounded w-32 mb-4"></div>
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-200">
              <tr>
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
              {Array.from({ length: 8 }).map((_, index) => (
                <tr className="space-x-3 py-3 h-18" key={`row-${index}`}>
                  {Array.from({ length: 22 }).map((_, cellIndex) => (
                    <td
                      key={`cell-${index}-${cellIndex}`}
                      className="px-5 py-3  border-b text-left border-gray-200 bg-white text-sm"
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
    </>
  );
};

export default Loader;
