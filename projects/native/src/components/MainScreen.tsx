import React from 'react';
import styled from 'styled-components/native';

const StyledView = styled.View`
  padding: 40px 0 0 20px;
`;

export const MainScreen: React.FC = props => <StyledView>{props.children}</StyledView>;
