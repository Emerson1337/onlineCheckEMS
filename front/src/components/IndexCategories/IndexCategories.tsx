/* eslint-disable jsx-a11y/anchor-is-valid */
import { List, Avatar, Alert } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';

import image from '../../assets/image-category.png';

export default function IndexCategories() {

  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    api.get('/api/list-tags').then((response) => {
      setHasError(false);
      setAllCategories(response.data);
    }).catch((error) => {
      setHasError(true);
      setMessage(error.response.data);
    })
  }, [allCategories]);

  function deleteTag(tagId: string) {
    api.delete(`/api/remove-tag/${tagId}`).then((response) => {
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
      <h2>🍲 Aqui estão todas as categorias de sua loja</h2>
      <hr />
      {
        <List
          itemLayout="horizontal"
          dataSource={allCategories}
          renderItem={item => (
            <List.Item
              actions={[<a className="btn btn-success text-white" key="list-loadmore-edit">Editar</a>, <a onClick={() => deleteTag(item['id'])} className="btn btn-danger text-white" key="list-loadmore-more">Deletar</a>]}
            >
              <List.Item.Meta
                avatar={<Avatar src={image} />}
                title={<a href="">{item['name']}</a>}
              />
            </List.Item>
          )}
        />
      }
    </>
  );
}