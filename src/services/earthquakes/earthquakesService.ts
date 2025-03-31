import axios from 'axios';
import { EarthquakeRecord } from '@/types/earthquake';
import Papa, { ParseResult } from 'papaparse';
import { CSVRow } from '@/types/csvRow';
import { parseEarthquakeRow } from './utils/earthquakeParser';

const BASE_URL: string =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const MAX_EARTHQUAKES = 100;

// Determine the appropriate URL based on the environment
const url =
  process.env.NODE_ENV === 'development' ? PROXY_URL + BASE_URL : BASE_URL;

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: false,
});

export const getEarthquakes = async (): Promise<EarthquakeRecord[]> => {
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
        const earthquakes: EarthquakeRecord[] = results.data
          .map(parseEarthquakeRow)
          .slice(0, MAX_EARTHQUAKES); // Filter Only the first x items
        resolve(earthquakes);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};
