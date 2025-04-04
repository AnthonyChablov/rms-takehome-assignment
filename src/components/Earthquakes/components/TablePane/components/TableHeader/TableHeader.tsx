interface TableHeaderProps {
  columns: string[];
}

/**
 * TableHeader component renders the header row of a table with column titles.
 *
 * The component accepts an array of column names and generates `<th>` elements
 * for each one, ensuring they are styled consistently and positioned at the top of the table.
 *
 * @param {string[]} columns An array of strings, where each string represents a column name
 *                           to display in the table header.
 *
 * @returns A `<thead>` element containing a `<tr>` for the header row, with each column name
 *          displayed inside a `<th>` element.
 *
 * @example
 * ```tsx
 * <TableHeader columns={['Name', 'Age', 'Occupation']} />
 * ```
 *
 * @note
 * - The header row is sticky to the top of the table, which means it will remain visible while
 *   scrolling through the table content.
 * - The text is styled with a consistent look, with uppercase letters, smaller font size, and
 *   gray background for the header.
 *
 * @todo Consider adding support for sorting functionality or icons to indicate sortable columns.
 */
const TableHeader = ({ columns }: TableHeaderProps) => (
  <thead className="">
    <tr className="sticky top-0 left-0 bg-gray-200 ">
      {columns.map((column) => (
        <th
          key={column}
          className="px-5 py-3 border-b border-gray-200
             text-left text-xs font-semibold text-gray-700
             uppercase tracking-wider"
        >
          {column}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
