/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ContactsOutlined,
  PlusCircleFilled,
  PlusSquareFilled,
  AreaChartOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import CreateCategory from '../../components/CreateCategory/CreateCategory';
import CreateFood from '../../components/CreateFood/CreateFood';
import IndexFoods from '../../components/IndexFoods/IndexFoods';
import GraphPieDashboard from '../../components/Graphs/GraphsDashboard';
import GraphColumnDashboard from '../../components/Graphs/GraphColumnDashboard';
import GraphLineDashboard from '../../components/Graphs/GraphLineDashboard';
import IndexCategories from '../../components/IndexCategories/IndexCategories';
import FadeIn from 'react-fade-in/lib/FadeIn';
import api from '../../services/api';

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

export default function Dashboard() {

  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState(1);
  const [isAuth, setIsAuth] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const changeMenu = (value: any) => {
    setMenu(value);
  };

  const auth = (value: any) => {
    setIsAuth(value);
  }

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    api.post('/api/authenticated', api.defaults.headers.authorization = `Bearer ${token}`).then((response) => {
      auth(true);
    }).catch((error) => {
      auth(false);
      return window.location.replace('/admin');
    });
  }, [])


  return (
    <Styles>
      {
        isAuth ?
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo">
                <h5>GESTÃO</h5>
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={() => changeMenu(1)} icon={<PlusSquareFilled />}>
                  Criar Categoria
                </Menu.Item>
                <Menu.Item key="2" onClick={() => changeMenu(2)} icon={<PlusCircleFilled />}>
                  Adicionar Comida
                </Menu.Item>
                <Menu.Item key="3" onClick={() => changeMenu(3)} icon={<ContactsOutlined />}>
                  Listar Categorias
                </Menu.Item>
                <Menu.Item key="4" onClick={() => changeMenu(4)} icon={<ContactsOutlined />}>
                  Listar Comidas
                </Menu.Item>
                <SubMenu key="5" icon={<AreaChartOutlined />} title="Estatísticas">
                  <Menu.Item key="6" onClick={() => changeMenu(6)}>
                    Vendas Produtos
                  </Menu.Item>
                  <Menu.Item key="7" onClick={() => changeMenu(7)}>
                    Saídas Prod. Mensais
                  </Menu.Item>
                  <Menu.Item key="8" onClick={() => changeMenu(8)}>
                    Vendas Mensais (R$)
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ fontSize: 25 }}>
                {
                  collapsed ?
                    <MenuUnfoldOutlined onClick={() => toggle()} />
                    :
                    <MenuFoldOutlined onClick={() => toggle()} />
                }
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: '100vh',
                }}
              >
                <FadeIn>
                  {
                    menu === 1 ?
                      <CreateCategory />
                      :
                      menu === 2 ?
                        <CreateFood />
                        :
                        menu === 3 ?
                          <IndexCategories />
                          :
                          menu === 4 ?
                            <IndexFoods />
                            :
                            menu === 6 ?
                              <GraphPieDashboard />
                              :
                              menu === 7 ?
                                <GraphColumnDashboard />
                                :
                                menu === 8 ?
                                  <GraphLineDashboard />
                                  :
                                  ''
                  }
                </FadeIn>
              </Content>
            </Layout>
          </Layout>
          :
          null
      }

    </Styles >
  );
}

const Styles = styled.div`

  h2 {
    font-weight: bold;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.665);
  }

  h5 {
    color: #001529;
    font-weight: bold;
    margin: 0;
  }
  
  #components-layout-demo-custom-trigger .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
`;