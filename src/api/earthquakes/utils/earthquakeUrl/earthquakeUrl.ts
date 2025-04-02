const BASE_URL: string =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv';
// WARNING: cors-anywhere is a public proxy often rate-limited or down.
// Consider alternatives for development or setting up your own proxy.
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'; // Use with caution!

/**
 * Determines the appropriate API URL based on the environment.
 * Prefixes with a CORS proxy in development to avoid CORS issues.
 * @returns The URL string to fetch data from.
 */
export const getEarthquakeApiUrl = (): string => {
  // In production, directly use BASE_URL.
  // In development, use the proxy to bypass CORS restrictions for localhost.
  // NOTE: Ensure process.env.NODE_ENV is correctly configured in your build process (e.g., Vite, Webpack).
  const isDevelopment = process.env.NODE_ENV === 'development';
  console.log(
    `Running in ${isDevelopment ? 'development' : 'production'} mode. Using URL: ${isDevelopment ? PROXY_URL + BASE_URL : BASE_URL}`,
  );
  return isDevelopment ? PROXY_URL + BASE_URL : BASE_URL;
};
