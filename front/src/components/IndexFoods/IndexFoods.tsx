/* eslint-disable jsx-a11y/anchor-is-valid */
import { List, Avatar, Alert, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import image from '../../assets/image-category.png';
import EditFood from '../CreateFood/EditFood';

export default function IndexFoods() {

  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const [allFoods, setAllFoods] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [foodSelected, setFoodSelected] = useState({});

  useEffect(() => {
    api.get('/api/list-foods').then((response) => {
      setHasError(false);
      setAllFoods(response.data);
    }).catch((error) => {
      setHasError(true);
      setMessage(error.response.data);
    })
  }, []);

  function deleteFood(foodId: string) {
    api.delete(`/api/remove-food/${foodId}`).then((response) => {
      setHasError(false);
      setSuccess(true);
      setMessage(response.data);
    }).catch((error) => {
      setHasError(true);
      setSuccess(false);
      setMessage(error.response.data);
    })
  }

  return (
    <>
      {
        success &&
        <Alert className="mb-4" message={message} type="success" showIcon />
      }
      {
        hasError &&
        <Alert className="mb-4" message={message} type="error" showIcon />
      }
      <h2>🍲 Aqui estão todas as comidas de sua loja</h2>
      <hr />
      {
        <>
          <List
            itemLayout="horizontal"
            dataSource={allFoods}
            renderItem={food => (
              <List.Item
                actions={[<a onClick={() => { setEditModal(true); setFoodSelected(food); }} className="btn btn-success text-white" key="list-loadmore-edit">Editar</a>,
                <a onClick={() => deleteFood(food['id'])} className="btn btn-danger text-white" key="list-loadmore-more">Deletar</a>]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={image} />}
                  title={<a>{food['name']}</a>}
                  description={food['description']}
                />
                <h5>
                  R$ {food['price']}
                </h5>
              </List.Item>

            )}
          />
          <div className="site-drawer-render-in-current-wrapper">
            <Drawer
              title={`${foodSelected}`}
              placement="right"
              closable={false}
              onClose={() => setEditModal(false)}
              visible={editModal}
              getContainer={false}
              contentWrapperStyle={{ width: '500px' }}
              style={{ position: 'absolute', overflow: 'hidden' }}
            >
              <p>
                <EditFood food={foodSelected} />
              </p>
            </Drawer>
          </div>
        </>
      }
    </>
  );
}