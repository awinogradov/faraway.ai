import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BS from 'reanimated-bottom-sheet';
import styled from 'styled-components';

import { closeBottomSheet } from '../providers/redux/actions/app';
import { GlobalState } from '../providers/redux/store';
import { bottomSheetComponentsRegistry, allowedSnaps } from '../providers/navigation';

export interface BottomSheetProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forwardRef: (ref: any) => void;
}

const Container = styled(View)`
  padding-top: 20px;
`;

const ShadowWrapper = styled(View)`
  padding-top: 10px;

  border-top-left-radius: 20;
  border-top-right-radius: 20;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  background: #fff;
  height: 300px;
`;

const ComponentContainer = styled(View)`
  padding-top: 20px;
`;

const DraggableContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DraggablePlace = styled(View)`
  height: 4px;
  width: 100px;

  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Draggable = () => (
  <DraggableContainer>
    <DraggablePlace />
  </DraggableContainer>
);

export const BottomSheet: React.FC<BottomSheetProps> = props => {
  const dispatch = useDispatch();
  const sheetSettings = useSelector((state: GlobalState) => state.app.bottomSheet);

  const Component = sheetSettings.component ? bottomSheetComponentsRegistry[sheetSettings.component] : () => null;
  const onClose = () => {
    if (sheetSettings.visible) {
      dispatch(closeBottomSheet());
    }
  };

  return (
    <BS
      ref={props.forwardRef}
      enabledGestureInteraction={false}
      snapPoints={allowedSnaps}
      initialSnap={0}
      renderContent={() => (
        <Container>
          <ShadowWrapper>
            <Draggable />

            <ComponentContainer>
              <Component />
            </ComponentContainer>
          </ShadowWrapper>
        </Container>
      )}
      onCloseEnd={onClose}
    />
  );
};
