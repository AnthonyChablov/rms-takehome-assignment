// useVisualizationStore.ts
import { create } from 'zustand';

/**
 * Defines the possible visualization panes.
 * This can be extended if more visualization types are added.
 */
type VisualizationPane = 'plot' | 'map';

/**
 * Zustand store interface for managing the active visualization pane.
 */
interface VisualizationStore {
  currentPane: VisualizationPane; // The currently active visualization pane
  setPane: (pane: VisualizationPane) => void; // Function to set the active pane
}

/**
 * Zustand store for managing the active visualization pane.
 * This allows different parts of the application to control and react to
 * which visualization is currently displayed.
 */
export const useVisualizationStore = create<VisualizationStore>((set) => ({
  currentPane: 'plot', // Default to showing the plot pane
  setPane: (pane) => set({ currentPane: pane }),
}));
