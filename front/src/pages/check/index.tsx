import React from 'react';
import styled from "styled-components";
import BtnCategory from "../../components/BtnCategory/BtnCategory";

export default function Check() {

  return (
    <>
      <BannerCategory>
        <p className="slogan"><strong>Pizzaria mundo do sabor.</strong></p>
        <h1 className="ask">Qual tipo de comida deseja?</h1>
        <p className="explain">Escolha o tipo de comida abaixo para checar o cardápio!</p>
      </BannerCategory>
      <SelectCategory className="container">
        <BtnCategory category="Pães" />
        <BtnCategory category="Pizzas" />
        <BtnCategory category="Pastéis" />
        <BtnCategory category="Salgados" />
      </SelectCategory>
    </>
  )
}

const BannerCategory = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  .slogan {
    font-weight: bold;
    color: #737373;
  }
  .ask {
    font-weight: bold;
    margin-bottom: 2rem;
    color: #252B42;
  }
  .explain {
    text-align: center;
    width: 400px;
    font-size: 24px;
    color: #737373;
  }
`;

const SelectCategory = styled.section`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
`;