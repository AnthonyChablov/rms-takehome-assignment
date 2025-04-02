interface TableHeaderProps {
  columns: string[];
}

export const TableHeader = ({ columns }: TableHeaderProps) => (
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
