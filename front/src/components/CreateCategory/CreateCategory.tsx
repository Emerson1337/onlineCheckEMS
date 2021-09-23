import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} é obrigatório!',
};
/* eslint-enable no-template-curly-in-string */

export default function CreateCategory() {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Styles>
      <h2>🥘 Criar Categorias para comidas</h2>
      <hr />
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['user', 'name']} label="Nome" rules={[{ required: true }]}>
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