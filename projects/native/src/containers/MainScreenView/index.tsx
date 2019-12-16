import React from 'react';
import styled from 'styled-components/native';

import AddScreen from '../../screens/Add';
import { Bar } from '../Bar';

const StyledView = styled.View`
  padding: 40px 0 0 20px;
  background: #fff;
`;

export const MainScreenView: React.FC = props => (
  <StyledView>
    <Bar />

    <AddScreen />

    {props.children}
  </StyledView>
);
