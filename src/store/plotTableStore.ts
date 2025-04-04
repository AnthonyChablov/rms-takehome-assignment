import { create } from 'zustand';
import { EarthquakeRecord } from '@/types/earthquake';
import { GetEarthQuakesFilters } from '@/api/earthquakesApi';

/**
 * Zustand store interface for managing the state of the plot table,
 * including earthquake data filters, sorting, axis keys, and the selected record.
 *
 * This store enables the interaction and visualization of earthquake data
 * on a plot or table, supporting filtering, sorting, and axis manipulation.
 *
 * @template T - The type of the earthquake data (e.g., `EarthquakeRecord`).
 */
interface PlotTableStore<T = any> {
  /** The current filters applied to the earthquake data (e.g., limit, date range). */
  filters: GetEarthQuakesFilters | undefined;

  /**
   * Sets or updates the filters for fetching earthquake data.
   * @param filters - The new filters to apply (optional).
   */
  setFilters: (filters?: GetEarthQuakesFilters) => void;

  /** The earthquake data, sorted according to the selected X-axis key. */
  sortedData: T[] | undefined;

  /**
   * Sets the sorted earthquake data based on the X-axis key.
   * @param data - The earthquake data to be sorted.
   * @param xAxisKey - The key used to sort the data (corresponds to a field in the data).
   */
  setSortedData: (data: T[] | undefined, xAxisKey: string | null) => void;

  /** The key determining the data to be displayed on the X-axis of the plot. */
  xAxisKey: string | null;

  /**
   * Sets the key for the X-axis.
   * @param key - The key to be displayed on the X-axis.
   */
  setXAxisKey: (key: string | null) => void;

  /** The key determining the data to be displayed on the Y-axis of the plot. */
  yAxisKey: string | null;

  /**
   * Sets the key for the Y-axis.
   * @param key - The key to be displayed on the Y-axis.
   */
  setYAxisKey: (key: string | null) => void;

  /** The currently selected earthquake record, which will be highlighted on the plot. */
  selectedRecord: T | null;

  /**
   * Sets the selected earthquake record to highlight in the plot.
   * @param record - The earthquake record to select (optional).
   */
  setSelectedRecord: (record: T | null) => void;
}

/**
 * Zustand store hook to manage the state of the plot table for earthquake data visualization.
 *
 * This store manages:
 * - Filters for fetching earthquake data.
 * - Sorting logic for data based on the selected X-axis key.
 * - Axis key selection for both X and Y axes.
 * - Tracking and updating the selected earthquake record for highlighting in the plot.
 *
 * @returns The store's state and methods for interacting with the plot table.
 */
export const usePlotTableStore = create<PlotTableStore>((set) => ({
  /** Default filters for earthquake data (e.g., limit of 100 records). */
  filters: { limit: 100 },

  /** Function to update the current filters applied to the earthquake data. */
  setFilters: (filters) => set({ filters }),

  /** Default key for the X-axis (latitude for plotting data on X-axis). */
  xAxisKey: 'latitude',

  /** Function to set a custom key for the X-axis. */
  setXAxisKey: (key) => set({ xAxisKey: key }),

  /** Default key for the Y-axis (longitude for plotting data on Y-axis). */
  yAxisKey: 'longitude',

  /** Function to set a custom key for the Y-axis. */
  setYAxisKey: (key) => set({ yAxisKey: key }),

  /** Initially, no record is selected. */
  selectedRecord: null,

  /** Function to set the currently selected earthquake record to highlight in the plot. */
  setSelectedRecord: (record) => set({ selectedRecord: record }),

  /** Sorted earthquake data based on the selected X-axis key. */
  sortedData: undefined,

  /**
   * Function to sort the earthquake data based on the specified X-axis key.
   * If the X-axis key is defined, the data is sorted numerically by the value of that key.
   * If no data or axis key is provided, the sorted data is set to the original (unsorted) data.
   *
   * @param data - The earthquake data to sort.
   * @param xAxisKey - The key used to sort the data (corresponds to a field in the data).
   */
  setSortedData: (data, xAxisKey) => {
    if (data && xAxisKey) {
      // Sorting data based on the X-axis key value (numerically)
      const sorted = [...data].sort((a, b) => {
        const valA = a[xAxisKey] as number;
        const valB = b[xAxisKey] as number;
        return valA - valB;
      });
      set({ sortedData: sorted });
    } else {
      set({ sortedData: data });
    }
  },
}));
