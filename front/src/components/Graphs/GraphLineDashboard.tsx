/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import api from '../../services/api';

export default function GraphLineDashboard() {

  const [data, setData] = useState([{}])

  //resgatando as informacoes
  useEffect(() => {
    api.get('/api/dashboard/money-monthly').then((response) => {
      response.data.moneyMonthly.map((money: any) => {
        setData(data => [...data, {
          month: money.month[0].toUpperCase() + money.month.substr(1),
          'valor (R$)': money.price
        }])
      });
    }).catch((error) => {
      console.log(error)
    });
  }, [])

  var config = {
    data: data,
    height: 500,
    xField: 'month',
    yField: 'valor (R$)',
    label: {},
    point: {
      size: 2,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
  };

  return (
    <>
      <h2>Entradas Mensais 💰 </h2>
      <hr />
      <Line {...config} />

    </>
  );
};
