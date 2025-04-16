import React, { useEffect } from 'react';
import { cn } from '@/utils/utils';
import { usePlotTableStore } from '@/store/plotTableStore';

/**
 * TableRowProps interface defines the expected props for the TableRow component.
 *
 * @template T The type of each row object in the table.
 *
 * @property {T} row The data for the current row, where T is a record with string keys and any values (typically an object).
 * @property {number} index The index of the row in the table, used for styling and key assignment.
 * @property {string[]} columns An array of strings representing the column keys of the table row to display.
 * @property {T | null} highlighted The row that is currently highlighted (typically based on hover or some other condition).
 * @property {T[]} selected The array of currently selected rows.
 * @property {(item: T) => void} handleClick A callback function that is called when a row is clicked. It receives the clicked row as a parameter.
 */
export interface TableRowProps<T extends Record<string, any>> {
  row: T;
  index: number;
  columns: string[];
  highlighted: T | null;
  selected: T[];
  handleClick: (item: T) => void;
  setHighlighted?: (item: T | null) => void;
}

/**
 * TableRow component renders a table row, with dynamic styling and interaction based on selection and highlighting.
 *
 * This component is used within a table to display individual rows, which may have visual states for highlighting and selection. The row is styled with conditional classes that are applied based on whether it is selected, highlighted, or hovered over.
 *
 * @template T The type of each row object in the table.
 *
 * @param {T} row The data for the current row.
 * @param {number} index The index of the current row in the table.
 * @param {string[]} columns An array of strings representing the column keys to display for the current row.
 * @param {T | null} highlighted The row that is highlighted.
 * @param {T[]} selected The array of selected rows.
 * @param {(item: T) => void} handleClick Callback function triggered when the row is clicked.
 *
 * @returns A table row `<tr>` element with conditional styling and click behavior.
 *
 * @example
 * ```tsx
 * <TableRow
 * row={rowData}
 * index={0}
 * columns={['name', 'age']}
 * highlighted={highlightedRow}
 * selected={selectedRows}
 * handleClick={handleRowClick}
 * />
 * ```
 *
 * @note The component uses the `cn` utility function to conditionally apply classes based on the row's state.
 * The row will have:
 * - A white background on even rows and gray background on odd rows.
 * - A hover effect that changes the background color to blue on hover.
 * - A highlighted background when the row is the highlighted one.
 * - A green background with border and shadow when the row is selected.
 *
 * @todo Consider adding a prop for custom styles or class names for more flexibility.
 */
const TableRow = <T extends Record<string, any>>({
  row,
  index,
  columns,
  highlighted,
  setHighlighted,
  selected,
  handleClick,
}: TableRowProps<T>) => {
  /**
   * Checks if the current row is present in the array of selected rows.
   * @returns {boolean} True if the row is selected, false otherwise.
   */
  const isRowSelected = () => {
    return selected?.some((selectedRow) => selectedRow?.id === row?.id);
  };

  const handleMouseEnter = () => {
    if (setHighlighted) {
      setHighlighted(row);
    }
  };

  const handleMouseLeave = () => {
    if (setHighlighted) {
      setHighlighted(null);
    }
  };

  const isHighlighted = row?.id === highlighted?.id;

  return (
    <tr
      id={row?.id}
      key={row?.id}
      className={cn(
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
        'hover:cursor-pointer hover:bg-blue-100 h-18 transition-colors duration-200',
        isHighlighted && 'bg-blue-200',
        isRowSelected() && 'bg-green-100 border-l-4 border-green-500 shadow-sm',
      )}
      onClick={() => handleClick(row)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={`table-row-${index}`}
    >
      {columns.map((column) => (
        <td
          key={`${index}-${column}`}
          className={`px-5 py-2 border-b border-gray-200 text-left text-sm ${
            isRowSelected() ? 'font-medium text-green-700' : 'text-gray-900'
          }`}
        >
          <div className="flex items-center space-x-2">
            <p className={'w-33'}>{String(row[column])}</p>
          </div>
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
