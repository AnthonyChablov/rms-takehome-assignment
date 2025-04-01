import { useQuery } from '@tanstack/react-query';
import { getEarthquakes } from './earthquakesService';
import { GetEarthQuakesFilters } from './earthquakesService';
import { usePlotTableStore } from '@/store/plotTableStore'; // Import your Zustand store

export const useEarthquakesQuery = (
  filters: GetEarthQuakesFilters | undefined,
  sortBy: string | null = null,
) => {
  return useQuery({
    queryKey: ['earthquakes', filters, sortBy], // Include filters and sortBy in the query key
    queryFn: () => getEarthquakes(filters, sortBy), // Pass xAxisKey to getEarthquakes to sort the data
    refetchOnWindowFocus: false,
  });
};
