import React from 'react';
import { withBemMod } from '@bem-react/core';

import { cnCard } from '../Card.const';

export interface CardStrategyInstagramProps {
  strategy?: 'instagram';
  image?: string;
}

export const withStrategyInstagram = withBemMod<CardStrategyInstagramProps>(
  cnCard(),
  { strategy: 'instagram' },
  Card => props => (
    <Card {...props}>
      <img className={cnCard('Image')} src={props.image} width="300px" />
      {JSON.stringify(props)}
    </Card>
  ));
