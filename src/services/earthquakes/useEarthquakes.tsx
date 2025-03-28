import { useQuery } from "@tanstack/react-query";
import { getEarthquakes } from "./earthquakesService";

export const useEarthquakes = () => {
    return useQuery({
        queryKey: ['earthquakes'],
        queryFn : getEarthquakes,
        refetchOnWindowFocus: false,
    });
}