// src/utils/fetchUtils.ts
import axios from 'axios';

// Optional: Create a single reusable Axios instance if you make multiple calls
// const axiosInstance = axios.create({ withCredentials: false });

/**
 * Fetches raw text data (like CSV) from a given URL.
 * @param url - The URL to fetch from.
 * @returns A promise that resolves to the raw text response.
 * @throws Throws an error if the fetch request fails.
 */
export const fetchData = async (url: string): Promise<string> => {
  try {
    // Use a local instance or a shared one if created above
    const response = await axios.get<string>(url, {
      // Important for fetching plain text/CSV correctly
      headers: { Accept: 'text/csv, text/plain, */*' },
      // Prevent Axios from trying to parse JSON
      transformResponse: [(data) => data],
      // Ensure credentials (like cookies) are not sent, usually not needed for public data
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    // Re-throw the error so it can be caught by the caller (e.g., TanStack Query)
    throw new Error(
      `Failed to fetch data from ${url}. ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
