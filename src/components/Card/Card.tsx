import React from 'react';
import { IClassNameProps } from '@bem-react/core';

import { cnCard } from './Card.const';

export interface CardProps extends IClassNameProps {
  strategy: string;
}

export const Card: React.FC<CardProps> = props =>
  <div className={cnCard(null, [props.className])}>
    {props.children || 'UNIMPLEMENTED'}
  </div>;
