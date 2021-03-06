/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useEffect, useState } from 'react';
import api from '../../services/api';
import ReactLoading from "react-loading";
import { toast } from 'react-toastify';

export default function EditCategory({ props, close, category }: any) {

  const [categoryFood, setCategory] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    setCategory(category.tagFood);
  }, [])

  function updateTag() {
    const name = categoryFood;
    const userJWT = localStorage.getItem("Authorization");
    setRequestSent(true);
    api.put(`/api/update-tag/${category.id}`, { name, userJWT }).then((response) => {
      toast.success(response.data);
      close();
      setRequestSent(false);
    }).catch((error) => {
      toast.error(error.response.data);
      setRequestSent(false);
    });
  };

  return (
    <>
      <h2>{category.name}</h2>
      <hr />
      <form>
        <div className="form-row">
          <div className="col-md-10 mb-3">
            <label htmlFor="validationDefault01">Nome *</label>
            <input onChange={(event) => setCategory(event.target.value)} defaultValue={category.name} type="text" className="form-control" id="validationDefault01" placeholder="Nome da categoria" required />
          </div>
        </div>
        <button onClick={updateTag} className="btn btn-primary" type="button">
          {requestSent ? <ReactLoading width={20} height={20} type={'spin'} color={'#fff'} /> : 'Atualizar'}
        </button>
      </form>
    </>
  );
};
