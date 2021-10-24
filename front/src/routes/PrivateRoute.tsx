import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import api from '../services/api';


export const PrivateRoute = ({ component, ...rest }: any) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    api.post('/api/authenticated', api.defaults.headers.authorization = `Bearer ${token}`).then((response) => {
      setIsAuth(true);
    }).catch((error) => {
      setIsAuth(false);
      return window.location.replace('/admin');
    });
  }, [])

  const routeComponent = (props: any) => (
    isAuth
      ? React.createElement(component, props)
      : ''
  );
  return <Route {...rest} render={routeComponent} />;
};