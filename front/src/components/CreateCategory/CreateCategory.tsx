/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import api from '../../services/api';
import { Alert } from 'antd';
import { clear } from 'console';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} é obrigatório!',
};

export default function CreateCategory() {

  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const createCategory = (values: any) => {
    const name = values.name;
    const userJWT = localStorage.getItem("Authorization");
    api.post('/api/create-tag-food', { name, userJWT }).then((response) => {
      setHasError(false);
      setSuccess(true);
      setMessage(response.data);
      $('.nameInput').val('');
    }).catch((error) => {
      setHasError(true);
      setSuccess(false);
      setMessage(error.response.data);
    })
  };

  return (
    <Styles>
      {
        success &&
        <Alert className="mb-4" message={message} type="success" showIcon />
      }
      {
        hasError &&
        <Alert className="mb-4" message={message} type="error" showIcon />
      }
      <h2>🥘 Criar Categorias para comidas</h2>
      <hr />
      <Form {...layout} name="nest-messages" onFinish={createCategory} validateMessages={validateMessages}>
        <Form.Item name={['name']} label="Nome" rules={[{ required: true }]}>
          <Input className="nameInput" />
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