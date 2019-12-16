import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Link } from 'react-router-native';
import styled, { css } from 'styled-components/native';
import { useSelector } from 'react-redux';

import { GlobalState } from '../../providers/redux/store';
import { AllowedRoutes } from '../Routes';

const StyledConteinter = styled(View)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  ${() => css`
    top: ${Dimensions.get('screen').height - 90};
  `}

  height: 50px;
  width: 100%;

  z-index: 10;
`;

const StyledNav = styled(View)`
  position: relative;
  flex: 1;
  flex-direction: row;

  height: 50px;
  width: 250px;
  background-color: #fff;

  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  border-radius: 25px;
`;

const StyledNavLink = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 50px;
`;

interface BarLinkProps {
  to: AllowedRoutes;
  active: boolean;
}

const BarLink: React.FC<BarLinkProps> = props => {
  const activeStyle = props.active
    ? {
        backgroundColor: '#000',
        color: '#fff',
      }
    : {};

  return (
    <Link to={props.to}>
      <StyledNavLink {...activeStyle}>{props.children}</StyledNavLink>
    </Link>
  );
};

export const Bar: React.FC = () => {
  const pathname = useSelector((state: GlobalState) => state.router.location.pathname);
  const isActive = (route: AllowedRoutes) => route === pathname;

  return (
    <StyledConteinter>
      <StyledNav>
        <BarLink to={AllowedRoutes.discovery} active={isActive(AllowedRoutes.discovery)}>
          <Text>D</Text>
        </BarLink>

        <BarLink to={AllowedRoutes.journey} active={isActive(AllowedRoutes.journey)}>
          <Text>J</Text>
        </BarLink>

        <BarLink to={AllowedRoutes.add} active={isActive(AllowedRoutes.add)}>
          <Text>+</Text>
        </BarLink>

        <BarLink to={AllowedRoutes.notificatitons} active={isActive(AllowedRoutes.notificatitons)}>
          <Text>C</Text>
        </BarLink>

        <BarLink to={AllowedRoutes.profile} active={isActive(AllowedRoutes.profile)}>
          <Text>U</Text>
        </BarLink>
      </StyledNav>
    </StyledConteinter>
  );
};
