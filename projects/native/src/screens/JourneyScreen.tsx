import React from 'react';

import { TravelPlan } from '../components/TravelPlan';
import { MainScreenView } from '../containers/MainScreenView';

export const JourneyScreen: React.FC = () => {
  return (
    <MainScreenView>
      <TravelPlan />
    </MainScreenView>
  );
};
