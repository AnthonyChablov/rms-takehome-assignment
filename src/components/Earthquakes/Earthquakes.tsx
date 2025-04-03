import React from 'react';
import { useEarthquakesQuery } from '@/api/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthquakesContext';
import { usePlotTableStore } from '@/store/plotTableStore';
import PlotTableLayout from './components/PlotTablePaneLayout';
import { EarthquakeRecord } from '@/types/earthquake';

/**
 * Fetches and displays a list of recent earthquakes from the USGS API.
 * Provides interactive visualization and a tabular view of the data.
 */
const Earthquakes = () => {
  // --- Context API ---
  // Accesses the highlighted earthquake record and the setter function from the context.
  // This allows child components (PlotPane and TablePane) to communicate
  // and highlight the same earthquake record.
  const { highlightedEarthquake, setHighlightedEarthquake } =
    useHighlightedEarthquakeContext();

  // --- Zustand Store ---
  // Accesses the global state for the plot table, including the selected record
  // and the keys used for the X and Y axes of the plot.
  const {
    selectedRecord,
    setSelectedRecord,
    xAxisKey,
    setXAxisKey,
    yAxisKey,
    setYAxisKey,
    filters, // filters are used to fetch the data
  } = usePlotTableStore();

  // --- Data Fetching ---
  // Fetches earthquake data using TanStack Query.
  // The query automatically handles caching and background updates.
  // Data source: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv
  const earthquakesQuery = useEarthquakesQuery(filters, xAxisKey);
  // The query is dependent on the filters and xAxisKey, which are used to sort the data.
  // The data is fetched from the USGS API and parsed into a structured format.

  return (
    <PlotTableLayout<EarthquakeRecord>
      isLoading={earthquakesQuery.isPending}
      isError={earthquakesQuery.isError}
      data={earthquakesQuery.data || []}
      xAxisKey={xAxisKey}
      setXAxisKey={setXAxisKey}
      yAxisKey={yAxisKey}
      setYAxisKey={setYAxisKey}
      highlighted={highlightedEarthquake}
      setHighlighted={setHighlightedEarthquake}
      selected={selectedRecord}
      setSelected={setSelectedRecord}
      title="USGS Most Recent Earthquakes (Top 100)"
    />
  );
};

export default Earthquakes;
