import { useState, useEffect } from 'react';

/**
 * A custom hook that processes an array of data and extracts information related to plotting axes.
 *
 * @param data - An array of objects where each object contains key-value pairs.
 * The key is a string and the value can be of any type.
 * The hook assumes that the data is structured such that numerical values represent potential axes.
 *
 * @returns An object containing the following properties:
 *  - `xAxisKey`: The key of the data object to be used for the x-axis. Defaults to the first numeric key.
 *  - `setXAxisKey`: A function to set the x-axis key.
 *  - `yAxisKey`: The key of the data object to be used for the y-axis. Defaults to the second numeric key.
 *  - `setYAxisKey`: A function to set the y-axis key.
 *  - `numericKeys`: An array of keys that have numerical values, which can be used as axes.
 *
 * The hook will determine the x and y axes based on the first two numeric keys in the first object of the data array.
 * If only one numeric key is present, it will be used for the x-axis.
 * If no numeric keys are found, the axes will remain null.
 */
function usePlotPaneData<T extends Record<string, any>>(data: T[]) {
  // State to store the key for the x-axis
  const [xAxisKey, setXAxisKey] = useState<string | null>(null);

  // State to store the key for the y-axis
  const [yAxisKey, setYAxisKey] = useState<string | null>(null);

  // State to store all numeric keys in the first data entry
  const [numericKeys, setNumericKeys] = useState<string[]>([]);

  // Effect hook to initialize numeric keys and axes whenever data changes
  useEffect(() => {
    if (data.length > 0) {
      const firstRow = data[0];

      // Filter numeric keys from the first row of data
      const numbers = Object.keys(firstRow).filter(
        (key) => typeof firstRow[key] === 'number', // Check if value is a number
      );

      // Set the numeric keys state
      setNumericKeys(numbers);

      // Set the initial x and y axis keys based on available numeric keys
      if (numbers.length >= 2) {
        setXAxisKey(numbers[0]); // Set the first numeric key as the x-axis
        setYAxisKey(numbers[1]); // Set the second numeric key as the y-axis
      } else if (numbers.length === 1) {
        setXAxisKey(numbers[0]); // If only one numeric key, set it as the x-axis
      }
    }
  }, [data]); // Re-run effect when `data` changes

  // Return the necessary state values and functions for updating them
  return {
    xAxisKey,
    setXAxisKey,
    yAxisKey,
    setYAxisKey,
    numericKeys,
  };
}

export default usePlotPaneData;
