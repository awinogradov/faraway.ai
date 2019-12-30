import { NavigationActions, NavigationContainerComponent } from 'react-navigation';

let navigator: NavigationContainerComponent;

export function setTopLevelNavigator(navigatorRef: typeof navigator) {
  navigator = navigatorRef;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function navigate(routeName: allowedScreens, params?: any) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

export enum allowedScreens {
  Initialize = 'InitializeScreen',
  Discovery = 'DiscoveryScreen',
  Signin = 'SigninScreen',
  Profile = 'ProfileScreen',
  Add = 'AddScreen',
  Progress = 'ProgressScreen',
  CreateCollection = 'CreateCollectionScreen',
  Notifications = 'NotificationsScreen',
  Auth = 'Auth',
  App = 'App',
}
