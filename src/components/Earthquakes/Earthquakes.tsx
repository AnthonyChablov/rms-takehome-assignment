import React from 'react';
import { useEarthquakes } from '@/services/earthquakes/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthQuakeContext';
import PlotPane from './Panes/PlotPane/PlotPane';

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
    <div>
      <PlotPane data={earthquakesQuery.data} />
    </div>
  );
};

export default Earthquakes;
