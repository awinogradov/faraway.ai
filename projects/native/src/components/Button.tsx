import React from 'react';
import { Button as BaseButton, ButtonProps as BaseButtonProps } from 'react-native-elements';

export interface ButtonProps extends BaseButtonProps {
  view: 'action' | 'clear' | 'outline';
}

const commonButtonStyles: BaseButtonProps['buttonStyle'] = {
  minWidth: '100%',
  height: 54,
  borderRadius: 14,
};

const commonTitleStyles: BaseButtonProps['titleStyle'] = {
  fontSize: 20,
};

const ButtonViewAction: React.FC<BaseButtonProps> = props => (
  <BaseButton
    buttonStyle={{
      ...commonButtonStyles,
      backgroundColor: '#000',
    }}
    titleStyle={{
      ...commonTitleStyles,
      color: '#fff',
      fontWeight: '500',
    }}
    {...props}
  />
);
const ButtonViewClear: React.FC<BaseButtonProps> = props => (
  <BaseButton
    type="clear"
    buttonStyle={{
      ...commonButtonStyles,
    }}
    titleStyle={{
      ...commonTitleStyles,
      color: '#000',
    }}
    {...props}
  />
);
const ButtonViewOutline: React.FC<BaseButtonProps> = props => <BaseButton buttonStyle={{}} {...props} />;

const ButtonViewMap: Record<ButtonProps['view'], React.ComponentType<BaseButtonProps>> = {
  action: ButtonViewAction,
  clear: ButtonViewClear,
  outline: ButtonViewOutline,
};

export const Button: React.FC<ButtonProps> = ({ view, ...props }) => {
  const ButtonView = ButtonViewMap[view];
  return <ButtonView {...props} />;
};
