import { Form, Input, InputNumber, Button, Upload, Space, Alert, Select } from 'antd';
import {
  UploadOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../services/api';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} é obrigatório!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} deve ser maior que 0',
  },
};
/* eslint-enable no-template-curly-in-string */

export default function EditFood({ props, food }: any) {
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const [defaultCategory, setDefaultCategory] = useState('');

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    api.get('/api/list-tags').then((response) => {
      setHasError(false);
      setAllCategories(response.data);
    }).catch((error) => {
      setSuccess(false);
      setHasError(true);
      setMessage(error.response.data);
    });
  }, [])

  const updateFood = (values: any) => {
    const name = values.food.name;
    const description = values.food.description;
    const tagFood = values.food.tagFood;
    const price = values.food.price;
    const image = values.food.image;
    const userJWT = localStorage.getItem("Authorization");

    api.post(`/api/update-food/${values.food.id}`, { name, tagFood, description, price, image, userJWT }).then((response) => {
      setHasError(false);
      setSuccess(true);
      setMessage(response.data);
      $(':input').val('');
    }).catch((error) => {
      setHasError(true);
      setSuccess(false);
      setMessage(error.response.data);
    })
  };

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
      <h2>Editar comida</h2>
      <hr />
      <Form {...layout} name="nest-messages" onFinish={updateFood} validateMessages={validateMessages}>
        <Form.Item hidden name={['food', 'id']} label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['food', 'name']} label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['food', 'tagFood']} label="Categoria" rules={[{ required: true }]}>
          <Select defaultValue="Selecione uma categoria">
            {
              allCategories.map((category) => (
                category['id'] === food.id ?
                  <Select.Option selected="selected" value={category['id']}>{category['name']}</Select.Option>
                  :
                  <Select.Option value={category['id']}>{category['name']}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item name={['food', 'description']} label="Ingredientes" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['food', 'price']} label="Preço" rules={[{ type: 'number', required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name={['food', 'image']} label="Imagem" rules={[{ required: true }]}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Upload
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Enviar (Max: 1)</Button>
            </Upload>
          </Space>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Editar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
