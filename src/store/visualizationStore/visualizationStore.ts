// useVisualizationStore.ts
import { create } from 'zustand';
import { Dispatch, SetStateAction } from 'react';

/**
 * Defines the possible visualization panes.
 * This can be extended if more visualization types are added.
 */
export type VisualizationPane = 'plot' | 'map';

/**
 * Zustand store interface for managing the active visualization pane.
 */
interface VisualizationStore {
  currentPane: VisualizationPane; // The currently active visualization pane
  setCurrentPane: (pane: VisualizationPane) => void; // Function to set the active pane
}

/**
 * Zustand store for managing the active visualization pane.
 * This allows different parts of the application to control and react to
 * which visualization is currently displayed.
 */
export const useVisualizationStore = create<VisualizationStore>((set) => ({
  currentPane: 'map', // Default to showing the plot pane
  setCurrentPane: (pane) => set({ currentPane: pane }),
}));
