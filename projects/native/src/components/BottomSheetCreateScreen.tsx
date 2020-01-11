import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const StyledWrapper = styled(View)`
  position: relative;

  padding: 0 20px;

  background: #fff;
`;

const StyledTitle = styled(Text)`
  font-size: 22px;
  font-weight: 600;

  line-height: 40px;
`;

export interface BottomSheetCreateScreenProps {
  title: string;
}

export const BottomSheetCreateScreen: React.FC<BottomSheetCreateScreenProps> = ({ title, children }) => (
  <StyledWrapper>
    <StyledTitle>{title}</StyledTitle>

    {children}
  </StyledWrapper>
);
