import React from 'react';
import { useEarthquakes } from '@/services/earthquakes/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthquakeContext';
import PlotPane from './Panes/PlotPane/PlotPane';
import TablePane from './Panes/TablePane/TablePane';
import { EarthquakeRecord } from '@/types/earthquake';
import Loader from '../Loading/Loader';
import Error from '../Error/Error';

const Earthquakes = () => {
  const earthquakesQuery = useEarthquakes();
  const { highlightedEarthquake, setHighlightedEarthquake } =
    useHighlightedEarthquakeContext();

  if (earthquakesQuery.isPending) {
    return (
      <div className="p-10 space-y-6">
        <Loader />
      </div>
    );
  }

  if (earthquakesQuery.isError) {
    return (
      <div className="">
        <Error />
        <div className="p-10 space-y-6">
          <PlotPane data={[]} />
          <TablePane data={[]} />
        </div>
      </div>
    );
  }

  // Filter the data to get only the first 100 items
  const first100Earthquakes: EarthquakeRecord[] | undefined =
    earthquakesQuery.data?.slice(0, 100);

  return (
    <div className="px-4 space-y-6 flex space-x-4 justify-between ">
      <PlotPane data={first100Earthquakes} />
      <TablePane data={first100Earthquakes} />
    </div>
  );
};

export default Earthquakes;
