import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const StyledWrapper = styled(View)`
  position: relative;

  padding: 0 20px;

  background: #fff;
`;

export const BottomSheetMenuScreen: React.FC = ({ children }) => <StyledWrapper>{children}</StyledWrapper>;
