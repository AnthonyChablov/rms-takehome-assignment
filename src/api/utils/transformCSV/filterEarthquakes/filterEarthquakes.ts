import { EarthquakeRecord } from '@/types/earthquake';

/**
 * Filters earthquake records, removing those unsuitable for display/sorting.
 * Specifically removes records where the sortBy key or the yAxisKey value is null or undefined.
 * @param earthquakes - The array of EarthquakeRecord objects.
 * @param sortBy - The key used for sorting (string or null/undefined).
 * @param yAxisKey - The key representing the Y-axis value for plotting (defaults to 'longitude').
 * @returns A filtered array of EarthquakeRecord objects.
 */
export const filterEarthquakes = (
  earthquakes: EarthquakeRecord[],
  yAxisKey: keyof EarthquakeRecord = 'longitude', // Default or make required if always needed
): EarthquakeRecord[] => {
  return earthquakes.filter((item) => {
    const yValue = item[yAxisKey];
    // Check if yAxis value is valid (not null or undefined)
    const isYValueValid = yValue !== null && yValue !== undefined;

    return isYValueValid;
  });
};
