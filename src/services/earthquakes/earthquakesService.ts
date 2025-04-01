import axios from 'axios';
import { EarthquakeRecord } from '@/types/earthquake';
import Papa, { ParseResult } from 'papaparse';
import { CSVRow } from '@/types/csvRow';
import { parseEarthquakeRow } from './utils/earthquakeParser';

const BASE_URL: string =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

// Determine the appropriate URL based on the environment
const url =
  process.env.NODE_ENV === 'development' ? PROXY_URL + BASE_URL : BASE_URL;

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: false,
});

export type GetEarthQuakesFilters = {
  limit: number;
};

/**
 * Fetches earthquake data from the USGS CSV.
 *
 * Currently, this function directly fetches and processes the CSV data on the client-side.
 * In a more robust application with a backend API, this function would instead call an
 * API endpoint, passing the filters and sorting parameters to the backend for processing.
 *
 * @param filters Optional filters to apply to the data (currently only 'limit' is used).
 * @param sortBy Optional field to sort the data by. This is received from the client-side
 * state (Zustand). Sorting is currently performed on the client-side
 * after fetching and parsing the entire CSV.
 * @returns A promise that resolves to an array of EarthquakeRecord objects.
 */
export const getEarthquakes = async (
  filters?: GetEarthQuakesFilters,
  sortBy?: string | null,
): Promise<EarthquakeRecord[]> => {
  // In a real backend scenario, the filtering and sorting would happen on the server.
  // The API call would include parameters like:
  // const response = await axiosInstance.get<string>('', {
  //   params: {
  //     ...filters, // e.g., limit=100
  //     sortBy: sortBy,
  //     // potentially sortOrder: 'asc' | 'desc'
  //   },
  //   headers: {
  //     Accept: 'text/csv',
  //   },
  //   transformResponse: [(data) => data],
  // });
  const response = await axiosInstance.get<string>('', {
    headers: {
      Accept: 'text/csv',
    },
    transformResponse: [(data) => data],
  });

  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(response.data, {
      header: true,
      dynamicTyping: true,
      complete: (results: ParseResult<CSVRow>) => {
        let earthquakes: EarthquakeRecord[] =
          results.data.map(parseEarthquakeRow);

        // Apply sorting if sortBy is provided
        // This is currently being done on the client-side. In a backend scenario,
        // the backend would handle the sorting, likely using database queries.
        if (sortBy) {
          earthquakes.sort((a, b) => {
            const valA = a[sortBy as keyof EarthquakeRecord];
            const valB = b[sortBy as keyof EarthquakeRecord];
            if (valA === null || valB === null) {
              return 0; // Handle null values
            }
            if (typeof valA === 'string' && typeof valB === 'string') {
              return valA.localeCompare(valB);
            }
            if (typeof valA === 'number' && typeof valB === 'number') {
              return valA - valB;
            }
            // Handle other types if necessary
            return 0; // Default case
          });
        }

        // Apply limit if provided
        // Similar to sorting, in a backend scenario, the limit would ideally be applied
        // by the backend to reduce the amount of data sent to the client.
        if (filters?.limit !== undefined) {
          earthquakes = earthquakes.slice(0, filters.limit);
        }

        resolve(earthquakes);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};
