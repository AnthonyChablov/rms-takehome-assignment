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
interface PlotTableStore<T extends { id: string | number } = any> {
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

  /** The currently selected earthquake records (stored by ID in a Set for efficiency). */
  selectedRecords: Set<string | number | null>;

  /**
   * Sets the Set of selected earthquake record IDs.
   * @param records - The array of earthquake records to select. Their IDs will be extracted.
   */
  setSelectedRecords: (records: Set<string | number | null>) => void;

  /**
   * Adds a single record's ID to the Set of selected record IDs.
   * @param record - The earthquake record to add. Its ID will be extracted.
   */
  addSelectedRecord: (record: T) => void;

  /**
   * Removes a single record's ID from the Set of selected record IDs based on its ID.
   * @param id - The unique identifier of the record to remove.
   */
  removeSelectedRecord: (id: string | number) => void;

  /**
   * Checks if a record with the given ID is currently selected.
   * @param id - The ID of the record to check.
   * @returns True if the record is selected, false otherwise.
   */
  isRecordSelected: (id: string | number) => boolean;
}

/**
 * Zustand store hook to manage the state of the plot table for earthquake data visualization.
 *
 * This store manages:
 * - Filters for fetching earthquake data.
 * - Sorting logic for data based on the selected X-axis key.
 * - Axis key selection for both X and Y axes.
 * - Tracking and updating the selected earthquake record IDs for highlighting in the plot.
 *
 * @returns The store's state and methods for interacting with the plot table.
 */
export const usePlotTableStore = create<PlotTableStore>((set, get) => ({
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

  /** Initially, no record ID is selected. */
  selectedRecords: new Set<string | number | null>(),

  /** Function to set the currently selected earthquake records. */
  setSelectedRecords: (records) => set({ selectedRecords: new Set(records) }),

  /** Function to add a single record to the selected records set. */
  addSelectedRecord: (record) =>
    set((state) => {
      const newSelectedRecords = new Set(state.selectedRecords);
      newSelectedRecords.add((record as any).id);
      return { selectedRecords: newSelectedRecords };
    }),

  /** Function to remove a single record from the selected records set based on its ID. */
  removeSelectedRecord: (id) =>
    set((state) => {
      const newSelectedRecords = new Set(state.selectedRecords);
      newSelectedRecords.delete(id);
      return { selectedRecords: newSelectedRecords };
    }),

  /** Function to check if a record ID is currently in the Set of selected record IDs. */
  isRecordSelected: (id) => get().selectedRecords.has(id),
}));
