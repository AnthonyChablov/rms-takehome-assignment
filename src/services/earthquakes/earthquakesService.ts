import axios from 'axios';
import { RawEarthquake } from '@/types/earthquake';
import Papa, { ParseResult } from 'papaparse';
import { CSVRow } from '@/types/csvRow';
import { parseEarthquakeRow } from './earthquakeParser';

const BASE_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const axiosInstance = axios.create({
  baseURL: PROXY_URL + BASE_URL,
  withCredentials: false,
});

export const getEarthquakes = async (): Promise<RawEarthquake[]> => {
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
        const earthquakes: RawEarthquake[] =
          results.data.map(parseEarthquakeRow);
        resolve(earthquakes);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};
