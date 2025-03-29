import React from 'react';
import { formatDate } from '@/utils/utils';

interface TablePaneProps<T extends Record<string, any>> {
  data: T[];
}

function TablePane<T extends Record<string, any>>({ data }: TablePaneProps<T>) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 italic">No data to display.</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-96 flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        USGS Most Recent Earthquakes (Top 100)
      </h2>
      <div className="overflow-y-auto overflow-x-auto flex-grow">
        <div className="">
          <table className="min-w-full leading-normal relative ">
            <thead className="">
              <tr className=" sticky top-0 left-0 bg-gray-100">
                {columns.map((column) => (
                  <th
                    key={column}
                    className=" px-5 py-2 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={`${index}-${column}`}
                      className="px-5 py-3 border-b text-left border-gray-200 bg-white text-sm"
                    >
                      <p className="text-gray-900 whitespace-no-wrap">
                        {column === 'time' || column === 'updated'
                          ? formatDate(row[column])
                          : row[column]?.toString()}
                      </p>
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
}

export default TablePane;
