import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import About from './pages/about';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;