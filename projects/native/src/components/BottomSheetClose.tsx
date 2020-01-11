import React from 'react';

import IconClose from './Icon/_view/Icon_view_close.svg';

export interface BottomSheetCloseProps {
  onPress: () => void;
}

export const BottomSheetClose: React.FC<BottomSheetCloseProps> = ({ onPress }) => (
  <IconClose width={32} height={32} onPress={onPress} />
);
