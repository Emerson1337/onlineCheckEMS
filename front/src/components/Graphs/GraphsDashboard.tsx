/* eslint-disable array-callback-return */
import { Pie } from '@ant-design/charts';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import months from '../../assets/months.json';
import api from '../../services/api';

export default function GraphPieDashboard() {

  const [date, setdate] = useState([{}])

  var comumDate = new Date();
  var monthNumber = comumDate.getMonth();
  // @ts-ignore
  var month = months[monthNumber];

  //resgatando as informacoes
  useEffect(() => {
    api.get('/api/list-top-foods').then((response) => {
      if (response.data.length) {
        response.data.map((food: any) => {
          setdate(date => [...date, {
            type: food.name[0].toUpperCase() + food.name.substr(1),
            quantidade: food.frequency
          }])
        });
      } else {
        toast.warn('Não existem comidas vendidas neste mês.')
      }
    }).catch((error) => {
      console.log(error)
    });
  }, [])

  var config = {
    appendPadding: 10,
    data: date,
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
      <h2>Produtos vendidos neste mês ({month}) 💸</h2>
      <hr />
      <Pie {...config} />
    </>
  );
};
