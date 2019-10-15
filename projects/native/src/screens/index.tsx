import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Navigation} from 'react-native-navigation';

import {store, persistor} from '../providers/redux/store';

import Root from './Root';

function WrappedComponent(Component: React.ComponentType) {
  return function inject(props: any) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

Navigation.registerComponent('farawayai.root', () => WrappedComponent(Root));
