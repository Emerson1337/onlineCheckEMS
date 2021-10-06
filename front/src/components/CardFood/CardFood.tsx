/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import styled from 'styled-components';
// import { FaShoppingCart } from 'react-icons/fa'

import pizzaImage from '../../assets/pizza-1.png'

interface cardProps {
  name: string;
  price: number;
  description: string;
}

export default function CardFood({ name, price, description }: cardProps) {

  return (
    <>
      <CardGlobal>
        <h5 className="title">{name}</h5>
        <div className="cardBody">
          <img src={pizzaImage} />

          <h5>Preço: R$ {price}</h5>
          <p className="ingredients">Ingredientes</p>
          <p>{description.length === 80 ? description : description.substr(0, 78) + '...'}</p>

          <button className="btn addCar">Adicionar</button>
        </div>
      </CardGlobal>
    </>
  );
}

const CardGlobal = styled.div`
  transition: opacity 0.5s;
  opacity: 1;
  
  margin-top: 40px;
  background: #FF4200;
  padding: 10px 0 0 0;
  border-radius: 20px 20px 30px 30px;
  width: 250px;
  text-align: center;
  color: #737373;
  box-shadow: 2px 2px 20px 5px rgba(0, 0, 0, 0.1);
  .title {
    color: #fff;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .cardBody {
    background: #fff;
    border-radius: 20px;
    padding: 0 8px;
    height: 350px;
    width: 250px;
  }
  .addCar {
    padding: 10px;
    background: #FA4A0C;
    font-weight: bold;
    color: #fff;
    border-radius: 20px;
  }
  .addCar:hover {
    background: #af360a;
  }
  
  p {
    font-size: 14px;
  }

  img {
    margin: 20px 0px;
    width: 200px;
    height: 100px;
  }
  .ingredients {
    font-weight: bold;
    margin-bottom: 2px;
  }
`;
