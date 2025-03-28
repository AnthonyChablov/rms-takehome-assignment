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
      <h1>Recent Earthquakes</h1>
      <ul>
        {earthquakesQuery.data.map((earthquake) => (
          <li key={earthquake.id}>
            Magnitude: {earthquake.mag}, Location: {earthquake.place}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Earthquakes;
