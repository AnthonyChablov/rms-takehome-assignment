import { create } from 'zustand';
import { EarthquakeRecord } from '@/types/earthquake';

// Create a global store (using Zustand, for example) to maintain state such as selected or filtered records.
// Use this store to update the highlighted record when interacting with the table or plot.
interface PlotTableState<T = any> {
  xAxisKey: string | null;
  setXAxisKey: (key: string | null) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string | null) => void;
  selectedRecord: T | null;
  setSelectedRecord: (record: T | null) => void;
}

// Create a Zustand store to manage the state of the plot table
export const usePlotTableStore = create<PlotTableState>((set) => ({
  xAxisKey: 'latitude',
  setXAxisKey: (key) => set({ xAxisKey: key }),
  yAxisKey: 'longitude',
  setYAxisKey: (key) => set({ yAxisKey: key }),
  selectedRecord: null,
  setSelectedRecord: (record) => set({ selectedRecord: record }),
}));
