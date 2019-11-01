import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { Thumb } from '../Thumb';

export interface InstagramPreviewProps {
  thumb: string;
  title: string;
  size: 's' | 'm';
  notes?: Array<{
    content: string;
  }>;
}

const StyledInstagramPreviewWrapper = styled(View)`
  flex-direction: row;
  padding-bottom: 5px;
`;

interface DescriptionWrapperProps {
  size: InstagramPreviewProps['size'];
}

const StyledDescriptionWrapper = styled(View)`
  padding-left: 5px;
  ${({ size }: DescriptionWrapperProps) => (size === 's' ? 'max-width: 125px;' : 'max-width: auto;')}
`;

const StyledTitle = styled(Text)`
  font-size: 13px;
  padding-bottom: 5px;
`;

const StyledNote = styled(Text)`
  font-size: 11px;
  padding-bottom: 5px;
`;

export const InstagramPreview: React.FC<InstagramPreviewProps> = props => (
  <StyledInstagramPreviewWrapper>
    <Thumb url={props.thumb} />

    <StyledDescriptionWrapper size={props.size}>
      <StyledTitle>{props.title}</StyledTitle>

      {props.notes && props.notes.map(note => <StyledNote key={props.thumb}>{note.content}</StyledNote>)}
    </StyledDescriptionWrapper>
  </StyledInstagramPreviewWrapper>
);
