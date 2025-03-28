import { useQuery } from "@tanstack/react-query";
import { getEarthquakes } from ".";

export const useEarthquakes = () => {
    return useQuery({
        queryKey: ['earthquakes'],
        queryFn : getEarthquakes,
        refetchOnWindowFocus: false,
    });
}