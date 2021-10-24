/* eslint-disable jsx-a11y/anchor-is-valid */
import { List, Avatar, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';

import image from '../../assets/image-category.png';
import { toast } from 'react-toastify';
import EditFood from '../CreateFood/EditFood';

export default function IndexCategories() {

  const [allCategories, setAllCategories] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [categorySelected, setCategorySelected] = useState({});

  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    api.get('/api/list-tags').then((response) => {
      setAllCategories(response.data);
    }).catch((error) => {
      toast.error(error.response.data);
    })
  }, [reload]);

  function deleteTag(tagId: string) {
    api.delete(`/api/remove-tag/${tagId}`).then((response) => {
      toast.success(response.data);
    }).catch((error) => {
      toast.error(error.response.data);
    })
  }

  //Funcao que recarrega o componente de edicao, possibilitando 
  //que ele seja recarregado e tenha os inputs preenchidos com novos valores
  const toggle = () => {
    open ? setOpen(false) : setOpen(true);
    open ? setReload(false) : setReload(true);
  }

  return (
    <>
      <h2>🍲 Aqui estão todas as categorias de sua loja</h2>
      <hr />
      {
        <>
          <List
            itemLayout="horizontal"
            dataSource={allCategories}
            renderItem={item => (
              <List.Item
                actions={[<a onClick={() => { setEditModal(true); toggle() }} className="btn btn-success text-white" key="list-loadmore-edit">Editar</a>, <a onClick={() => deleteTag(item['id'])} className="btn btn-danger text-white" key="list-loadmore-more">Deletar</a>]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={image} />}
                  title={<a href="#">{item['name']}</a>}
                />
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
                  <EditFood food={categorySelected} />
                }
              </span>
            </Drawer>
          </div>
        </>
      }
    </>
  );
}