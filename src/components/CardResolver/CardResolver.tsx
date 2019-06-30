import React from 'react';
import useFetch from 'react-fetch-hook';
import { compose } from '@bem-react/core';

import { Card as CardBase } from '../Card/Card';
import { withStrategyInstagram } from '../Card/_strategy/Card_strategy_instagram';

const Card = compose(withStrategyInstagram)(CardBase);

export interface CardResolverProps {
  url: string;
}

export const CardResolver: React.FC<CardResolverProps> = props => {
  const { isLoading, data } = useFetch(`/parse`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: props.url,
    }),
    formatter: response => response.json(),
  });

  return isLoading ? <i>Loading...</i> : <Card {...data} />;
};
