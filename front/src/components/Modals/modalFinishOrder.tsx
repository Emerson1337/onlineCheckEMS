/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IoMdClose, IoMdRemove } from 'react-icons/io';
import styled from 'styled-components';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { Fade } from '@material-ui/core';
import { FiTrash } from 'react-icons/fi';
import api from '../../services/api';
import { toast } from 'react-toastify';
import ThankYouModal from '../Modals/ThankYou';


export default function FinishOrderModal({ onClose = () => { }, children }: any) {

  const [toDelivery, setToDelivery] = useState(false);
  const [rest, setRest] = useState(false);
  const [itemsToBuy, setItemsToBuy] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [complement, setComplement] = useState('');
  const [cashPayment, setcashPayment] = useState(false);
  const [moneyBack, setMoneyBack] = useState(0);
  const [pix, setPix] = useState(false);
  const [card, setCard] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [endLoad, setEndLoad] = useState(false);

  useEffect(() => {
    const staticAddress = JSON.parse(localStorage.getItem("user_info") || '[{}]').address;
    const staticComplement = JSON.parse(localStorage.getItem("user_info") || '[{} ]').complement;
    const staticName = localStorage.getItem("name") || '';

    setEndLoad(false);
    getTotalPrice();
    setName(staticName);
    setAddress(staticAddress);
    setComplement(staticComplement);

    api.get('/api/restaurant-info').then((response) => {
      setPhoneNumber(response.data.phone_number);
      setDeliveryFee(response.data.delivery_fee);
    }).catch((error) => {
      toast.error(error.response.data);
    })
  }, [])

  const getTotalPrice = () => {
    var itemsStorage = localStorage.getItem("items");
    var totalPriceFood = 0;
    var oldTotalPrice = 0;

    if (itemsStorage) {
      var object = JSON.parse(itemsStorage);
      setItemsToBuy(object);
      object.map((item: any) => {
        totalPriceFood = oldTotalPrice + (item.price * item.qtd);
        oldTotalPrice = totalPriceFood;
      })
    }
    setTotalPrice(totalPriceFood);
  }

  function switchDelivery() {
    if (toDelivery) {
      setToDelivery(false);
      setTotalPrice(totalPrice - deliveryFee)
    } else {
      setToDelivery(true);
      setTotalPrice(totalPrice + deliveryFee)
    }
  }

  function switchPayment() {
    rest ? setRest(false) : setRest(true);
  }

  function finishOrder() {
    var objectInfoUser = {
      address: address,
      complement: complement,
    }

    localStorage.setItem("user_info", JSON.stringify(objectInfoUser));

    itemsToBuy && api.post(`/api/sale`, { itemsToBuy }).then((response) => {
    });

    messageWhatsappGenerator();

    localStorage.removeItem("items");
    setItemsToBuy([]);

    setEndLoad(true)
  }

  function messageWhatsappGenerator() {
    var orderList = itemsToBuy.map((item: any) => {
      return `%0A%0A✅ ${item.name}%0AQuantidade: ${item.qtd}x%0AValor Unit: ${(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}%0AValor: *${(item.price * item.qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*`;
    });

    window.location.href = (`https://api.whatsapp.com/send?phone=${phoneNumber}&text=Olá, sou ${name}! Escolhi os seguintes produtos 🍲: ${orderList}
      ${isDelivery(toDelivery)}🤑 Forma de pagamento: ${paymentMethodGenerator(cashPayment, moneyBack, card, pix)}%0A%0A😊 Obrigado!`);
  }

  const paymentMethodGenerator = (cashPayment: boolean, moneyBack: number, card: boolean, pix: boolean) => {
    if (cashPayment) {
      return `*Dinheiro* (💵). ${moneyBack ? `Troco para: ${moneyBack.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : 'Não precisarei de troco!'}`;
    }

    if (card) {
      return "*Cartão de crédito/débito* (💳)";
    }

    if (pix) {
      return "*PIX* (📱)"
    }

  }

  const isDelivery = (toDelivery: boolean) => {

    if (toDelivery) {
      return `%0A%0A💰 PREÇO TOTAL (${deliveryFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} Taxa de entrega): *${(totalPrice + deliveryFee).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*
      %0A%0A🏡 Desejo todos para entrega no seguinte endereço:%0A*${address}*
      %0A%0A📓 Ponto de Referência: *${complement}*.%0A%0A`
    } else {
      return `%0A%0A💰 PREÇO TOTAL: *${(totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*
      %0A%0A🚶‍♂️ Farei a retirada no local.%0A`
    }

  }

  const removeUnitFood = (index: number) => {
    var itemsStorage = localStorage.getItem("items");
    if (itemsStorage) {
      var objectVector = JSON.parse(itemsStorage);
      objectVector[index].qtd -= 1;

      if (objectVector[index].qtd <= 0) {
        setTotalPrice(0);
        return clearFood(index);
      } else {
        var object = JSON.stringify(objectVector);
        localStorage.setItem("items", object);
      }
    }

    setItemsToBuy(objectVector);
    getTotalPrice();
  }

  const clearFood = (index: number) => {
    var itemsStorage = localStorage.getItem("items");
    if (itemsStorage) {
      var objectVector = JSON.parse(itemsStorage);
      objectVector.splice(index, 1);

      var object = JSON.stringify(objectVector);

      //if object is null we need remove him, because overwrite doesnt work
      if (objectVector.length === 0) {
        localStorage.removeItem("items");
        setTotalPrice(0);
        setItemsToBuy([]);
      } else {
        localStorage.setItem("items", object);
        setItemsToBuy(objectVector);
        getTotalPrice();
      }
    }
  }

  function checkFields() {
    // if (!$('#address').val() ||
    //   !$('#refference').val() ||
    //   !$('#rest').val() ||
    //   !$('#name').val()) {
    //   return alert('Preencha todos os campos!');
    // }
    finishOrder();
  }

  return (
    <>
      {
        endLoad ?
          <ThankYouModal></ThankYouModal>
          :
          <UIModalOverlay>
            <FadeIn>
              <div>
                <div id="buttonToClose">
                  <ButtonClose className="btn" onClick={onClose} type="button">
                    <IoMdClose color={'black'} size={18} />
                  </ButtonClose>
                </div>
                <InfoBuy>
                  <h5 id="transition-modal-title">Finalizando Pedidos</h5>
                  <h1>Valor Total: </h1>
                  <h1>{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                  <div id="transition-modal-description">
                    <p>Pedidos</p>
                    <div className="carMarketFoods">
                      {
                        itemsToBuy.map((item: any, key: number) => {
                          return <p key={key} className="eachFood">
                            <span className="descriptionBuy" key={`${item.name} -${key} `}>
                              {item.name} - qtd: {item.qtd} - (uni: {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}) - {(item.price * item.qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                            <span key={item.name} className="buttonsFood">
                              <IoMdRemove key={`${item.name} -${item.qtd} `} className="removeUnit" onClick={(event) => removeUnitFood(key)} /><FiTrash key={`${item.name} -${key} -${key} `} onClick={(event) => clearFood(key)} className="clearFood" />
                            </span>
                          </p>
                        })
                      }
                      {
                        toDelivery ?
                          <p className="eachFood">
                            Taxa de entrega - {deliveryFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </p>
                          :
                          ''
                      }
                    </div>

                  </div>
                  <h2>Preencha as informações para finalizar o pedido.</h2>
                </InfoBuy>
                <div className="formClient">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name"><strong>Nome: </strong></label>
                      <input onChange={(e) => { setName(e.target.value); localStorage.setItem("name", e.target.value) }} defaultValue={localStorage.getItem("name")!} type="text" className="form-control" id="name" placeholder="Ex: João Paulo" />
                    </div>
                    <div className="switch form-check">
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={() => switchDelivery()} /> Desejo para entrega (Taxa: {deliveryFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
                    </div>
                    {
                      toDelivery ?
                        <Fade in={toDelivery}
                          style={{ transitionDelay: '100ms' }}>
                          <div id="adressDelivery">
                            <div className="form-group">
                              <label htmlFor="address"><strong>Endereço: </strong></label>
                              <input defaultValue={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="address" placeholder="Ex: Rua Verde, 340" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="refference"><strong>Ponto de Referência: </strong></label>
                              <input defaultValue={complement} onChange={(e) => setComplement(e.target.value)} type="text" className="form-control" id="refference" placeholder="Ex: Apto; Altos..." />
                            </div>
                          </div>
                        </Fade>
                        :
                        <Fade in={toDelivery}
                          style={{ transitionDelay: '100ms' }}>
                          <div>
                          </div>
                        </Fade>
                    }
                    <p><strong>Forma de pagamento: </strong></p>
                    <div className="form-check">
                      <input className="form-check-input" onClick={() => { setcashPayment(false); setCard(true); setPix(false); setMoneyBack(0) }} type="radio" name="exampleRadios" id="creditCard" defaultValue="option1" />
                      <label className="form-check-label" htmlFor="creditCard">
                        Cartão (Crédito/Débito)
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" onClick={() => { setcashPayment(true); setCard(false); setPix(false) }} name="exampleRadios" id="cash" defaultValue="option2" />
                      <label className="form-check-label" htmlFor="cash">
                        Dinheiro
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" onClick={() => { setcashPayment(false); setCard(false); setPix(true); setMoneyBack(0) }} type="radio" name="exampleRadios" id="creditCard" defaultValue="option1" />
                      <label className="form-check-label" htmlFor="creditCard">
                        PIX
                      </label>
                    </div>
                    {
                      cashPayment && !rest ?
                        <Fade in={cashPayment}
                          style={{ transitionDelay: '100ms' }}>
                          <div id="cashRest">
                            <label className="number" htmlFor="rest">Quantia p/ troco: </label>
                            <div id="inputRest" className="col-auto">
                              <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                  <div className="input-group-text">R$</div>
                                </div>
                                <input onChange={(e) => setMoneyBack(Number(e.target.value))} type="number" className="form-control" id="rest" placeholder="Ex: 50,00" />
                              </div>
                            </div>
                          </div>
                        </Fade>
                        :
                        <Fade in={cashPayment}
                          style={{ transitionDelay: '100ms' }}>
                          <div>

                          </div>
                        </Fade>
                    }
                    {
                      cashPayment &&
                      <div id="notCashRest">
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={() => { switchPayment(); setMoneyBack(0) }} /> Não preciso de troco.
                      </div>
                    }
                  </form>
                </div>
                <FinishBuy>
                  <ButtonFinishOrder onClick={() => { checkFields() }} className={`btn ${name && address && complement ? 'buttonDisabled' : ''}`}>Finalizar Pedido</ButtonFinishOrder>
                </FinishBuy>
              </div>
            </FadeIn>
          </UIModalOverlay >
      }
    </>

  );
};

const UIModalOverlay = styled.div`
    z-index: 9999;
    position: fixed;
    overflow-y: scroll;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: #FFF;
    padding: 2% 25% 5% 25%;
    background-color: #FA4A0C;
  
  .buttonsFood {
      display: flex;
    }

  /* .buttonDisabled {
    cursor: not-allowed;
    background-color: #d3cece; 
    pointer-events: none;
  } */

  .descriptionBuy {
      text-align: left;
    }

  .eachFood {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

  .removeUnit {
      font-size: 18px;
      color: #fff;
      margin: 0 20px;
    }

  .removeUnit, .clearFood {
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }

  .removeUnit:hover, .clearFood:hover {
      font-size: 18px;
      color: #d3cece;
    }

  

  input {
      border-radius: 20px;
    }

    #inputRest {
      width: 40 %;
    }

  .switch {
    margin-bottom: 10px;
    padding-left: 0;
  }

  .input-group-text {
    border-radius: 20px 0 0 20px !important;
  }

  #notCashRest {
    margin-top: 10px;
    text-align: center;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  #cashRest {
    display: flex;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #buttonToClose {
    display: flex;
    align-items: center;
    justify-content: right;
  }

  @media(max - width: 768px) {
    padding: 5% 15% 5% 15%;
    
    #inputRest {
      width: 70%;
    }
  }
  `;

const InfoBuy = styled.div`
  text-align: center;


  #transition-modal-description p{
    line-height: 1rem;
  }

  h1, h2, h3, h5 {
    color: #fff;
  }

  h2 {
    font-size: 2rem;
    margin: 10% 5% 5% 5%;
  }

  @media(max-width: 768px) {
    h2 {
      font-size: 1rem;
    }
  }
  `;

const FinishBuy = styled.div`
  text-align: center;
  margin-top: 30px;
  `;

const ButtonClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 20px;

  :hover {
    background: #d3cece;
  }
  `;

const ButtonFinishOrder = styled.button`
  background: #fff;
  border-radius: 20px;
  color: #FA4A0C;
  font-weight: bold;
  font-size: 18px;
  width: 200px;

  @media(max-width: 768px) {
    width: 80%;
  }

  :hover {
    background: #d3cece;
  }
  `;