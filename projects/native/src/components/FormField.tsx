import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const StyledFormField = styled(View)`
  height: 57px;

  display: flex;
  flex-direction: row;

  border-bottom-width: 1px;
  border-bottom-color: #efefef;
`;

const StyledLabel = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  line-height: 57px;

  width: 20%;
`;

const StyledControl = styled(View)`
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export interface FormFieldProps {
  label: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
  <StyledFormField>
    <StyledLabel>{label}</StyledLabel>
    <StyledControl>{children}</StyledControl>
  </StyledFormField>
);
