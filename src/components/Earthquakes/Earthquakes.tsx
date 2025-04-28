import React, { useState } from 'react';
import { useEarthquakesQuery } from '@/api/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthquakesContext';
import { usePlotTableStore } from '@/store/plotTableStore';
import PlotTableLayout from './components/PlotTablePaneLayout';

/**
 * Configuration object for pagination default values.
 */
const DEFAULT_PAGINATION_CONFIG = {
  INITIAL_CURRENT_PAGE: 1,
  INITIAL_ITEMS_PER_PAGE: 75,
};

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
    <PlotTableLayout
      // Pass loading and error states from the data fetching query.
      isLoading={earthquakesQuery.isPending}
      isError={earthquakesQuery.isError}
      // Pass the fetched data, defaulting to an empty array if no data is available.
      data={earthquakesData}
      // Pass X/Y axis keys and setter functions to allow updating the plot axes.
      xAxisKey={xAxisKey}
      setXAxisKey={setXAxisKey}
      yAxisKey={yAxisKey}
      setYAxisKey={setYAxisKey}
      // Pass the highlighted earthquake record and its setter function to synchronize the state.
      highlighted={highlightedEarthquake}
      setHighlighted={setHighlightedEarthquake}
      // Pass the selected earthquake record and its setter function.
      selected={selectedRecords}
      setSelected={setSelectedRecords}
      addSelected={addSelectedRecord}
      removeSelected={removeSelectedRecord}
      isSelected={isRecordSelected}
      // Set the title for the layout.
      title="USGS Most Recent Earthquakes"
      // Pagination Props
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
    />
  );
};

export default Earthquakes;
