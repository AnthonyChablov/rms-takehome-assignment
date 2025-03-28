import React from 'react';
import { useEarthquakes } from '@/services/earthquakes/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthQuakeContext';
import PlotPane from './Panes/PlotPane/PlotPane';
import TablePane from './Panes/TablePane/TablePane';

const Earthquakes = () => {
  const earthquakesQuery = useEarthquakes();
  const { highlightedEarthquake, setHighlightedEarthquake } =
    useHighlightedEarthquakeContext();

  if (earthquakesQuery.isPending) {
    return <>loading...</>;
  }

  if (earthquakesQuery.isError) {
    return <>Error!</>;
  }

  return (
    <div className="w-full flex">
      <PlotPane data={earthquakesQuery.data} />
      <TablePane />
    </div>
  );
};

export default Earthquakes;
