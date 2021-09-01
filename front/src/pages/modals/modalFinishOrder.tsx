import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { FiShoppingCart } from "react-icons/fi";
import styled from "styled-components";

import { IoClose } from 'react-icons/io5'

const useStyles = makeStyles((theme: { palette: { background: { paper: any; }; }; shadows: any[]; spacing: (arg0: number, arg1: number, arg2: number) => any; }) => ({
  modal: {
    overflowY: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    color: "#fff",
    width: "100%",
    paddingTop: "20%",
    height: "auto",
    backgroundColor: '#FA4A0C',
    border: "2px solid #FA4A0C",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalDiv>
      <ButtonOpenModal className="btn" type="button" onClick={handleOpen}>
        <FiShoppingCart />
      </ButtonOpenModal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <button className="btn" type="button" onClick={handleClose}>
              <IoClose size={32} />
            </button>
            <h5 id="transition-modal-title">Finalizando Pedidos</h5>
            <h1>Valor Total:</h1>
            <h1>R$ 58,60</h1>
            <div id="transition-modal-description">
              <p>Pedidos:</p>
              <p>Pizza Chocolate, qtd: 1: R$ 20,50</p>
              <p>Pizza Calabresa, qtd: 1: R$ 22,90</p>
            </div>
            <div className="formClient">
              <h2>Preencha as informações para finalizar o pedido.</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nome:</label>
                  <input type="text" className="form-control" id="name" placeholder="Ex: João Paulo" />
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="toDelivery" />
                  <label className="form-check-label" htmlFor="toDelivery">
                    Desejo para entrega (Taxa: R$2,00)
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Endereço:</label>
                  <input type="text" className="form-control" id="address" placeholder="Ex: Rua Verde, 340" />
                </div>
                <div className="form-group">
                  <label htmlFor="refference">Ponto de Referência:</label>
                  <input type="text" className="form-control" id="refference" placeholder="Ex: Apto; Altos..." />
                </div>
                <p>Forma de pagamento:</p>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="creditCard" value="option1" />
                  <label className="form-check-label" htmlFor="creditCard">
                    Cartão (Crédito/Débito)
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="cash" value="option2" />
                  <label className="form-check-label" htmlFor="cash">
                    Dinheiro
                  </label>
                </div>
                <div className="col-auto">
                  <label className="sr-only" htmlFor="rest">Quantia p/ troco:</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">R$</div>
                    </div>
                    <input type="number" className="form-control" id="rest" placeholder="Ex: 50,00" />
                  </div>
                </div>
              </form>
            </div>
            <ButtonFinishOrder className="btn">Finalizar Pedido</ButtonFinishOrder>
          </div>
        </Fade>
      </Modal>
    </ModalDiv >
  );
}

const ModalDiv = styled.div`
  overflow-y: visible;
  .teste {
    color: #fff;
  }
`;

const ButtonFinishOrder = styled.button`
  background: #fff;
  border-radius: 20px;
  color: #FA4A0C;
  font-weight: bold;
  font-size: 18px;
`;

const ButtonOpenModal = styled.button`
      background: #FF4200;
      transition: all ease .2s;
      width: 50px;
      height: 50px;
      font-size: 24px;
      border-radius: 50%;
      padding: 10px;

      color: #fff;
      :hover {
        background: #af360a;
  }
`;