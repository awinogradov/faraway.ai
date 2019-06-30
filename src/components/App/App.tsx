import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '../Home/Home';

import './App.css';

export const App = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
  </Switch>
);
