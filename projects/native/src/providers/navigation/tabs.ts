import { NavigationActions, NavigationContainerComponent } from 'react-navigation';

export enum allowedScreens {
  Initialize = 'InitializeScreen',
  Discovery = 'DiscoveryScreen',
  Signin = 'SigninScreen',
  Profile = 'ProfileScreen',
  Progress = 'ProgressScreen',
  Notifications = 'NotificationsScreen',
  Auth = 'Auth',
  App = 'App',
}

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
