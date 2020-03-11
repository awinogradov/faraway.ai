import React from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';

const StyledImage = styled(Image)`
  width: 135px;
  height: 170px;
  border-radius: 5px;
`;

const StyledView = styled(View)`
  width: 135px;
  height: 170px;
  border-radius: 5px;
  background-color: #fcfcfc;
`;

export interface PointCoverProps {
  url?: string;
}

export const PointCover: React.FC<PointCoverProps> = props =>
  props.url ? <StyledImage source={{ uri: props.url }} /> : <StyledView />;
