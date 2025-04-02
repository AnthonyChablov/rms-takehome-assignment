import { useQuery } from '@tanstack/react-query';
import { getEarthquakes } from './earthquakesService';
import { GetEarthQuakesFilters } from './earthquakesService';
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

// Original approach (commented out):
// import { useQuery } from '@tanstack/react-query';
// import { getEarthquakes } from './earthquakesService';
// import { GetEarthQuakesFilters } from './earthquakesService';
// import { usePlotTableStore } from '@/store/plotTableStore'; // Import your Zustand store
//
// export const useEarthquakesQuery = (
//   filters: GetEarthQuakesFilters | undefined,
//   sortBy: string | null = null,
// ) => {
//   return useQuery({
//     // remove sortBy from queryKey to avoid unnecessary refetches
//     // queryKey: ['earthquakes', filters, sortBy], // Include filters and sortBy
//     // Pros: No Unnecessary Refetches: You avoid hitting the USGS server every time the user changes the sort order, which is good for performance and respecting API rate limits.
//     // Simpler Tanstack Query Key: Your query key is cleaner and focused on data fetching parameters.
//     // Cons: This will cause the query to refetch every time sortBy changes -
//     queryKey: ['earthquakes', filters], // Include filters
//     queryFn: () => getEarthquakes(filters, sortBy), // Pass xAxisKey to getEarthquakes to sort the data
//     refetchOnWindowFocus: false,
//   });
// };
