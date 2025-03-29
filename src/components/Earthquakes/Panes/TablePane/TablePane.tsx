import React from 'react';

interface TablePaneProps<T extends Record<string, any>> {
  data: T[];
}

function TablePane<T extends Record<string, any>>({ data }: TablePaneProps<T>) {
  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div>
      <h2>Data Table</h2>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td className="w-fit" key={`${index}-${column}`}>
                    {row[column]?.toString()}
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
