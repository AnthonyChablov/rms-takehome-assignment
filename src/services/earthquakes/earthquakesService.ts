import axios from 'axios';
import { EarthquakeRecord } from '@/types/earthquake';
import Papa, { ParseResult } from 'papaparse';
import { CSVRow } from '@/types/csvRow';
import { parseEarthquakeRow } from './utils/earthquakeParser';

const BASE_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const axiosInstance = axios.create({
  baseURL: PROXY_URL + BASE_URL,
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
          .slice(0, 100); // Filter the data to get only the first 100 items - there is way too much data here
        resolve(earthquakes);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};
