import React, { useRef } from 'react';
import { cn } from '@/utils/utils';
import { useScrollToElement } from '../../../../hooks/useScrollToElement';
import useSortedData from './hooks/useSortedData';
import { TableRow } from './components/TableRow/TableRow';
import { TableHeader } from './components/TableHeader/TableHeader';

// Interface defining the props for the TablePane component.
interface TablePaneProps<T extends Record<string, any>> {
  data: T[]; // An array of data objects to be displayed in the table.
  highlighted?: T | null; // The currently highlighted data item.
  setHighlighted?: (item: T | null) => void; // Function to set the highlighted data item.
  selected?: T | null; // The currently selected data item.
  setSelected?: (item: T | null) => void; // Function to set the selected data item.
  title?: React.ReactNode; // The title of the table pane.
  xAxisKey?: string | null; // The key used for sorting the data on the x-axis.
  setXAxisKey?: (key: string) => void; // Function to set the x-axis sorting key.
  yAxisKey?: string | null; // The key used for sorting the data on the y-axis (currently unused in this component).
  setYAxisKey?: (key: string) => void; // Function to set the y-axis sorting key (currently unused).
}

/**
 * TablePane Component: Displays data in a tabular format with highlighting and selection capabilities.
 * It utilizes client-side sorting via the `useSortedData` hook.
 */
function TablePane<T extends Record<string, any>>({
  data = [],
  highlighted = null,
  setHighlighted,
  selected = null,
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

  // Click Handler: Handles clicks on table rows to highlight and select them.
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

  // Use the custom hook to automatically scroll the table container to the highlighted row when the 'highlighted' prop changes.
  useScrollToElement(highlighted, tableContainerRef);

  /**
   * useSortedData Hook: A custom hook responsible for sorting the data client-side.
   * It takes the `data` and the `xAxisKey` as input.
   * When `xAxisKey` changes, the hook re-sorts the `data` based on the values associated with that key.
   * This approach performs sorting in the browser, which can be suitable for smaller datasets but might impact performance for very large datasets.
   */
  const sortedData = useSortedData(data, xAxisKey);

  return (
    <div
      className="bg-white rounded-lg w-full lg:w-5/12 px-4 h-screen flex flex-col p-4 shadow-md"
      data-testid="table-pane"
    >
      {/* Table title */}
      <h1 className="text-xl font-bold mb-4 text-gray-800">{title}</h1>
      {/* Scrollable container for the table */}
      <div
        ref={tableContainerRef}
        className="overflow-y-auto overflow-x-auto flex-grow"
      >
        <table className="min-w-full leading-normal relative ">
          {/* Table Header */}
          <TableHeader columns={columns} />

          <tbody>
            {/* Map through the data to create table rows */}
            {sortedData.map((row, index) => (
              <TableRow
                key={row?.id}
                row={row}
                index={index}
                columns={columns}
                highlighted={highlighted}
                selected={selected}
                handleClick={handleClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablePane;
