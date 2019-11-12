import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Link } from 'react-router-native';
import styled, { css } from 'styled-components/native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { GlobalState } from '../../providers/redux/store';
import { AllowedRoutes } from '../Router';

const mapStateToProps = (state: GlobalState) => ({ pathname: state.router.location.pathname });
const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

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

export type BarProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>;

const Bar: React.FC<BarProps> = props => {
  const isActive = (route: AllowedRoutes) => route === props.pathname;

  return (
    <StyledConteinter>
      <StyledNav>
        <BarLink to={AllowedRoutes.discover} active={isActive(AllowedRoutes.discover)}>
          <Text>D</Text>
        </BarLink>

        <BarLink to={AllowedRoutes.collections} active={isActive(AllowedRoutes.collections)}>
          <Text>C</Text>
        </BarLink>

        <BarLink to={AllowedRoutes.add} active={isActive(AllowedRoutes.add)}>
          <Text>+</Text>
        </BarLink>

        <BarLink to={AllowedRoutes.trip} active={isActive(AllowedRoutes.trip)}>
          <Text>T</Text>
        </BarLink>

        <BarLink to={AllowedRoutes.user} active={isActive(AllowedRoutes.user)}>
          <Text>U</Text>
        </BarLink>
      </StyledNav>
    </StyledConteinter>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(Bar);
