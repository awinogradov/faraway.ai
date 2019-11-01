import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

export interface ThumbProps {
  url: string;
}

export const Thumb: React.FC<ThumbProps> = props => <StyledImage source={{ uri: props.url }} />;
