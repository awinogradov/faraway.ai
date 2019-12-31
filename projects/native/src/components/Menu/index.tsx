/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View } from 'react-native';
// reference https://react-native-elements.github.io/react-native-elements/docs/listitem.html
import { ListItem } from 'react-native-elements';
import styled from 'styled-components/native';

import IconClose from '../Icon/_view/Icon_view_close.svg';

export interface MenuItemProps {
  title: string;
  onPress: () => void;
}

export interface MenuProps {
  items: MenuItemProps[];
  onClose: () => void;
}

const StyledMenuContainer = styled(View)`
  padding: 0 20px;
`;

const StyledActionsContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 30px;
  height: 74px;
`;

export const Menu: React.FC<MenuProps> = ({ items, onClose }) => (
  <StyledMenuContainer>
    {items.map((item, i) => (
      <ListItem
        key={i}
        bottomDivider
        title={item.title}
        onPress={item.onPress}
        titleStyle={{ textAlign: 'center', fontFamily: 'Helvetica Neue', fontSize: 20, fontWeight: '500' }}
      />
    ))}

    <StyledActionsContainer>
      <IconClose width={32} height={32} onPress={onClose} />
    </StyledActionsContainer>
  </StyledMenuContainer>
);
