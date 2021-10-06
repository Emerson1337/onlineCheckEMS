// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import api from '../services/api';

export default async function Auth(): Promise<any> {

  const token = localStorage.getItem('Authorization');
  api.post('/api/authenticated', api.defaults.headers.authorization = `Bearer ${token}`).then((response) => {
    return true;
  }).catch((error) => {
    return false;
  });

}