import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '../Home/Home';
import { Signin } from '../Signin/Signin';

import './App.css';

export const App = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/signin" component={Signin} />
  </Switch>
);
