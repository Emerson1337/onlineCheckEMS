import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function FinishOrderModal({ onClose = () => { }, children }: any) {

  const [toDelivery, SetToDelivery] = useState(false);
  const [cashPayment, SetcashPayment] = useState(false);

  function switchDelivery() {
    toDelivery ? SetToDelivery(false) : SetToDelivery(true);
  }

  function checkPaymentMethod() {
    if (!$('#creditCard').prop('checked') && !$('#cash').prop('checked')) {
      alert('Selecione o método de pagamento.');
    }
  }

  return (
    <>
      <UIModalOverlay>
        <div>
          <ButtonClose className="btn" onClick={onClose} type="button">
            <IoMdClose size={18} />
          </ButtonClose>
          <InfoBuy>
            <h5 id="transition-modal-title">Finalizando Pedidos</h5>
            <h1>Valor Total:</h1>
            <h1>R$ 58,60</h1>
            <div id="transition-modal-description">
              <p>Pedidos:</p>
              <p>Pizza Chocolate, qtd: 1: R$ 20,50</p>
              <p>Pizza Calabresa, qtd: 1: R$ 22,90</p>
            </div>
          </InfoBuy>
          <div className="formClient">
            <h2>Preencha as informações para finalizar o pedido.</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <input type="text" className="form-control" id="name" placeholder="Ex: João Paulo" />
              </div>
              <div className="form-check">
                <input className="form-check-input" onClick={() => switchDelivery()} type="checkbox" value="" id="toDelivery" />
                <label className="form-check-label mb-4" htmlFor="toDelivery">
                  Desejo para entrega (Taxa: R$2,00)
                </label>
              </div>
              {/* <TransitionGroup className="todo-list">
                <CSSTransition
                  timeout={500}
                  classNames="form-control"
                > */}
              {toDelivery &&
                <>
                  <div className="form-group">
                    <label htmlFor="address">Endereço:</label>
                    <input type="text" className="form-control" id="address" placeholder="Ex: Rua Verde, 340" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="refference">Ponto de Referência:</label>
                    <input type="text" className="form-control" id="refference" placeholder="Ex: Apto; Altos..." />
                  </div>
                </>
              }
              {/* </CSSTransition>
              </TransitionGroup> */}
              <p>Forma de pagamento:</p>
              <div className="form-check">
                <input className="form-check-input" onClick={() => { SetcashPayment(false) }} type="radio" name="exampleRadios" id="creditCard" value="option1" />
                <label className="form-check-label" htmlFor="creditCard">
                  Cartão (Crédito/Débito)
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" onClick={() => { SetcashPayment(true) }} name="exampleRadios" id="cash" value="option2" />
                <label className="form-check-label" htmlFor="cash">
                  Dinheiro
                </label>
              </div>
              {
                cashPayment &&
                <>
                  <label className="number" htmlFor="rest">Quantia p/ troco:</label>
                  <div className="col-auto">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">R$</div>
                      </div>
                      <input type="number" className="form-control" id="rest" placeholder="Ex: 50,00" />
                    </div>
                  </div>
                </>
              }
            </form>
          </div>
          <FinishBuy>
            <ButtonFinishOrder onClick={() => { checkPaymentMethod() }} className="btn">Finalizar Pedido</ButtonFinishOrder>
          </FinishBuy>
        </div>
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
  padding: 5% 15% 5% 15%;
  background-color: #FA4A0C;
`;

const InfoBuy = styled.div`
  text-align: center;
`;

const FinishBuy = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const ButtonClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
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

  :hover {
    background: #d3cece;
  }
`;