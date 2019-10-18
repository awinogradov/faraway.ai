import React from 'react';
import styled, { css } from 'styled-components';

interface TitleProps {
  lvl: 1 | 2;
  style?: React.CSSProperties;
  children: string;
}

const fontSizeMap = {
  1: 56,
  2: 18,
};

const paddingTopMap = {
  1: 0,
  2: 5,
};

const paddingBottomMap = {
  1: 20,
  2: 10,
};

const TitlePresenter = styled.Text`
  ${(props: TitleProps) => css`
    font-size: ${fontSizeMap[props.lvl]}px;
  `};
  font-weight: 600;
  letter-spacing: 1;

  ${(props: TitleProps) => css`
    padding-top: ${paddingTopMap[props.lvl]}px;
  `};
  ${(props: TitleProps) => css`
    padding-bottom: ${paddingBottomMap[props.lvl]}px;
  `};
`;

export const Title: React.FC<TitleProps> = props => <TitlePresenter {...props} />;
