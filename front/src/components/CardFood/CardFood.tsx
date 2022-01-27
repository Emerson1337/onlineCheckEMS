/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import styled from 'styled-components';
// import { FaShoppingCart } from 'react-icons/fa'

import pizzaImage from '../../assets/pizza-1.png'

interface cardProps {
  name: string;
  price: number;
  description: string;
  category: string;
  shopping: (name: string, price: number, description: string, qtd: number, category: string) => void;
}

export default function CardFood({ name, price, description, category, shopping }: cardProps) {

  const [qtd, setQtd] = useState(0);

  return (
    <>
      <CardGlobal>
        <h5 className="title">{name}</h5>
        <div className="cardBody">
          <img src={pizzaImage} />

          <h5>Preço: {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
          <p className="ingredients">Ingredientes</p>
          <p>{description.length === 80 ? description : description.substr(0, 78) + '...'}</p>
          <div>
            <div className="container">
              <div className="row">
                <ButtonsQtd className="col-md-12">
                  <ButtonQtd type="button" onClick={() => qtd > 0 ? setQtd(qtd - 1) : setQtd(0)} id="menos"><i className="fa fa-minus-circle" aria-hidden="true">-</i></ButtonQtd><span>{qtd}</span><ButtonQtd onClick={() => setQtd(qtd + 1)} type="button" id="mais">+<i className="fa fa-plus-circle" aria-hidden="true"></i></ButtonQtd>
                </ButtonsQtd>
              </div>
            </div>
            <button onClick={() => { qtd > 0 && shopping(name, price, description, qtd, category); setQtd(0) }} className={`btn ${qtd <= 0 && 'disableButton'} addCar`}>Adicionar</button>
          </div>
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
    padding: 2px;
  }
  .cardBody {
    background: #fff;
    border-radius: 20px;
    padding: 0 10px;
    padding-bottom: 20px;
    height: max-content;
    width: 250px;
  }
  .addCar {
    padding: 10px;
    background: #FA4A0C;
    font-weight: bold;
    color: #fff;
    border-radius: 20px;
  }
  .disableButton {
    background: #f5a284;
  }
  .disableButton:hover {
    background: #f5a284 !important;
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

const ButtonQtd = styled.button`
  background-color: transparent;
  border-radius: 20px;
  width: 50px;
  height: 50px;
  font-size: 30px;
  border: 1px solid #737373;
  color: #737373;
  margin: 10px;
  
  :hover {
    cursor: pointer;
  }
`;

const ButtonsQtd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

