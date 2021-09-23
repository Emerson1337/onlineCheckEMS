/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
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

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

export default class Dashboard extends React.Component {

  state = {
    collapsed: false,
    menu: 1,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  changeMenu = (value: any) => {
    this.setState({
      menu: value,
    });
  };

  render() {
    return (
      <Styles>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo">
              <h5>GESTÃO</h5>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" onClick={() => this.changeMenu(1)} icon={<PlusSquareFilled />}>
                Criar categoria
              </Menu.Item>
              <Menu.Item key="2" onClick={() => this.changeMenu(2)} icon={<PlusCircleFilled />}>
                Adicionar comida
              </Menu.Item>
              <Menu.Item key="3" onClick={() => this.changeMenu(3)} icon={<ContactsOutlined />}>
                Listagem
              </Menu.Item>
              <SubMenu key="4" icon={<AreaChartOutlined />} title="Estatísticas">
                <Menu.Item key="4" onClick={() => this.changeMenu(4)}>
                  Vendas Produtos
                </Menu.Item>
                <Menu.Item key="5" onClick={() => this.changeMenu(5)}>
                  Saídas Prod. Mensais
                </Menu.Item>
                <Menu.Item key="6" onClick={() => this.changeMenu(6)}>
                  Vendas Mensais (R$)
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ fontSize: 25 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '100vh',
              }}
            >
              {
                this.state.menu === 1 ?
                  <CreateCategory />
                  :
                  this.state.menu === 2 ?
                    <CreateFood />
                    :
                    this.state.menu === 3 ?
                      <IndexFoods />
                      :
                      this.state.menu === 4 ?
                        <GraphPieDashboard />
                        :
                        this.state.menu === 5 ?
                          <GraphColumnDashboard />
                          :
                          this.state.menu === 6 ?
                            <GraphLineDashboard />
                            :
                            ''
              }
            </Content>
          </Layout>
        </Layout>
      </Styles >
    );
  }
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