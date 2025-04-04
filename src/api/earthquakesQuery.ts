import { useQuery } from '@tanstack/react-query';
import { getEarthquakes } from './earthquakesApi';
import { GetEarthQuakesFilters } from './earthquakesApi';
import { usePlotTableStore } from '@/store/plotTableStore'; // Import Zustand store

/**
 * Custom hook that fetches earthquake data using the `getEarthquakes` API.
 *
 * It leverages React Query's `useQuery` hook to handle data fetching and caching for earthquake data,
 * while managing filters and optional sorting functionality.
 *
 * @param filters - Filters to apply to the earthquake data query. This is an object of type `GetEarthQuakesFilters`.
 * @param sortBy - Optional string parameter to define how the data should be sorted. Defaults to null.
 *
 * @returns The result of the `useQuery` hook, which includes the data, error, and loading states.
 *
 * @note Sorting is handled during each data fetch, and the sorting state is not part of the query key
 * to prevent unnecessary refetching when only the sorting changes. This helps in ensuring that stale data
 * isn't shown when the underlying data is updated.
 */
export const useEarthquakesQuery = (
  filters: GetEarthQuakesFilters | undefined,
  sortBy: string | null = null,
) => {
  return useQuery({
    // The `queryKey` consists of 'earthquakes' and the filters.
    // This allows React Query to cache results based on the filter parameters.
    queryKey: ['earthquakes', filters], // Query key includes filters for caching and re-fetching
    queryFn: () => getEarthquakes(filters, sortBy), // Fetch data with applied filters and sorting
    refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
  });
};
