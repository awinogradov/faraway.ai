import React from 'react';
import { Input as BaseInput, InputProps } from 'react-native-elements';

export const Input: React.FC<InputProps> = props => (
  <BaseInput inputContainerStyle={{ borderColor: '#fff' }} {...props} />
);
