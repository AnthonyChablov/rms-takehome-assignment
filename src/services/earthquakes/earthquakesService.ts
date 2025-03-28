import { RawEarthquake  } from '../../types/earthquake';
import axios from 'axios';

const BASE_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/';
const axiosInstance = axios.create({baseURL: BASE_URL});

export const getEarthquakes = async () => {
  return (await axiosInstance.get<RawEarthquake []>('earthquakes')).data;
};
