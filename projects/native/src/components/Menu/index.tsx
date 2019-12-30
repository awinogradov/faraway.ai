/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Dimensions } from 'react-native';
// reference https://react-native-elements.github.io/react-native-elements/docs/listitem.html
import { ListItem } from 'react-native-elements';
import styled, { css } from 'styled-components/native';

import IconClose from '../Icon/_view/Icon_view_close.svg';

export interface MenuItemProps {
  title: string;
  onPress: () => void;
}

export interface MenuProps {
  items: MenuItemProps[];
  onClose: () => void;
}

interface StyledMenuContainerProps {
  items: number;
}

const StyledMenuContainer: React.FC<StyledMenuContainerProps> = styled(View)`
  ${(props: StyledMenuContainerProps) => {
    const modalHeight = props.items * 57 + 30 + 44 + 34;
    return css`
      top: ${Dimensions.get('screen').height - modalHeight - 50};
    `;
  }}

  padding: 0 20px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fff;
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
  <StyledMenuContainer items={items.length}>
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
