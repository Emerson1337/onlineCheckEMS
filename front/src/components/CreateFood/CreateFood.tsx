/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Form, Input, Button, Upload, Space, Select } from 'antd';
import {
  UploadOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} é obrigatório!',
};
/* eslint-enable no-template-curly-in-string */

export default function CreateFood() {

  const [allCategories, setAllCategories] = useState([]);
  const [image, setImage] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    api.get('/api/list-tags').then((response) => {
      setAllCategories(response.data);
    }).catch((error) => {
      toast.error(error.response.data);
    });
  }, [])

  const createFood = (values: any) => {
    const name = values.food.name;
    const description = values.food.description;
    const tagFood = values.food.tagFood;
    const price = values.food.price.split('R$').join('').replace(',', '.');
    const userJWT = localStorage.getItem("Authorization");

    api.post('/api/create-food', { name, image, tagFood, description, price, userJWT }).then((response) => {
      toast.success(response.data);
      form.resetFields();
    }).catch((error) => {
      toast.error(error.response.data);
    });
  };

  const defaultMaskOptions = {
    prefix: 'R$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 7, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
  }

  const CurrencyInput = ({ ...inputProps }) => {
    const currencyMask = createNumberMask(defaultMaskOptions)

    const styles: React.CSSProperties = {
      boxSizing: 'border-box',
      margin: '0',
      fontVariant: 'tabular-nums',
      listStyle: 'none',
      fontFeatureSettings: 'tnum',
      position: 'relative',
      display: 'inline-block',
      width: '100%',
      minWidth: '0',
      padding: '4px 11px',
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: '14px',
      lineHeight: '1.5715',
      backgroundColor: '#fff',
      backgroundImage: 'none',
      border: '1px solid #d9d9d9',
      borderRadius: '2px',
      transition: 'all 0.3s',
    }

    return <MaskedInput style={styles} mask={currencyMask} {...inputProps} />
  }

  return (
    <>
      <h2>🥫  Adicionar novas comidas</h2>
      <hr />
      <Form {...layout} encType={"multipart/form-data"} form={form} name="nest-messages" onFinish={createFood} validateMessages={validateMessages}>
        <Form.Item name={['food', 'name']} label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item initialValue={'Selecione uma categoria'} name={['food', 'tagFood']} label="Categoria" rules={[{ required: true }]}>
          <Select id="categoryInput">
            {
              allCategories.map((category) => (
                <Select.Option key={category['id']} value={category['id']}>{category['name']}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item initialValue={''} name={['food', 'description']} label="Descrição/ingredientes" rules={[{ required: true }]}>
          <Input id="s" />
        </Form.Item>
        <Form.Item name={['food', 'price']} label="Preço" rules={[{ required: true }]}>
          <CurrencyInput />
        </Form.Item>
        <Form.Item initialValue={''} name={['food', 'image']} label="Imagem" rules={[{ required: true }]}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Upload
              onChange={(file) => { file.file.status = 'success'; setImage(file.file) }}
              listType="picture"
              maxCount={1}
              showUploadList={true}
            >
              <Button icon={<UploadOutlined />}>Enviar (Max: 1)</Button>
            </Upload>
          </Space>
        </Form.Item>
        <Form.Item initialValue={''} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Adicionar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
