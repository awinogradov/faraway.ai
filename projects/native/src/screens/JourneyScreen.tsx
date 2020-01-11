import React from 'react';

import { TravelPlan } from '../components/TravelPlan';
import { MainScreen } from '../components/MainScreen';

export const JourneyScreen: React.FC = () => {
  return (
    <MainScreen>
      <TravelPlan />
    </MainScreen>
  );
};
