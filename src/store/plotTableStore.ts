import { create } from 'zustand';
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
  selectedRecords: T[];

  /**
   * Sets the selected earthquake record to highlight in the plot.
   * @param record - The earthquake record to select (optional).
   */
  setSelectedRecords: (record: T[]) => void;

  /**
   * Adds a single record to the array of selected records.
   * @param record - The earthquake record to add.
   */
  addSelectedRecord: (record: T) => void;

  /**
   * Removes a single record from the array of selected records based on a unique identifier.
   * You might need to adjust the identifier based on your record structure.
   * @param id - The unique identifier of the record to remove.
   */
  removeSelectedRecord: (id: string | number) => void;
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
  selectedRecords: [],

  /** Function to set the currently selected earthquake record to highlight in the plot. */
  setSelectedRecords: (records) => set({ selectedRecords: records }),

  /** Function to add a single record to the selected records array. */
  addSelectedRecord: (record) =>
    set((state) => ({ selectedRecords: [...state.selectedRecords, record] })),

  /** Function to remove a single record from the selected records array based on its ID. */
  removeSelectedRecord: (id) =>
    set((state) => ({
      selectedRecords: state.selectedRecords.filter(
        (r: any) => (r as any).id !== id, // Assuming your records have an 'id' property
      ),
    })),
}));
