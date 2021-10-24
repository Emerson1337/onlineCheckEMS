import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/main';
import Check from '../pages/check/index';
import Login from '../pages/admin/login';
import Dashboard from '../pages/dashboard';

import { PrivateRoute } from '../routes/PrivateRoute';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/check" component={Check} />
        <Route path="/admin" component={Login} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;