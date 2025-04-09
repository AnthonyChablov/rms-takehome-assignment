/**
 * Filters an array of objects, removing those unsuitable based on the validity
 * of a specified Y-axis key.
 * Specifically removes records where the yAxisKey value is null or undefined.
 * @param data - The array of objects to filter.
 * @param yAxisKey - The key representing the Y-axis value for filtering
 * (defaults to 'longitude' if the generic type extends
 * EarthquakeRecord, otherwise it should be provided).
 * @returns A filtered array of objects.
 */
export const filterData = <T extends Record<string, any>>(
  data: T[],
  yAxisKey: keyof T,
): T[] => {
  return data.filter((item) => {
    const yValue = item[yAxisKey];
    // Check if yAxis value is valid (not null or undefined)
    const isYValueValid = yValue !== null && yValue !== undefined;

    return isYValueValid;
  });
};
