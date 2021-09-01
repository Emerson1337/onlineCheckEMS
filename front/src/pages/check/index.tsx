import React from 'react';
import styled from "styled-components";
import BtnCategory from "../../components/BtnCategory/BtnCategory";
import CardFood from '../../components/CardFood/CardFood';

import { FiShoppingCart } from 'react-icons/fi';
import TransitionsModal from '../modals/modalFinishOrder';

export default function Check() {

  return (
    <>
      <LinkFinishOrder href="#">
        <FinishOrder>
          <TransitionsModal />
        </FinishOrder>
      </LinkFinishOrder>
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
      <Products>
        <CardFood name="Pizza de chocolate" price={32} description="
          Ingredientes: Banana, chocolate, molho de tomate e pizza.Ingredientes:
          Banana, 
        " />
        <CardFood name="Pizza de chocolate" price={32} description="
          Ingredientes: Banana, chocolate, molho de tomate e pizza.Ingredientes:
          Banana, 
        " />
        <CardFood name="Pizza de chocolate" price={32} description="
          Ingredientes: Banana, chocolate, molho de tomate e pizza.Ingredientes:
          Banana, 
        " />
        <CardFood name="Pizza de chocolate" price={32} description="
          Ingredientes: Banana, chocolate, molho de tomate e pizza.Ingredientes:
          Banana, 
        " />
      </Products>
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

  @media(max-width: 768px) {
    text-align: center;
    .explain {
      font-size: 18px;
    }
  }
`;

const SelectCategory = styled.section`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Products = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 10%;
  padding-bottom: 100px;

  @media(max-width: 768px) {
    justify-content: center;
    
  }
`;

const FinishOrder = styled.div`
  position: fixed;
  bottom: 20px;
  right: 40px;
`;

const LinkFinishOrder = styled.a`
  color: #fff;

  :hover{
    color: #fff;
  }
`;