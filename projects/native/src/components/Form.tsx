import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const StyledForm = styled(View)``;

export const Form: React.FC = ({ children }) => <StyledForm>{children}</StyledForm>;
