import { EarthquakeRecord } from '@/types/earthquake';
import { getEarthquakeApiUrl } from './utils/earthquakeUrl/earthquakeUrl';
import { fetchData } from './utils/fetchData/fetchData';
import { parseCSV } from './utils/parseCSV/parseCSV';
import { transformCsvToEarthquakes } from './utils/transformCSV/transformCSV';
import { applyLimit } from './utils/transformCSV/applyLimit/applyLimit';
import { sortData } from './utils/transformCSV/sortData/sortData';
import { filterData } from './utils/transformCSV/filterData/filterData';

// Re-define or import the filters type
export type GetEarthQuakesFilters = {
  limit?: number; // Make limit optional if it's not always required
};

/**
 * Fetches, parses, filters, sorts, and limits earthquake data from the USGS CSV feed.
 * This function orchestrates calls to various utility functions.
 *
 * It is designed to be used with React Query's `useQuery` hook to handle the fetching and caching of earthquake data.
 *
 * @param filters - Optional filters to apply. Currently, only `limit` is supported to restrict the number of records.
 * @param sortBy - Optional parameter to specify a key by which to sort the earthquake data.
 *
 * @returns A Promise that resolves to an array of EarthquakeRecord objects, which contain the processed earthquake data.
 *
 * @throws Will throw an error if any step in the data fetching or processing pipeline fails, which will be handled by React Query's error state.
 *
 * The process is as follows:
 * 1. The correct API URL is determined via the `getEarthquakeApiUrl` function.
 * 2. The raw CSV data is fetched from the USGS API using the `fetchData` function.
 * 3. The CSV data is parsed into rows using the `parseCSV` utility function.
 * 4. The parsed rows are transformed into an array of `EarthquakeRecord` objects.
 * 5. Invalid records (with missing critical data like longitude) are filtered out.
 * 6. The remaining data is sorted by the specified `sortBy` key.
 * 7. An optional limit is applied to restrict the number of returned records.
 */
export const getEarthquakes = async (
  // Removed the generic <T> here
  filters?: GetEarthQuakesFilters,
  sortBy?: string | null,
): Promise<EarthquakeRecord[]> => {
  // Explicitly return Promise<EarthquakeRecord[]>
  try {
    // 1. Get the correct URL for the earthquake data API
    const apiUrl = getEarthquakeApiUrl();

    // 2. Fetch the raw CSV data from the API
    const csvData = await fetchData(apiUrl);

    // 3. Parse the CSV data string into rows
    const parsedRows = await parseCSV<Record<string, any>>(csvData); // parseCSV returns an array of generic objects

    // 4. Transform the parsed CSV rows into EarthquakeRecord objects
    let data = transformCsvToEarthquakes(parsedRows);

    // 5. Filter out records that have invalid or missing critical keys (e.g., longitude)
    // Assuming filterData works with EarthquakeRecord[]
    data = filterData(data, 'longitude');

    // 6. Sort the earthquake data based on the provided sorting criteria
    data = sortData(data, sortBy);

    // 7. Apply a limit to the number of records returned, if specified
    data = applyLimit(data, filters?.limit);

    return data;
  } catch (error) {
    // console.error('Error in getEarthquakes data processing pipeline:', error);
    // Throw the error so React Query can handle it (e.g., update the error state)
    throw error;
  }
};
