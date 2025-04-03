import React from 'react';
import { cn } from '@/utils/utils';

export interface TableRowProps<T extends Record<string, any>> {
  row: T;
  index: number;
  columns: string[];
  highlighted: T | null;
  selected: T | null;
  handleClick: (item: T | null) => void;
}

const TableRow = <T extends Record<string, any>>({
  row,
  index,
  columns,
  highlighted,
  selected,
  handleClick,
}: TableRowProps<T>) => {
  const isSelected = row?.id === selected?.id;
  const isHighlighted = row?.id === highlighted?.id;

  return (
    <tr
      id={row?.id}
      key={row?.id}
      className={cn(
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
        'hover:cursor-pointer hover:bg-blue-100 h-18 transition-colors duration-200',
        isHighlighted && 'bg-blue-200',
        isSelected && 'bg-green-100 border-l-4 border-green-500 shadow-sm',
      )}
      onClick={() => handleClick(row)}
    >
      {columns.map((column) => (
        <td
          key={`${index}-${column}`}
          className={`px-5 py-2 border-b border-gray-200 text-left  text-sm ${
            isSelected ? 'font-medium text-green-700' : 'text-gray-900'
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
