import React from 'react';
import { useEarthquakes } from '@/services/earthquakes/useEarthQuakes';

const Earthquakes = () => {
  const earthquakesQuery = useEarthquakes();

  if (earthquakesQuery.isPending) {
    return <>loading...</>;
  }

  if (earthquakesQuery.isError) {
    return <>Error!</>;
  }

  return (
    <>
      {earthquakesQuery.data.map((earthquake) => (
        <p key={earthquake.id}>{earthquake.dmin}</p>
      ))}
    </>
  );
};

export default Earthquakes;
