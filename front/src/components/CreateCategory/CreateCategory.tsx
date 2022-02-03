/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import ReactLoading from "react-loading";
import { toast } from 'react-toastify';
import { Form, Input, Button } from 'antd';
import api from '../../services/api';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} é obrigatório!',
};

export default function CreateCategory() {

  const [form] = Form.useForm();
  const [requestSent, setRequestSent] = useState(false);

  const createCategory = (values: any) => {
    const name = values.name;
    const userJWT = localStorage.getItem("Authorization");
    setRequestSent(true);
    api.post('/api/create-tag-food', { name, userJWT }).then((response) => {
      toast.success(response.data);
      form.resetFields();
      setRequestSent(false);
    }).catch((error) => {
      toast.error(error.response.data);
      setRequestSent(false);
    })
  };

  return (
    <div>
      <h2>🥘 Criar Categorias para comidas</h2>
      <hr />
      <Form form={form} {...layout} name="nest-messages" onFinish={createCategory} validateMessages={validateMessages}>
        <Form.Item name={['name']} label="Nome" rules={[{ required: true }]}>
          <Input className="nameInput" />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {requestSent ? <ReactLoading width={20} height={20} type={'spin'} color={'#fff'} /> : 'Criar'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
