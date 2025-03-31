import React, { useRef } from 'react';
import { formatDate } from '@/utils/utils';
import { cn } from '@/utils/utils';
import { useScrollToElement } from './hooks/useScrollToElement';

// Interface for the TablePane component props
interface TablePaneProps<T extends Record<string, any>> {
  data: T[];
  highlighted?: T | null;
  setHighlighted?: (item: T | null) => void;
  selected?: T | null;
  setSelected?: (item: T | null) => void;
  title?: React.ReactNode;
  xAxisKey?: string | null;
  setXAxisKey?: (key: string) => void;
  yAxisKey?: string | null;
  setYAxisKey?: (key: string) => void;
}

/**
 * Component to display data in a tabular format with highlighting and scrolling functionality.
 *
 * @param {TablePaneProps<T>} props - The props for the TablePane component.
 * @returns {JSX.Element} - The rendered TablePane component.
 */
function TablePane<T extends Record<string, any>>({
  data = [],
  highlighted,
  setHighlighted,
  selected,
  setSelected,
  title = '',
  xAxisKey = '',
  setXAxisKey,
  yAxisKey = '',
  setYAxisKey,
}: TablePaneProps<T>) {
  // Render a message if there is no data to display
  if (!data || data.length === 0) {
    return <p className="text-gray-500 italic">No data to display.</p>;
  }

  // Extract column headers from the first data item
  const columns = Object.keys(data[0]);

  const handleClick = (row: T | null) => {
    if (setHighlighted && setSelected) {
      if (row === selected) {
        setHighlighted(null);
        setSelected(null);
      } else {
        setHighlighted(row);
        setSelected(row);
      }
    }
  };

  // Create a ref for the table container to enable scrolling
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to automatically scroll the table container
  // to the highlighted row when the 'highlighted' prop changes.
  useScrollToElement(highlighted, tableContainerRef);

  const sortedData = React.useMemo(() => {
    if (data && xAxisKey) {
      return [...data].sort((a, b) => {
        // Assuming xAxisKey corresponds to a number
        return (a[xAxisKey] as number) - (b[xAxisKey] as number);
      });
    }
    return data;
  }, [data, xAxisKey]);

  return (
    <div className="bg-white rounded-lg w-5/12 px-4 h-screen flex flex-col p-4 shadow-md">
      {/* Table title */}
      <h1 className="text-xl font-bold mb-4 text-gray-800">{title}</h1>
      {/* Scrollable container for the table */}
      <div
        ref={tableContainerRef}
        className="overflow-y-auto overflow-x-auto flex-grow"
      >
        <table className="min-w-full leading-normal relative ">
          {/* Table Header */}
          <thead className="">
            <tr className="sticky top-0 left-0 bg-gray-200 ">
              {/* Map through the columns to create table headers */}
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
            {/* Map through the data to create table rows */}
            {sortedData.map((row, index) => (
              <tr
                // Set the ID of the row to the item's ID for scrolling purposes
                id={row?.id}
                key={row?.id}
                className={cn(
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                  'hover:cursor-pointer hover:bg-blue-100 h-18 transition-colors duration-200',
                  row?.id === highlighted?.id && 'bg-blue-200', // Subtle highlight
                  row?.id === selected?.id &&
                    'bg-green-100 border-l-4 border-green-500 shadow-sm', // Distinct selection
                )}
                // Handle click on a row to highlight and select it
                onClick={() => handleClick(row)}
              >
                {/* Map through the columns to create table data cells */}
                {columns.map((column) => (
                  <td
                    key={`${index}-${column}`}
                    className={`px-5 py-2 border-b border-gray-200 text-left text-sm ${
                      row?.id === selected?.id
                        ? 'font-medium text-green-700'
                        : 'text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <p className="whitespace-no-wrap">
                        {column === 'time' || column === 'updated'
                          ? formatDate(row[column])
                          : row[column]?.toString()}
                      </p>
                    </div>
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
