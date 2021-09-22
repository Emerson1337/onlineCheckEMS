import { Form, Input, InputNumber, Button, Upload, Space } from 'antd';
import {
  UploadOutlined,
} from '@ant-design/icons';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

export default function CreateFood() {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <h2>🥫  Adicionar novas comidas</h2>
      <hr />
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['food', 'name']} label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['food', 'description']} label="Descrição/ingredientes" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['food', 'price']} label="Preço" rules={[{ type: 'number' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name={['food', 'image']} label="Imagem" rules={[{ required: true }]}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Enviar (Max: 1)</Button>
            </Upload>
          </Space>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Adicionar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
