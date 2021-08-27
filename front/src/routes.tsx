import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Check from './pages/check/index';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/check" component={Check} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;