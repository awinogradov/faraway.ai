import React from 'react';
import useFetch from 'react-fetch-hook';

export interface CardProps {
  url: string;
}

export const Card: React.FC<CardProps> = props => {
  const { isLoading, data } = useFetch(`/parse`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: props.url,
    }),
    formatter: response => response.json()
  });

  return isLoading ? <i>Loading...</i> : (
    <div>{props.url} {JSON.stringify(data)}</div>
  );
};
