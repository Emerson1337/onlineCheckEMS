import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { Fade } from '@material-ui/core';

export default function FinishOrderModal({ onClose = () => { }, children }: any) {

  const [toDelivery, setToDelivery] = useState(false);
  const [cashPayment, setcashPayment] = useState(false);
  const [rest, setRest] = useState(false);

  function switchDelivery() {
    toDelivery ? setToDelivery(false) : setToDelivery(true);
  }

  function switchPayment() {
    rest ? setRest(false) : setRest(true);
  }

  function checkPaymentMethod() {
    if (!$('#creditCard').prop('checked') && !$('#cash').prop('checked')) {
      alert('Selecione o método de pagamento.');
    }

    if ($('#rest').val()! >= 2) {

    }
  }

  // function checkFields() {
  //   if (!$('#address').val() ||
  //     !$('#refference').val() ||
  //     !$('#rest').val() ||
  //     !$('#name').val()) {
  //     alert('Preencha todos os campos!');
  //   }
  // }

  return (
    <>
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
              <h1>R$ 58,60</h1>
              <div id="transition-modal-description">
                <p>Pedidos</p>
                <p>Pizza Chocolate, qtd: 1: R$ 20,50</p>
                <p>Pizza Calabresa, qtd: 1: R$ 22,90</p>
              </div>
              <h2>Preencha as informações para finalizar o pedido.</h2>
            </InfoBuy>
            <div className="formClient">
              <form>
                <div className="form-group">
                  <label htmlFor="name"><strong>Nome: </strong></label>
                  <input type="text" className="form-control" id="name" placeholder="Ex: João Paulo" />
                </div>
                <div className="switch form-check">
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onChange={() => switchDelivery()} /> Desejo para entrega (Taxa: R$2,00)
                </div>
                {
                  toDelivery ?
                    <Fade in={toDelivery}
                      style={{ transitionDelay: '100ms' }}>
                      <div id="adressDelivery">
                        <div className="form-group">
                          <label htmlFor="address"><strong>Endereço: </strong></label>
                          <input type="text" className="form-control" id="address" placeholder="Ex: Rua Verde, 340" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="refference"><strong>Ponto de Referência: </strong></label>
                          <input type="text" className="form-control" id="refference" placeholder="Ex: Apto; Altos..." />
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
                  <input className="form-check-input" onClick={() => { setcashPayment(false) }} type="radio" name="exampleRadios" id="creditCard" value="option1" />
                  <label className="form-check-label" htmlFor="creditCard">
                    Cartão (Crédito/Débito)
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" onClick={() => { setcashPayment(true) }} name="exampleRadios" id="cash" value="option2" />
                  <label className="form-check-label" htmlFor="cash">
                    Dinheiro
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" onClick={() => { setcashPayment(false) }} type="radio" name="exampleRadios" id="creditCard" value="option1" />
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
                            <input type="number" className="form-control" id="rest" placeholder="Ex: 50,00" />
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
                      onChange={() => switchPayment()} /> Não preciso de troco.
                  </div>
                }
              </form>
            </div>
            <FinishBuy>
              <ButtonFinishOrder onClick={() => { checkPaymentMethod() }} className="btn">Finalizar Pedido</ButtonFinishOrder>
            </FinishBuy>
          </div>
        </FadeIn>
      </UIModalOverlay >
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

  input {
    border-radius: 20px;
  }

  #inputRest {
    width: 40%;
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

  @media(max-width: 768px){
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

  @media(max-width: 768px){
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
  
  @media(max-width: 768px){
    width: 80%;
  }

  :hover {
    background: #d3cece;
  }
`;