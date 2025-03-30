import React from 'react';

interface AxisSelectorProps {
  xAxisKey: string | null;
  yAxisKey: string | null;
  numericKeys: string[];
  handleXAxisChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleYAxisChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function AxisSelector({
  xAxisKey,
  yAxisKey,
  numericKeys,
  handleXAxisChange,
  handleYAxisChange,
}: AxisSelectorProps) {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 "
          htmlFor="xAxis"
        >
          X-Axis:
        </label>
        <div className="relative hover:cursor-pointer">
          <select
            id="xAxis"
            value={xAxisKey || ''}
            onChange={handleXAxisChange}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="">Select X-Axis</option>
            {numericKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
          htmlFor="yAxis"
        >
          Y-Axis:
        </label>
        <div className="relative ">
          <select
            id="yAxis"
            value={yAxisKey || ''}
            onChange={handleYAxisChange}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option className="hover:cursor-pointer" value="">
              Select Y-Axis
            </option>
            {numericKeys.map((key) => (
              <option className="hover:cursor-pointer" key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AxisSelector;
