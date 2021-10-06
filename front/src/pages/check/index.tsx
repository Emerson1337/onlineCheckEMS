import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import CardFood from '../../components/CardFood/CardFood';

import notfound from '../../assets/notfound.png';
import ReactLoading from "react-loading";

import { FiShoppingCart } from 'react-icons/fi';
import FinishOrderModal from '../../components/Modals/modalFinishOrder';
import api from '../../services/api';
import BtnCategory from '../../components/BtnCategory/BtnCategory';
import FadeIn from 'react-fade-in/lib/FadeIn';

export default function Check() {

  //LISTING CATEGORIES
  const [allCategories, SetAllCategories] = useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    api.get('/api/list-tags').then((categories: any) => {
      SetAllCategories(categories.data);
    }).catch((error) => {
      console.log("Ops! " + error);
    })

  }, [])

  //LISTING FOODS
  const [allFoods, SetAllFoods] = useState([]);

  useEffect(() => {
    api.get('/api/list-top-foods').then((foods: any) => {
      SetAllFoods([]);

      SetLoading(false);
      SetAllFoods(foods.data);
    }).catch((error) => {
      SetAllFoods([]);

      SetLoading(false);
      console.log("Ops! " + error);
    })
  }, []);

  function getFoodsByTag(tagId: any) {

    if (tagId.length) {
      SetLoading(true);

      api.get(`/api/list-by-tag/${tagId}`).then((foods: any) => {
        SetAllFoods([]);

        SetLoading(false);
        SetAllFoods(foods.data);
      }).catch((error) => {
        SetAllFoods([]);

        SetLoading(false);
        console.log("Ops! " + error);
      })
    } else {
      SetLoading(true);
      api.get('/api/list-top-foods').then((foods: any) => {
        SetAllFoods([]);

        SetLoading(false);
        SetAllFoods(foods.data);
      }).catch((error) => {
        SetAllFoods([]);

        SetLoading(false);
        console.log("Ops! " + error);
      })
    }
  }

  //MODAL CONFIG
  const [isVisibleModal, SetIsVisibleModal] = useState(false);

  useEffect(() => {
    function removeMainScroll(isVisibleModal: boolean) {
      isVisibleModal ?
        $('body').css('overflow-y', 'hidden')
        : $('body').css('overflow-y', 'scroll');
    }

    removeMainScroll(isVisibleModal);
  }, [isVisibleModal])


  return (
    <>
      {isVisibleModal &&
        <FinishOrderModal onClose={() => { SetIsVisibleModal(false) }} />
      }
      <LinkFinishOrder>
        <FinishOrder onClick={() => (SetIsVisibleModal(true))}>
          <FiShoppingCart />
        </FinishOrder>
      </LinkFinishOrder>
      <BannerCategory>
        <p className="slogan"><strong>Pizzaria mundo do sabor.</strong></p>
        <h1 className="ask">Qual tipo de comida deseja?</h1>
        <p className="explain">Escolha o tipo de comida abaixo para checar o cardápio!</p>
      </BannerCategory>
      <SelectCategory className="container">
        <div onClick={() => (getFoodsByTag([]))}>
          <BtnCategory key={0} category={'Top do mês'} />
        </div>
        {
          allCategories &&
          allCategories.map((category, key) => {
            return (
              <div onClick={() => (getFoodsByTag(category['id']))}>
                <BtnCategory key={category['id']} category={category['name']} />
              </div>
            );
          })
        }
      </SelectCategory>
      <Products id="cardFoods">
        {
          loading ? <ReactLoading type={'cylon'} color={'#FA4A0C'} /> : null
        }
        {
          !loading ?
            (
              allFoods.length ?
                allFoods.map((food, key) => {
                  return <FadeIn>
                    <CardFood key={food['id']} name={food['name'] || food['nameFood']} price={food['price'] || food['priceFood']} description={food['description']} />
                  </FadeIn>
                })
                :
                <h2>
                  <img src={notfound} alt="Nada encontrado." />
                </h2>
            ) : null
        }
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
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 10%;
  padding-bottom: 100px;

  @media(max-width: 768px) {
    justify-content: center;
  }

  h2 img {
    width: 300px;
    height: 200px;
  }
`;

const FinishOrder = styled.div`
  background-color: #FA4A0C;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  position: fixed;
  font-size: 25px;
  bottom: 20px;
  right: 40px;
  color: #fff;

  :hover{
    color: #F4F4F4;
  }
`;

const LinkFinishOrder = styled.a`

`;
