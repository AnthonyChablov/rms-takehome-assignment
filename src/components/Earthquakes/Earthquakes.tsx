import React from 'react';
import { useEarthquakesQuery } from '@/api/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthquakesContext';
import PlotPane from './components/PlotPane/PlotPane';
import TablePane from './components/TablePane/TablePane';
import Loader from '../Loading/Loading';
import Error from '../Error/Error';
import Container from '../Layout/Container';
import { usePlotTableStore } from '@/store/plotTableStore';

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

  // --- Loading State ---
  // Displays a loader while the earthquake data is being fetched.
  if (earthquakesQuery.isPending) {
    return (
      <div data-testid="earthquakes-layout">
        <Container className="py-6 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between">
          <Loader />
        </Container>
      </div>
    );
  }

  // --- Error State ---
  // Displays an error message and empty panes if the data fetching fails.
  if (earthquakesQuery.isError) {
    return (
      <div data-testid="earthquakes-layout">
        <Container>
          <Error />
          <div className="px-4 space-y-6 flex flex-col lg:flex-row space-x-4 justify-between ">
            <PlotPane
              data={[]}
              xAxisKey={xAxisKey}
              setXAxisKey={setXAxisKey}
              yAxisKey={yAxisKey}
              setYAxisKey={setYAxisKey}
              selected={selectedRecord}
              setSelected={setSelectedRecord}
            />
            <TablePane data={[]} />
          </div>
        </Container>
      </div>
    );
  }

  // --- Success State ---
  // Renders the PlotPane and TablePane components with the fetched earthquake data.
  return (
    <div data-testid="earthquakes-layout">
      <Container className="px-4 space-y-6 flex flex-col lg:flex-row  space-x-4 justify-between ">
        <PlotPane
          data={earthquakesQuery.data}
          xAxisKey={xAxisKey}
          setXAxisKey={setXAxisKey}
          yAxisKey={yAxisKey}
          setYAxisKey={setYAxisKey}
          highlighted={highlightedEarthquake}
          setHighlighted={setHighlightedEarthquake}
          selected={selectedRecord}
          setSelected={setSelectedRecord}
        />
        <TablePane
          title={'USGS Most Recent Earthquakes (Top 100)'}
          xAxisKey={xAxisKey}
          setXAxisKey={setXAxisKey}
          yAxisKey={yAxisKey}
          setYAxisKey={setYAxisKey}
          data={earthquakesQuery.data}
          highlighted={highlightedEarthquake}
          setHighlighted={setHighlightedEarthquake}
          selected={selectedRecord}
          setSelected={setSelectedRecord}
        />
      </Container>
    </div>
  );
};

export default Earthquakes;
