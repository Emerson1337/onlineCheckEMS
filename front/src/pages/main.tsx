import React from 'react';
import './main.css';

//images
import pizza from './../assets/pizza-1.png';
import phoneInstagram from './../assets/phoneInstagram.jpeg';


export default function Main() {
  return (
    <>
      <section id="banner">
        <p className="slogan"><strong>Pizzaria mundo do sabor.</strong></p>
        <h1 className="invite">Faça o seu pedido online!</h1>
        <p className="explain">Clique em fazer pedido e escolha seus deliciosos produtos.</p>

        <button className="order btn btn-outline-light" type="button">Fazer Pedido 🛒 </button>
      </section>

      <hr id="divisionLine" className="division"></hr>

      <section id="aboutUsSection" className="customContainer">
        <h1 className="titleSectionAbout">Quem somos?</h1>
        <div id="aboutUs">
          <div className="textAbout">
            <p className="titleAbout">Somos a Pizzaria sabor do mundo</p>
            <h1 className="h1About">
              Aqui nós fazemos as melhores pizzas da cidade!
            </h1>
            <p className="comment">Super recomendado por quem provou ':)'</p>
          </div>
          <div>
            <img className="pizzaImage" src={pizza} alt="" />
          </div>
        </div>
      </section>

      <section id="contactUsSection" className="customContainer">
        <div id="contactUs">

          <div>
            <img className="imagePhone" src={phoneInstagram} alt="pizza" />
          </div>
          <div className="textContact">
            <p className="titleContact">Instagram</p>
            <h1 className="h1Contact">
              Siga-nos no instagram para
              acompanhar todas as nossas atualizações!
            </h1>
            <p className="caption">Basta clicar no celular. Ou, <a className="orangeColor" href="#">clique aqui</a>.</p>
          </div>
        </div>
      </section>
    </>
  )
}