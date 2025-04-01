import { useQuery } from '@tanstack/react-query';
import { getEarthquakes } from './earthquakesService';
import { GetEarthQuakesFilters } from './earthquakesService';
import { usePlotTableStore } from '@/store/plotTableStore'; // Import your Zustand store

export const useEarthquakesQuery = (
  filters: GetEarthQuakesFilters | undefined,
) => {
  const xAxisKey = usePlotTableStore((state) => state.xAxisKey);

  return useQuery({
    queryKey: ['earthquakes', filters, xAxisKey], // Include xAxisKey in the query key
    queryFn: () => getEarthquakes(filters, xAxisKey), // Pass xAxisKey to getEarthquakes
    refetchOnWindowFocus: false,
  });
};
