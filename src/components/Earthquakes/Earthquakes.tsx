import React, { useEffect } from 'react';
import { useEarthquakesQuery } from '@/services/earthquakes/earthquakesQuery';
import { useHighlightedEarthquakeContext } from '@/context/EarthquakeContext';
import PlotPane from './Panes/PlotPane/PlotPane';
import TablePane from './Panes/TablePane/TablePane';
import { EarthquakeRecord } from '@/types/earthquake';
import Loader from '../Loading/Loader';
import Error from '../Error/Error';
import Container from '../Layout/Container';

const Earthquakes = () => {
  const earthquakesQuery = useEarthquakesQuery();
  const { highlightedEarthquake, setHighlightedEarthquake } =
    useHighlightedEarthquakeContext();

  if (earthquakesQuery.isPending) {
    return (
      <Container className="py-6 space-y-6 flex space-x-4 justify-between">
        <Loader />
      </Container>
    );
  }

  if (earthquakesQuery.isError) {
    return (
      <Container>
        <Error />
        <div className="px-4 space-y-6 flex space-x-4 justify-between ">
          <PlotPane data={[]} />
          <TablePane data={[]} />
        </div>
      </Container>
    );
  }

  // Filter the data to get only the first 100 items - there is way too much data here
  const first100Earthquakes: EarthquakeRecord[] | undefined =
    earthquakesQuery.data?.slice(0, 100);

  return (
    <Container className="px-4 space-y-6 flex space-x-4 justify-between ">
      <PlotPane
        data={first100Earthquakes}
        highlighted={highlightedEarthquake}
        setHighlighted={setHighlightedEarthquake}
      />
      <TablePane
        data={first100Earthquakes}
        highlighted={highlightedEarthquake}
        setHighlighted={setHighlightedEarthquake}
      />
    </Container>
  );
};

export default Earthquakes;
