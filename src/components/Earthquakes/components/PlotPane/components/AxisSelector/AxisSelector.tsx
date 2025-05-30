import React from 'react';

/**
 * AxisSelectorProps defines the props required by the AxisSelector component.
 * It includes the selected X and Y axis keys, an array of numeric keys for the options,
 * and functions to handle changes on both axes.
 */
interface AxisSelectorProps {
  // The selected key for the X-Axis. Can be null if no selection is made.
  xAxisKey: string | null;

  // The selected key for the Y-Axis. Can be null if no selection is made.
  yAxisKey: string | null;

  // An array of numeric keys to populate the options for the X and Y axes.
  numericKeys: string[];

  // Callback function to handle changes to the X-Axis selection.
  handleXAxisChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  // Callback function to handle changes to the Y-Axis selection.
  handleYAxisChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * AxisSelector is a function component that renders two dropdowns for selecting
 * the X-Axis and Y-Axis keys from an array of numeric keys.
 * It handles changes in both the X and Y axis selections using provided callback functions.
 *
 * @param xAxisKey - The current selection for the X-Axis.
 * @param yAxisKey - The current selection for the Y-Axis.
 * @param numericKeys - The list of numeric keys to populate as options in the dropdowns.
 * @param handleXAxisChange - Function to handle the change event for the X-Axis selection.
 * @param handleYAxisChange - Function to handle the change event for the Y-Axis selection.
 *
 * @returns A JSX element that renders two select dropdowns for the X and Y axes.
 */
function AxisSelector({
  xAxisKey,
  yAxisKey,
  numericKeys,
  handleXAxisChange,
  handleYAxisChange,
}: AxisSelectorProps) {
  return (
    <div className="pb-4 flex items-center space-x-4">
      {/* X-Axis Selector */}
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="xAxis"
        >
          X-Axis:
        </label>
        <div className="relative hover:cursor-pointer">
          <select
            id="xAxis"
            value={xAxisKey || ''} // If no selection, default to empty string
            onChange={handleXAxisChange}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="">Select X-Axis</option>
            {/* Map through numericKeys to populate options */}
            {numericKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            {/* Arrow icon for dropdown */}
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

      {/* Y-Axis Selector */}
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
          htmlFor="yAxis"
        >
          Y-Axis:
        </label>
        <div className="relative">
          <select
            id="yAxis"
            value={yAxisKey || ''} // If no selection, default to empty string
            onChange={handleYAxisChange}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option className="hover:cursor-pointer" value="">
              Select Y-Axis
            </option>
            {/* Map through numericKeys to populate options */}
            {numericKeys.map((key) => (
              <option className="hover:cursor-pointer" key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            {/* Arrow icon for dropdown */}
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
