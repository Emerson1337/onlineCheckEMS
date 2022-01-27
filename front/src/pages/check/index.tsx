/* eslint-disable array-callback-return */
/* eslint-disable react/style-prop-object */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import CardFood from '../../components/CardFood/CardFood';
import Carousel from 'react-elastic-carousel';

import notfound from '../../assets/notfound.png';
import ReactLoading from "react-loading";

import { FiShoppingCart } from 'react-icons/fi';
import FinishOrderModal from '../../components/Modals/modalFinishOrder';
import api from '../../services/api';
import BtnCategory from '../../components/BtnCategory/BtnCategory';
import FadeIn from 'react-fade-in/lib/FadeIn';
import GetNameUser from '../../components/Modals/GetNameUser';
import { toast } from 'react-toastify';

export default function Check() {

  //LISTING CATEGORIES
  const [allCategories, SetAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);

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

      setLoading(false);
      SetAllFoods(foods.data);
    }).catch((error) => {
      SetAllFoods([]);

      setLoading(false);
      console.log("Ops! " + error);
    })
  }, []);

  function getFoodsByTag(tagId: any) {

    if (tagId.length) {
      setLoading(true);

      api.get(`/api/list-by-tag/${tagId}`).then((foods: any) => {
        SetAllFoods([]);

        setLoading(false);
        SetAllFoods(foods.data);
      }).catch((error) => {
        SetAllFoods([]);

        setLoading(false);
        console.log("Ops! " + error);
      })
    } else {
      setLoading(true);
      api.get('/api/list-top-foods').then((foods: any) => {
        SetAllFoods([]);

        setLoading(false);
        SetAllFoods(foods.data);
      }).catch((error) => {
        SetAllFoods([]);

        setLoading(false);
        console.log("Ops! " + error);
      })
    }
  }

  const shopping = (name: string, price: number, description: string, qtd = 1, category: string) => {
    var getItems = localStorage.getItem("items");
    var items = [];

    if (getItems) {
      items = JSON.parse(getItems);
      var doesntExists = true;

      //if item already exists then your quantity is incremented
      items.map((item: any) => {
        if (item.name === name) {
          doesntExists = false;
          return item.qtd += qtd;
        }
      });

      doesntExists && items.push({ name, price, description, qtd, category })
      toast.success(`${qtd} uni. de ${name} adicionado ao seu carrinho!`);
    } else {
      items.push({ name, price, description, qtd, category })
      toast.success(`${qtd} uni. de ${name} adicionado ao seu carrinho!`);
    }

    localStorage.setItem("items", JSON.stringify(items));

    return;
  };

  //MODAL CONFIG
  const [isVisibleModal, SetIsVisibleModal] = useState(false);

  const [isFirstAccess, setIsFirstAccess] = useState(false);

  useLayoutEffect((): any => {
    if (localStorage.getItem('name')) {
      setIsFirstAccess(false);
    } else {
      setIsFirstAccess(true);
    }
    setLoadingPage(false);
  }, [])

  useEffect(() => {
    function removeMainScroll(isVisibleModal: boolean) {
      isVisibleModal ?
        $('body').css('overflow-y', 'hidden')
        : $('body').css('overflow-y', 'scroll');
    }

    removeMainScroll(isVisibleModal);
  }, [isVisibleModal])

  const breakPoints = [
    { width: 1, itemsToShow: 2.5, itemPadding: [0, 0] },
    { width: 550, itemsToShow: 3.5, itemPadding: [0, 0] },
    { width: 768, itemsToShow: 6.5, itemPadding: [0, 0] },
    { width: 1200, itemsToShow: 10, itemPadding: [0, 0] },
  ];

  return (
    <>
      {
        !loadingPage ?
          <FadeIn>
            {!isFirstAccess ?
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
                  <p className="slogan"><strong>Olá, {localStorage.getItem('name')}</strong></p>
                  <h1 className="ask">Qual tipo de comida deseja?</h1>
                  <p className="explain">Escolha o tipo de comida abaixo para checar o cardápio!</p>
                </BannerCategory>
                <SelectCategory className="container">
                  <Carousel outerSpacing={0} pagination={false} showArrows={false} isRTL={false} breakPoints={breakPoints}>
                    <div onClick={() => (getFoodsByTag([]))}>
                      <BtnCategory key={0} category={'Top do mês'} />
                    </div>
                    {
                      allCategories &&
                      allCategories.map((category, key) => {
                        return (
                          <div key={key} onClick={() => (getFoodsByTag(category['id']))}>
                            <BtnCategory key={category['id']} category={category['name']} />
                          </div>
                        );
                      })
                    }
                  </Carousel>
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
                            return <FadeIn key={key}>
                              <CardFood key={food['id']} shopping={shopping} name={food['name'] || food['nameFood']} price={food['price'] || food['priceFood']} description={food['description']} category={food['tagFood']} />
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
              :
              <GetNameUser onClose={() => { setIsFirstAccess(false) }} />
            }
          </FadeIn>
          :
          <ReactLoading type={'cylon'} color={'#FA4A0C'} />
      }

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
  min-height: 100vh;

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
