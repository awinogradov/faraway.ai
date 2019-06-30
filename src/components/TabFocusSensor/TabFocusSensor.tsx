import React, { useEffect } from 'react';

export interface TabFocusSensorProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

export const TabFocusSensor: React.FC<TabFocusSensorProps> = props => {
  const onFocus = () => {
    console.log('Tab in focus');
    props.onFocus && props.onFocus();
  };

  const onBlur = () => {
    console.log('Tab blurred');
    props.onBlur && props.onBlur();
  };


  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  });

  return <></>;
};
