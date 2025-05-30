import React, { useState } from 'react';
import { useEarthquakesQuery } from '@/api/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthquakesContext';
import PaneLayout from './components/PaneLayout';
import { usePlotTableStore } from '@/store/plotTableStore/plotTableStore';
import { useVisualizationStore } from '@/store/visualizationStore/visualizationStore';

/**
 * Configuration object for pagination default values.
 */
const DEFAULT_PAGINATION_CONFIG = {
  INITIAL_CURRENT_PAGE: 1,
  INITIAL_ITEMS_PER_PAGE: 75,
};
/* Configuration for Pane Title */
const PANE_TITLE = 'USGS Most Recent Earthquakes';

/**
 * `Earthquakes` component fetches and displays recent earthquake data from the USGS API.
 * It provides an interactive visualization and a tabular view of the earthquake data.
 *
 * This component connects multiple parts of the application:
 * - **Context API**: Shares the highlighted earthquake state across components.
 * - **Zustand Store**: Manages the plot table's state, such as the selected record, X/Y axis keys, and filters.
 * - **Data Fetching**: Uses TanStack Query to fetch and cache earthquake data from the USGS API.
 *
 * The component passes the relevant data to the `PlotTableLayout` component, which is responsible for rendering the UI.
 *
 * @returns {JSX.Element} The Earthquakes component.
 */
const Earthquakes = () => {
  // --- Context API ---
  // Access the highlighted earthquake state and setter function from the context.
  const { highlightedEarthquake, setHighlightedEarthquake } =
    useHighlightedEarthquakeContext();

  // --- Zustand Store ---
  // Access the global state for managing the plot table.
  const {
    selectedRecords,
    setSelectedRecords,
    addSelectedRecord,
    removeSelectedRecord,
    isRecordSelected,
    xAxisKey,
    setXAxisKey,
    yAxisKey,
    setYAxisKey,
    filters,
  } = usePlotTableStore();
  // Access the global state for managing the data visualization features.
  const { currentPane, setCurrentPane } = useVisualizationStore();

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(
    DEFAULT_PAGINATION_CONFIG.INITIAL_CURRENT_PAGE,
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    DEFAULT_PAGINATION_CONFIG.INITIAL_ITEMS_PER_PAGE,
  );

  // --- Data Fetching ---
  // Fetch earthquake data using the `useEarthquakesQuery` hook.
  const updatedFilters = filters ? { ...filters, limit: undefined } : undefined;
  const earthquakesQuery = useEarthquakesQuery(updatedFilters, xAxisKey);
  const earthquakesData = earthquakesQuery.data || [];

  // Return the layout that integrates all components, passing down the relevant props.
  return (
    <PaneLayout
      isLoading={earthquakesQuery.isPending}
      isError={earthquakesQuery.isError}
      data={earthquakesData}
      xAxisKey={xAxisKey}
      setXAxisKey={setXAxisKey}
      yAxisKey={yAxisKey}
      setYAxisKey={setYAxisKey}
      highlighted={highlightedEarthquake}
      setHighlighted={setHighlightedEarthquake}
      selected={selectedRecords}
      setSelected={setSelectedRecords}
      addSelected={addSelectedRecord}
      removeSelected={removeSelectedRecord}
      isSelected={isRecordSelected}
      title={PANE_TITLE}
      // Pagination Props
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      // Visualization Features Props
      currentPane={currentPane}
      setCurrentPane={setCurrentPane}
    />
  );
};

export default Earthquakes;
