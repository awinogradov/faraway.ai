import React from 'react';
import clipboard from 'clipboard-polyfill';

import { TabFocusSensor } from '../TabFocusSensor/TabFocusSensor';

export const Home = () => {
  const onFocus = async () => {
    const inClipBoard = await clipboard.readText();
    console.log(inClipBoard);
  };

  return (
    <>
      <TabFocusSensor onFocus={onFocus}/>
      <div>Welcome to Faraway AI!</div>
    </>
  );
};
