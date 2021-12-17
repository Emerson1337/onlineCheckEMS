/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { List, Avatar, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import image from '../../assets/image-category.png';
import EditFood from '../CreateFood/EditFood';
import { toast } from 'react-toastify';
import { TextField } from '@material-ui/core';

export default function IndexFoods() {

  const [allFoods, setAllFoods] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [foodSelected, setFoodSelected] = useState({});

  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const [filteredFood, setFilteredFood] = useState([]);

  //Funcao que recarrega o componente de edicao, possibilitando 
  //que ele seja recarregado e tenha os inputs preenchidos com novos valores
  const toggle = () => {
    open ? setOpen(false) : setOpen(true);
    open ? setReload(false) : setReload(true);
  }

  const closeModal = () => {
    setEditModal(false);
    toggle();
  }

  function getFoods() {
    api.get('/api/list-foods').then((response) => {
      setAllFoods(response.data);
      setFilteredFood(response.data);
    }).catch((error) => {
      toast.error(error.response.data);
    })
  }

  useEffect(() => {
    getFoods();
  }, [reload]);

  function deleteFood(foodId: string) {
    api.delete(`/api/remove-food/${foodId}`).then((response) => {
      getFoods();
      toast.success(response.data);
    }).catch((error) => {
      toast.error(error.response.data);
    })
  }

  const filterItems = (value: any) => {
    if (value.length === 0) {
      setFilteredFood(allFoods);
    } else {
      setFilteredFood(allFoods.filter((food: any) => {
        return food['name'].toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }));
    }
  };

  return (
    <>
      <h2>🍲 Aqui estão todas as comidas de sua loja</h2>
      <hr />
      {
        <>
          <div className="mb-4">
            <TextField
              label="Pesquisar comida"
              onChange={(event) => filterItems(event.target.value)}
            />
          </div>
          <List
            itemLayout="horizontal"
            dataSource={filteredFood}
            renderItem={food => (
              <List.Item
                actions={[<a onClick={() => { setEditModal(true); setFoodSelected(food); toggle() }} className="btn btn-success text-white" key="list-loadmore-edit">Editar</a>,
                <a onClick={() => deleteFood(food['id'])} className="btn btn-danger text-white" key="list-loadmore-more">Deletar</a>]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={image} />}
                  title={<a>{food['name']}</a>}
                  description={food['description']}
                />
                <h5>
                  {Number(food['price']).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </h5>
              </List.Item>

            )}
          />
          <div className="site-drawer-render-in-current-wrapper">
            <Drawer
              placement="right"
              closable={false}
              onClose={() => { setEditModal(false); toggle(); }}
              visible={editModal}
              getContainer={false}
              contentWrapperStyle={{ width: '400px', height: '100vh' }}
              style={{ position: 'absolute', overflow: 'hidden' }}
            >
              <span>
                {
                  open &&
                  <EditFood close={closeModal} food={foodSelected} />
                }
              </span>
            </Drawer>
          </div>
        </>
      }
    </>
  );
}
