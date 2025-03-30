import React from 'react';
import { formatDate } from '@/utils/utils';
import { cn } from '@/utils/utils';
import { EarthquakeRecord } from '@/types/earthquake';

interface TablePaneProps<T extends Record<string, any>> {
  data: T[];
  highlighted?: T | null;
  setHighlighted?: (item: T | null) => void;
}

function TablePane<T extends Record<string, any>>({
  data,
  highlighted,
  setHighlighted,
}: TablePaneProps<T>) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 italic">No data to display.</p>;
  }

  const columns = Object.keys(data[0]);

  const handleClick = (input: T | null) => {
    if (setHighlighted) {
      setHighlighted(input);
    }
  };

  return (
    <div className="bg-white rounded-lg w-5/12 px-4 h-screen flex flex-col p-4 shadow-md">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        USGS Most Recent Earthquakes (Top 100)
      </h1>
      <div className="overflow-y-auto overflow-x-auto flex-grow">
        <table className="min-w-full leading-normal relative ">
          {/* Table Header */}
          <thead className="">
            <tr className="sticky top-0 left-0 bg-gray-200 ">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                id={row?.id}
                key={row?.id}
                className={`
                  ${cn(index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
                  ${row?.id === highlighted?.id && 'bg-blue-600'} 
                    hover:cursor-pointer  hover:bg-blue-100 h-16`}
              >
                {columns.map((column) => (
                  <td
                    key={`${index}-${column}`}
                    className="px-5 border-b border-gray-200 text-left text-sm "
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
  );
}

export default TablePane;
