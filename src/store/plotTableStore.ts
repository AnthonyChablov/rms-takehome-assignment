import { create } from 'zustand';

interface PlotTableState<T = any> {
  xAxisKey: string | null;
  setXAxisKey: (key: string | null) => void;
  yAxisKey: string | null;
  setYAxisKey: (key: string | null) => void;
  highlightedRecord: T | null;
  setHighlightedRecord: (record: T | null) => void;
}

export const usePlotTableStore = create<PlotTableState>((set) => ({
  xAxisKey: 'latitude',
  setXAxisKey: (key) => set({ xAxisKey: key }),
  yAxisKey: 'longitude',
  setYAxisKey: (key) => set({ yAxisKey: key }),
  highlightedRecord: null,
  setHighlightedRecord: (record) => set({ highlightedRecord: record }),
}));
