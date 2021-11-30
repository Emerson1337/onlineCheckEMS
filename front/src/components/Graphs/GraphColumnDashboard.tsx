import React from 'react';
import { Column } from '@ant-design/charts';

export default function GraphColumnDashboard() {
  var data = [
    {
      month: 'Outubro',
      vendas: 23,
    },
    {
      month: 'Novembro',
      vendas: 32,
    },
    {
      month: 'Dezembro',
      vendas: 41,
    },
    {
      month: 'Janeiro',
      vendas: 31,
    },
    {
      month: 'Março',
      vendas: 123,
    },
  ];
  var config = {
    data: data,
    xField: 'month',
    yField: 'vendas',
    conversionTag: {},
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
