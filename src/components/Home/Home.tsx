import React from 'react';
import { useState } from 'react';
import clipboard from 'clipboard-polyfill';
import isUrl from 'validator/lib/isURL';

import { TabFocusSensor } from '../TabFocusSensor/TabFocusSensor';
import { Card } from '../Card/Card';

export const Home = () => {
  const [validUrl, setValidUrl] = useState('');

  const onFocus = async () => {
    const inClipBoard = await clipboard.readText();

    isUrl(inClipBoard) && setValidUrl(inClipBoard);
  };

  return (
    <>
      <TabFocusSensor onFocus={onFocus}/>
      {validUrl && <Card url={validUrl} />}
    </>
  );
};
