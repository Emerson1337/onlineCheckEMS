/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export default function EditFood({ props, food }: any) {

  const [allCategories, setAllCategories] = useState([]);
  const [nameFood, setName] = useState('');
  const [categoryFood, setCategory] = useState('');
  const [descriptionFood, setDescription] = useState('');
  const [priceFood, setPrice] = useState('');
  const [imageFood, setImage] = useState('');

  useEffect(() => {
    setName(food.name);
    setCategory(food.tagFood);
    setDescription(food.description);
    setPrice(food.price);
    setImage(food.image);
  }, [])

  useEffect(() => {
    api.get('/api/list-tags').then((response) => {
      toast.success(response.data);
      setAllCategories(response.data)
    }).catch((error) => {
      toast.error(error.response.data);
    });
  }, [])

  function updateFood() {
    const name = nameFood;
    const tagFood = categoryFood;
    const description = descriptionFood;
    const price = priceFood;
    const image = imageFood;
    const userJWT = localStorage.getItem("Authorization");

    console.log({ name, tagFood, description, price, image, userJWT });
    api.put(`/api/update-food/${food.id}`, { name, tagFood, description, price, image, userJWT }).then((response) => {
      toast.success(response.data);
    }).catch((error) => {
      toast.error(error.response.data);
    })
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
      <h2>{food.name}</h2>
      <hr />
      <form>
        <div className="form-row">
          <div className="col-md-10 mb-3">
            <label htmlFor="validationDefault01">Nome *</label>
            <input onChange={(event) => setName(event.target.value)} defaultValue={food.name} type="text" className="form-control" id="validationDefault01" placeholder="Nome da comida" required />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-10 mb-3">
            <label htmlFor="validationDefault03">Categoria *</label>
            <select onChange={(event) => setCategory(event.target.value)} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
              {
                allCategories.map((category) => (
                  category['id'] === food.tagFood ?
                    <option key={category['id']} value={category['id']} selected>{category['name']}</option>
                    :
                    <option key={category['id']} value={category['id']}>{category['name']}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-10 mb-3">
            <label htmlFor="validationDefault04">Descrição *</label>
            <textarea onChange={(event) => setDescription(event.target.value)} defaultValue={food.description} className="form-control" rows={2} id="validationDefault04" placeholder="Quais os ingredientes da comida?" required></textarea>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="validationDefault05">Preço *</label>
            <CurrencyInput onChange={(event: any) => setPrice(event.target.value.split('R$').join('').replace(',', '.'))} defaultValue={food.price} required />
          </div>
        </div>
        <button onClick={updateFood} className="btn btn-primary" type="button">Atualizar</button>
      </form>
    </>
  );
};
