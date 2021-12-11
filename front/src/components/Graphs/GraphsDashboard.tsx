/* eslint-disable array-callback-return */
import { Pie } from '@ant-design/charts';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function GraphPieDashboard() {

  const [data, setData] = useState([{}])

  //resgatando as informacoes
  useEffect(() => {
    api.get('/api/list-top-foods').then((response) => {
      response.data.map((food: any) => {
        console.log(food)
        setData(data => [...data, {
          type: food.name[0].toUpperCase() + food.name.substr(1),
          quantidade: food.frequency
        }])
      });
    }).catch((error) => {
      console.log(error)
    });
  }, [])

  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'quantidade',
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
