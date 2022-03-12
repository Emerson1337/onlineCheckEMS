/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useLayoutEffect } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import InputMask from "react-input-mask";
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { RestaurantNameContext } from '../../App';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} é obrigatório!',
};

export default function RestaurantInfo() {
    const RestaurantName = useContext(RestaurantNameContext);
    
    const [enterprise, setEnterprise] = useState('');
    const [phone_number, setPhone_number] = useState(0);
    const [delivery_fee, setDelivery_fee] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const [form] = Form.useForm();

    const getInfo = () => {
        setLoaded(false);
        api.get(`/api/restaurant-info/${RestaurantName}`).then((response) => {
            setEnterprise(response.data.enterprise); //always return just one object
            setPhone_number(response.data.phone_number); //always return just one object
            setDelivery_fee(response.data.delivery_fee); //always return just one object
            setLoaded(true);
        }).catch((error) => {
            toast.error(error.response.data);
        });
    }

    useLayoutEffect(() => {
        getInfo();
    }, [])

    const saveRestaurantInfo = (values: any) => {
        const enterprise = values.info.enterprise;
        const phone_number = values.info.phone_number.replace(/[+()-]/g, '').replace(" ", "");
        const delivery_fee = String(values.info.delivery_fee).split('R$').join('').replace(',', '.');
        const userJWT = localStorage.getItem("Authorization");

        api.post('/api/restaurant-info', { enterprise, phone_number, delivery_fee, userJWT }).then((response) => {
            toast.success(response.data);
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
            <h2>✅ Informações do restaurante</h2>
            <hr />
            {
                loaded &&
                <FormStyled>

                    <Form {...layout} encType={"multipart/form-data"} form={form} name="nest-messages" onFinish={saveRestaurantInfo} validateMessages={validateMessages}>
                        <Form.Item initialValue={enterprise} name={['info', 'enterprise']} label="Nome" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item initialValue={phone_number} name={['info', 'phone_number']} label="Número de telefone" rules={[{ required: true }]}>
                            <InputMask className='InputMasked' mask="+99 (99)9999-9999" />
                        </Form.Item>
                        <Form.Item initialValue={delivery_fee} name={['info', 'delivery_fee']} label="Taxa de entrega" rules={[{ required: true }]}>
                            <CurrencyInput />
                        </Form.Item>
                        {/* <Form.Item initialValue={''} name={['info', 'logo']} label="Logo" rules={[{ required: true }]}>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Upload
                            listType="picture"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Enviar (Max: 1)</Button>
                        </Upload>
                    </Space>
                </Form.Item> */}
                        <Form.Item initialValue={''} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Salvar
                            </Button>
                        </Form.Item>
                    </Form>
                </FormStyled>
            }
        </>
    );
};


const FormStyled = styled.div`
    .InputMasked {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: 'tnum', "tnum";
        position: relative;
        display: inline-block;
        width: 100%;
        min-width: 0;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 1.5715;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        transition: all 0.3s;
    }

`;