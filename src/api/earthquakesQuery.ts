import { useQuery } from '@tanstack/react-query';
import { getEarthquakes } from './earthquakesApi';
import { GetEarthQuakesFilters } from './earthquakesApi';
import { usePlotTableStore } from '@/store/plotTableStore'; // Import your Zustand store

export const useEarthquakesQuery = (
  filters: GetEarthQuakesFilters | undefined,
  sortBy: string | null = null,
) => {
  return useQuery({
    // Removed sortBy from queryKey to prevent refetches when only sorting changes.
    // Sorting happens on each data fetch, and stale data might be shown if the underlying data updates.
    queryKey: ['earthquakes', filters], // Include filters
    queryFn: () => getEarthquakes(filters, sortBy), // Pass xAxisKey to getEarthquakes to sort the data
    refetchOnWindowFocus: false,
  });
};
