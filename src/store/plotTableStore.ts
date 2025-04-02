import { create } from 'zustand';
import { EarthquakeRecord } from '@/types/earthquake';
import { GetEarthQuakesFilters } from '@/api/earthquakes/earthquakesApi';

// Create a global store (using Zustand, for example) to maintain state such as selected or filtered records.
// Use this store to update the highlighted record when interacting with the table or plot.
interface PlotTableStore<T = any> {
  filters: GetEarthQuakesFilters | undefined;
  setFilters: (filters?: GetEarthQuakesFilters) => void;
  // Define the sorted data for the plot
  sortedData: T[] | undefined;
  setSortedData: (data: T[] | undefined, xAxisKey: string | null) => void;
  // Define the keys for the X and Y axes of the plot
  // These keys will be used to determine which data points to plot on the axes
  xAxisKey: string | null;
  setXAxisKey: (key: string | null) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string | null) => void;
  // Define the selected record for the plot
  // This record will be highlighted in the plot when selected
  selectedRecord: T | null;
  setSelectedRecord: (record: T | null) => void;
}

// Create a Zustand store to manage the state of the plot table
export const usePlotTableStore = create<PlotTableStore>((set) => ({
  filters: { limit: 100 }, // Default filters for fetching data
  setFilters: (filters) => set({ filters }),
  xAxisKey: 'latitude',
  setXAxisKey: (key) => set({ xAxisKey: key }),
  yAxisKey: 'longitude',
  setYAxisKey: (key) => set({ yAxisKey: key }),
  selectedRecord: null,
  setSelectedRecord: (record) => set({ selectedRecord: record }),
  sortedData: undefined,
  // Implement the setter for sortedData
  setSortedData: (data, xAxisKey) => {
    if (data && xAxisKey) {
      const sorted = [...data].sort((a, b) => {
        // Assuming xAxisKey corresponds to a number
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
