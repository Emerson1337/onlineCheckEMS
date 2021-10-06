/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import api from '../../services/api';
import { Alert } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} é obrigatório!',
};

export default function CreateCategory() {
  const onFinish = (values: any) => {
    // const name = values.name;
    // const userJWT = localStorage.getItem("Authorization");
    // api.post('/api/create-tag-food', { name, userJWT }).then((response) => {
    //   $('#teste').val(`<Alert message="Adicionado com sucesso!" type="success" showIcon />`)
    // }).catch((error) => {
    //   $('#teste').val(`<Alert message="${error}!" type="error" showIcon />`)
    // })
  };

  return (
    <Styles>
      <h2>🥘 Criar Categorias para comidas</h2>
      <hr />
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['name']} label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Criar
          </Button>
        </Form.Item>
      </Form>
    </Styles>
  );
};

const Styles = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-bottom: 50px;
  } */
`;