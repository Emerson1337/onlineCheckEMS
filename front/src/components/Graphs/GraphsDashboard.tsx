import React from 'react';
import { Pie } from '@ant-design/charts';

const GraphPieDashboard: React.FC = () => {
  var data = [
    {
      type: 'Pizza',
      value: 27,
    },
    {
      type: 'Esfiha',
      value: 25,
    },
    {
      type: 'Pães',
      value: 18,
    },
    {
      type: 'Salgados',
      value: 15,
    },
    {
      type: 'Saladas',
      value: 10,
    },
    {
      type: 'Baião',
      value: 5,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: function content(_ref: any) {
        var percent = _ref.percent;
        return ''.concat((percent * 100).toFixed(0), '%');
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  return (
    <>
      <h2>Produtos vendidos neste mês (Setembro) 💸</h2>
      <hr />
      <Pie {...config} />
    </>
  );
};

export default GraphPieDashboard;