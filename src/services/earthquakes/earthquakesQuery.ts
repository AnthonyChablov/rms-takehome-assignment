import { useQuery } from '@tanstack/react-query';
import { getEarthquakes } from './earthquakesService';

export const useEarthquakesQuery = () => {
  return useQuery({
    queryKey: ['earthquakes'],
    queryFn: getEarthquakes,
    refetchOnWindowFocus: false,
  });
};
