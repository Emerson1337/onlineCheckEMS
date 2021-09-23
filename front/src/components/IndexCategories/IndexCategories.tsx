/* eslint-disable jsx-a11y/anchor-is-valid */
import { List, Avatar } from 'antd';

const data = [
  {
    title: 'Pizza',
  },
  {
    title: 'Pizza de calabresa',
  },
  {
    title: 'Esfiha carne do sol',
  },
  {
    title: 'Pão de alho',
  },
];

export default function IndexCategories() {

  return (
    <>
      <h2>🍲 Aqui estão todas as categorias de sua loja</h2>
      <hr />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item
            actions={[<a className="btn btn-success text-white" key="list-loadmore-edit">Editar</a>, <a className="btn btn-danger text-white" key="list-loadmore-more">Deletar</a>]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
            />
          </List.Item>
        )}
      />,
    </>
  );
}