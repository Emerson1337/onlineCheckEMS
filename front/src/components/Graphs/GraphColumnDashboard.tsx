/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';
import api from '../../services/api';

export default function GraphColumnDashboard() {

  const [data, setData] = useState([{}])

  //resgatando as informacoes
  useEffect(() => {
    api.get('/api/best-sold-foods').then((response) => {
      response.data.map((food: any) => {
        setData(data => [...data, {
          month: `${food.month[0].toUpperCase() + food.month.substr(1)} - ${food.nameFood}`,
          quantidade: food.frequency
        }])
      });
    }).catch((error) => {
      console.log(error)
    });
  }, [])

  var config = {
    data: data,
    xField: 'month',
    yField: 'quantidade',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return (
    <>
      <h2>Vendas nos últimos meses 📉 </h2>
      <hr />
      <Column {...config} />
    </>
  );
};
