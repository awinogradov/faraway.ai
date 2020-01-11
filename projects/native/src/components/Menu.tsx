/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View } from 'react-native';
// reference https://react-native-elements.github.io/react-native-elements/docs/listitem.html
import { ListItem } from 'react-native-elements';
import styled from 'styled-components/native';

export interface MenuItemProps {
  title: string;
  onPress: () => void;
}

export interface MenuProps {
  items: MenuItemProps[];
}

const StyledMenu = styled(View)``;

export const Menu: React.FC<MenuProps> = ({ items }) => (
  <StyledMenu>
    {items.map((item, i) => (
      <ListItem
        key={i}
        bottomDivider
        title={item.title}
        onPress={item.onPress}
        titleStyle={{ textAlign: 'center', fontFamily: 'Helvetica Neue', fontSize: 20, fontWeight: '500' }}
      />
    ))}
  </StyledMenu>
);
