import { NavigationActions, NavigationContainerComponent } from 'react-navigation';

import { allowedScreens } from '.';

let appNavigator: NavigationContainerComponent;

export function setAppNavigator(navigatorRef: typeof appNavigator) {
  appNavigator = navigatorRef;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function appNavigate(routeName: allowedScreens, params?: any) {
  appNavigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}
