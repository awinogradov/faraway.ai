import React, { useEffect } from 'react';

export interface TabFocusSensorProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

export const TabFocusSensor: React.FC<TabFocusSensorProps> = props => {
  const onFocus = () => {
    props.onFocus && props.onFocus();
  };

  const onBlur = () => {
    props.onBlur && props.onBlur();
  };

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  });

  return <></>;
};
