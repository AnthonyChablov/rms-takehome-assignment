import React, { useRef } from 'react';
import { useScrollToElement } from '../../../../hooks/useScrollToElement';
import useSortedData from './hooks/useSortedData';
import TableRow from './components/TableRow/TableRow';
import TableHeader from './components/TableHeader/TableHeader';
import ActionButton from './components/Button/ActionButton';

/**
 * Interface defining the props for the TablePane component.
 * @template T - Represents the type of the data objects being displayed in the table.
 */
interface TablePaneProps<T extends Record<string, any>> {
  data: T[]; // The data to be displayed in the table. Each element represents a row in the table.
  highlighted?: T | null; // The currently highlighted row.
  setHighlighted?: (item: T | null) => void; // Function to update the highlighted row.
  selected?: Set<string | number | null>; // The currently selected row.
  setSelected?: (item: Set<string>) => void; // Function to update the selected row.
  addSelected?: (item: T) => void; // Optional function to add a selected earthquake record
  removeSelected?: (id: string | number) => void; // Optional function to remove a selected earthquake record
  isSelected?: (item: string | number) => boolean; // Optional function to check if an item is selected
  title?: string; // The title of the table. Optional.
  xAxisKey?: string | null; // The key used for sorting the data on the x-axis.
  setXAxisKey?: (key: string) => void; // Function to set the x-axis sorting key.
  yAxisKey?: string | null; // The key for sorting data on the y-axis (currently unused in this component).
  setYAxisKey?: (key: string) => void; // Function to set the y-axis sorting key (currently unused).
}

/**
 * TablePane Component: Displays data in a tabular format with highlighting and selection capabilities.
 * It utilizes client-side sorting via the `useSortedData` hook, enabling sorting by a specific column (x-axis).
 * The component also manages row selection and highlighting based on user interaction.
 *
 * @param {TablePaneProps<T>} props - The properties for the TablePane component.
 * @returns {JSX.Element} The rendered TablePane component.
 */
function TablePane<T extends Record<string, any>>({
  data = [],
  highlighted = null,
  setHighlighted,
  selected = new Set(),
  setSelected,
  addSelected,
  removeSelected,
  isSelected,
  title = '',
  xAxisKey = '',
  setXAxisKey,
  yAxisKey = '',
  setYAxisKey,
}: TablePaneProps<T>) {
  // If no data is provided, render a message indicating no data is available.
  if (!data || data.length === 0) {
    return <p className="text-gray-500 italic">No data to display.</p>;
  }

  // Extract column headers from the first data item.
  const columns = Object.keys(data[0]);

  /**
   * handleClick Function: This function is triggered when a table row is clicked.
   * It toggles the highlighted and selected state for the clicked row.
   * If the same row is clicked again, it clears the highlighted and selected states.
   *
   * @param {T | null} row - The clicked row data.
   */
  const handleClick = (row: T | null) => {
    if (row && removeSelected && addSelected && selected && isSelected) {
      if (isSelected(row?.id)) {
        removeSelected(row.id);
      } else {
        addSelected(row.id);
      }
    }
  };

  const handleClearSelected = () => {
    if (setSelected) {
      setSelected(new Set());
    }
  };

  // Create a reference for the table container to enable scrolling behavior.
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to scroll to the highlighted row when the highlighted state changes.
  useScrollToElement(highlighted, tableContainerRef);

  /**
   * useSortedData Hook: A custom hook that handles sorting the table data based on the specified x-axis key.
   * When the x-axis key changes, the hook sorts the data in ascending order based on the values associated with that key.
   *
   * @param {T[]} data - The array of data to be sorted.
   * @param {string} xAxisKey - The key used to sort the data.
   * @returns {T[]} The sorted data.
   */
  const sortedData = useSortedData(data, xAxisKey);

  return (
    <div
      className="bg-white rounded-lg w-full lg:w-5/12 px-4 h-screen flex flex-col p-4  shadow-md"
      data-testid="table-pane"
    >
      <div className="flex justify-between items-center pb-4">
        {/* Render the title of the table and button */}
        <h1 className="text-xl font-bold text-gray-800 py-8 ">{title}</h1>
        {/* Action button to clear selected items */}
        <ActionButton
          onClick={handleClearSelected} // Calls the handleClearSelected function when the button is clicked
          title={`Clear Selected `} // Sets the base text for the button's tooltip or accessible name
          children={
            <span className="text-lg font-semibold text-indigo-50">
              {/* Display the number of selected items if there are any */}
              {selected.size > 0 ? `: ${selected.size} ` : ''}
            </span>
          }
          active={selected.size > 0}
        />
      </div>

      {/* Scrollable container for the table */}
      <div
        ref={tableContainerRef}
        className="overflow-y-auto overflow-x-auto flex-grow "
      >
        <table className="min-w-full leading-normal  relative ">
          {/* Table Header */}
          <TableHeader columns={columns} />

          <tbody>
            {/* Map through the sorted data and render each row */}
            {sortedData.map((row, index) => (
              <TableRow
                key={row?.id} // Use the id of each row as the key for efficient re-renders
                row={row}
                index={index}
                columns={columns}
                highlighted={highlighted}
                selected={selected}
                handleClick={handleClick}
                setHighlighted={setHighlighted}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablePane;
