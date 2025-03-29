import React from 'react';
import { useEarthquakes } from '@/services/earthquakes/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthQuakeContext';
import PlotPane from './Panes/PlotPane/PlotPane';
import TablePane from './Panes/TablePane/TablePane';
import { RawEarthquake } from '@/types/earthquake';

const Earthquakes = () => {
  const earthquakesQuery = useEarthquakes();
  const { highlightedEarthquake, setHighlightedEarthquake } =
    useHighlightedEarthquakeContext();

  if (earthquakesQuery.isPending) {
    return <div className="p-10 space-y-4">loading...</div>;
  }

  if (earthquakesQuery.isError) {
    return <div className="p-10 space-y-4">Error!</div>;
  }

  // Filter the data to get only the first 100 items
  const first100Earthquakes: RawEarthquake[] | undefined =
    earthquakesQuery.data?.slice(0, 100);

  return (
    <div className="p-10 space-y-4">
      <PlotPane data={first100Earthquakes} />
      <TablePane data={first100Earthquakes} />
    </div>
  );
};

export default Earthquakes;
