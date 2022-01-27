/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
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
import RestaurantInfo from '../../components/RestaurantInfo/RestaurantInfo';

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
  const gui = localStorage.getItem('gui');
  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState(gui || '1');

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const changeMenu = (value: any) => {
    setMenu(value);
  };

  return (
    <Styles>
      <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h5>GESTÃO</h5>
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={[menu]}>
            <Menu.Item key="1" onClick={() => { changeMenu('1'); localStorage.setItem('gui', '1') }} icon={<PlusSquareFilled />}>
              Informações do restaurante
            </Menu.Item>
            <Menu.Item key="2" onClick={() => { changeMenu('2'); localStorage.setItem('gui', '2') }} icon={<PlusSquareFilled />}>
              Criar Categoria
            </Menu.Item>
            <Menu.Item key="3" onClick={() => { changeMenu('3'); localStorage.setItem('gui', '3') }} icon={<PlusCircleFilled />}>
              Adicionar Comida
            </Menu.Item>
            <Menu.Item key="4" onClick={() => { changeMenu('4'); localStorage.setItem('gui', '4') }} icon={<ContactsOutlined />}>
              Listar Categorias
            </Menu.Item>
            <Menu.Item key="5" onClick={() => { changeMenu('5'); localStorage.setItem('gui', '5') }} icon={<ContactsOutlined />}>
              Listar Comidas
            </Menu.Item>
            <SubMenu key="6" icon={<AreaChartOutlined />} title="Estatísticas">
              <Menu.Item key="7" onClick={() => { changeMenu('7'); localStorage.setItem('gui', '7') }}>
                Vendas Produtos
              </Menu.Item>
              <Menu.Item key="8" onClick={() => { changeMenu('8'); localStorage.setItem('gui', '8') }}>
                Saídas Prod. Mensais
              </Menu.Item>
              <Menu.Item key="9" onClick={() => { changeMenu('9'); localStorage.setItem('gui', '9') }}>
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
              margin: '10px 16px',
              padding: 24,
              minHeight: '100vh',
            }}
          >
            <FadeIn>
              {
                menu === '1' ?
                  <RestaurantInfo />
                  :
                  menu === '2' ?
                    <CreateCategory />
                    :
                    menu === '3' ?
                      <CreateFood />
                      :
                      menu === '4' ?
                        <IndexCategories />
                        :
                        menu === '5' ?
                          <IndexFoods />
                          :
                          menu === '7' ?
                            <GraphPieDashboard />
                            :
                            menu === '8' ?
                              <GraphColumnDashboard />
                              :
                              menu === '9' ?
                                <GraphLineDashboard />
                                :
                                ''
              }
            </FadeIn>
          </Content>
        </Layout>
      </Layout>
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