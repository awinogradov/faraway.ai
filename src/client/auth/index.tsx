import React from 'react';
import Cookies from 'universal-cookie'

import { canUseDOM } from '../dom';
import { authCookies } from '../../utils/auth';

const cookies = new Cookies();

const tokenCookie = () => cookies.get(authCookies.token);

export const authorize = (token: string | null | undefined) => {
  if (!token) return;

  cookies.set(authCookies.token, token);

  const prevLocation = cookies.get(authCookies.prevLocation);
  if (prevLocation) {
    cookies.remove(authCookies.prevLocation);
    window.location = prevLocation;
  } else {
    window.location.reload();
  }
};

export function authorizedOnly<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    if (!canUseDOM) return null;

    cookies.set(authCookies.prevLocation, window.location);

    return tokenCookie() ? <Component {...props} /> : null;
  };
};

export function unauthorizedOnly<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    if (!canUseDOM) return null;

    return tokenCookie() ? null : <Component {...props} />;
  };
}
