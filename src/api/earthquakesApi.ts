import { EarthquakeRecord } from '@/types/earthquake';
// If you keep filters in a separate type definition:
// import { GetEarthQuakesFilters } from './types';
import { getEarthquakeApiUrl } from './utils/earthquakeUrl/earthquakeUrl';
import { fetchData } from './utils/fetchData/fetchData';
import { parseCSV } from './utils/parseCSV/parseCSV';
import { transformCsvToEarthquakes } from './utils/transformCSV/transformCSV';
import { applyLimit } from './utils/transformCSV/applyLimit/applyLimit';
import { sortEarthquakes } from './utils/transformCSV/sortEarthquakes/sortEarthquakes';
import { filterInvalidEarthquakes } from './utils/transformCSV/filterInvalidEarthquake/filterInvalidEarthquake';

// Re-define or import the filters type
export type GetEarthQuakesFilters = {
  limit?: number; // Make limit optional if it's not always required
};

/**
 * Fetches, parses, filters, sorts, and limits earthquake data from the USGS CSV feed.
 * This function orchestrates calls to various utility functions.
 * Designed to be used with React Query's useQuery hook.
 *
 * @param filters Optional filters (currently only 'limit').
 * @param sortBy Optional key to sort the data by.
 * @returns A promise that resolves to an array of processed EarthquakeRecord objects.
 * @throws Throws an error if any step in the process fails.
 */
export const getEarthquakes = async (
  filters?: GetEarthQuakesFilters,
  sortBy?: string | null,
  // Optional: You could pass the yAxisKey dynamically if needed
  // yAxisKey: keyof EarthquakeRecord = 'longitude'
): Promise<EarthquakeRecord[]> => {
  console.log(
    `Workspaceing earthquakes with filters: ${JSON.stringify(filters)}, sortBy: ${sortBy}`,
  );
  try {
    // 1. Get the correct URL
    const apiUrl = getEarthquakeApiUrl();

    // 2. Fetch the raw CSV data
    const csvData = await fetchData(apiUrl);

    // 3. Parse the CSV string
    const parsedRows = await parseCSV(csvData);

    // 4. Transform CSV rows into EarthquakeRecord objects
    let earthquakes = transformCsvToEarthquakes(parsedRows);
    console.log(`Parsed ${earthquakes.length} records.`);

    // 5. Filter out records with null values for critical keys (before sorting/limiting)
    // Using the default 'longitude' for yAxisKey as in the original code.
    // Pass a dynamic key here if your charting needs change.
    earthquakes = filterInvalidEarthquakes(earthquakes, sortBy, 'longitude');
    console.log(
      `Filtered down to ${earthquakes.length} valid records for sorting/plotting.`,
    );

    // 6. Sort the data
    earthquakes = sortEarthquakes(earthquakes, sortBy);
    console.log(`Sorted records by: ${sortBy ?? 'default order'}.`);

    // 7. Apply the limit (after filtering and sorting)
    earthquakes = applyLimit(earthquakes, filters?.limit);
    console.log(
      `Applied limit: ${filters?.limit ?? 'none'}. Final count: ${earthquakes.length}`,
    );

    return earthquakes;
  } catch (error) {
    console.error('Error in getEarthquakes processing pipeline:', error);
    // Let the error propagate up to React Query for handling (e.g., setting error state)
    throw error;
  }
};
