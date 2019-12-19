import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Link } from 'react-router-native';
import styled, { css } from 'styled-components/native';
import { useSelector } from 'react-redux';

import IconDiscovery from '../../components/Icon/_view/Icon_view_discovery.svg';
import IconJourney from '../../components/Icon/_view/Icon_view_journey.svg';
import IconNotifications from '../../components/Icon/_view/Icon_view_notifications.svg';
import IconAdd from '../../components/Icon/_view/Icon_view_add.svg';
import { GlobalState } from '../../providers/redux/store';
import { AllowedRoutes } from '../Routes';

const StyledConteinter = styled(View)`
  position: absolute;

  ${() => css`
    top: ${Dimensions.get('screen').height - (34 + 49)};
  `}

  height: 83px;
  width: 100%;

  z-index: 10;
`;

const StyledNav = styled(View)`
  position: relative;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  padding: 10px 20px;

  height: 49px;
  ${() => css`
    width: ${Dimensions.get('screen').width};
  `}

  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
`;

const StyledNavLink = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  height: 50px;
  width: 50px;
`;

const StyledMainNavLink = styled(View)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  top: -20px;

  height: 50px;
  width: 50px;
`;

const Avatar = styled(Image)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  border-radius: 25px;

  height: 25px;
  width: 25px;
`;

interface BarLinkProps {
  to: AllowedRoutes;
  main?: boolean;
}

const BarLinkActiveDot = styled(View)`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #000;

  margin-top: 10px;
`;

const BarLink: React.FC<BarLinkProps> = props => {
  const pathname = useSelector((state: GlobalState) => state.router.location.pathname);
  const isActive = props.to === pathname;

  return (
    <Link to={props.to}>
      {props.main ? (
        <StyledMainNavLink>{props.children}</StyledMainNavLink>
      ) : (
        <>
          <StyledNavLink>
            {props.children}
            {isActive && <BarLinkActiveDot />}
          </StyledNavLink>
        </>
      )}
    </Link>
  );
};

const UserIcon: React.FC<{ url: string }> = props =>
  React.useMemo(() => <Avatar source={{ uri: props.url }} />, [props]);

export const Bar: React.FC = () => {
  const userAvatarUrl = useSelector((state: GlobalState) => (state.user.auth ? state.user.auth.photoURL : null));
  const iconSize = 24;
  const mainIconSize = 50;
  const avatar = userAvatarUrl ? <UserIcon url={userAvatarUrl} /> : null;

  return (
    <StyledConteinter>
      <StyledNav>
        <BarLink to={AllowedRoutes.discovery}>
          <IconDiscovery width={iconSize} height={iconSize} />
        </BarLink>

        <BarLink to={AllowedRoutes.journey}>
          <IconJourney width={iconSize} height={iconSize} />
        </BarLink>

        <BarLink main to={AllowedRoutes.add}>
          <IconAdd width={mainIconSize} height={mainIconSize} />
        </BarLink>

        <BarLink to={AllowedRoutes.notificatitons}>
          <IconNotifications width={iconSize} height={iconSize} />
        </BarLink>

        <BarLink to={AllowedRoutes.profile}>{avatar}</BarLink>
      </StyledNav>
    </StyledConteinter>
  );
};
