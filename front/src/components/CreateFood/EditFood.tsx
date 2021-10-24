/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

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
            <input onChange={(event) => setPrice(event.target.value)} defaultValue={food.price} type="number" className="form-control" id="validationDefault05" placeholder="" required />
          </div>
        </div>
        <button onClick={updateFood} className="btn btn-primary" type="button">Atualizar</button>
      </form>
    </>
  );
};
