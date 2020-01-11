import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const StyledWrapperContainer = styled(View)``;

const StyledActionsContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 30px;
  padding-bottom: 34px;
`;

export const BottomSheetActions: React.FC = ({ children }) => (
  <StyledWrapperContainer>
    <StyledActionsContainer>{children}</StyledActionsContainer>
  </StyledWrapperContainer>
);
