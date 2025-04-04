import React from 'react';
import { useEarthquakesQuery } from '@/api/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthquakesContext';
import { usePlotTableStore } from '@/store/plotTableStore';
import PlotTableLayout from './components/PlotTablePaneLayout';

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
  // This allows the user to highlight and select a specific earthquake record,
  // which is shared between the PlotPane and TablePane components.
  const { highlightedEarthquake, setHighlightedEarthquake } =
    useHighlightedEarthquakeContext();

  // --- Zustand Store ---
  // Access the global state for managing the plot table.
  // - `selectedRecord`: The currently selected earthquake record.
  // - `xAxisKey`, `yAxisKey`: Keys representing the X and Y axes of the plot.
  // - `setSelectedRecord`, `setXAxisKey`, `setYAxisKey`: Functions to update these values.
  const {
    selectedRecord,
    setSelectedRecord,
    xAxisKey,
    setXAxisKey,
    yAxisKey,
    setYAxisKey,
    filters, // The filters used for fetching data from the API.
  } = usePlotTableStore();

  // --- Data Fetching ---
  // Use the `useEarthquakesQuery` hook to fetch earthquake data based on the provided filters and X axis key.
  // The query handles caching and background updates automatically.
  // Data is fetched from the USGS earthquake feed and parsed into a structured format.
  const earthquakesQuery = useEarthquakesQuery(filters, xAxisKey);

  // Return the layout that integrates all components, passing down the relevant props.
  return (
    <PlotTableLayout
      // Pass loading and error states from the data fetching query.
      isLoading={earthquakesQuery.isPending}
      isError={earthquakesQuery.isError}
      // Pass the fetched data, defaulting to an empty array if no data is available.
      data={earthquakesQuery.data || []}
      // Pass X/Y axis keys and setter functions to allow updating the plot axes.
      xAxisKey={xAxisKey}
      setXAxisKey={setXAxisKey}
      yAxisKey={yAxisKey}
      setYAxisKey={setYAxisKey}
      // Pass the highlighted earthquake record and its setter function to synchronize the state.
      highlighted={highlightedEarthquake}
      setHighlighted={setHighlightedEarthquake}
      // Pass the selected earthquake record and its setter function.
      selected={selectedRecord}
      setSelected={setSelectedRecord}
      // Set the title for the layout.
      title="USGS Most Recent Earthquakes (Top 100)"
    />
  );
};

export default Earthquakes;
