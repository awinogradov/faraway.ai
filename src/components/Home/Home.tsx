import React from 'react';

import { useQuery } from '../../utils/api';

const query = `{
  geoMaps {
    title
    description
  }
}`;

export const Home = () => {
  const { value } = useQuery<{ geoMaps: string[] }>(query);

  if (value) {
    return <div>Welcome to Faraway AI! API res is {JSON.stringify(value.geoMaps)}</div>;
  }

  return null;
};
