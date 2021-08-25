/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from '../../assets/logo.png';
import './styles/Navbar.css';

import { VscThreeBars } from 'react-icons/vsc';


interface navbarProps {
  colorNav: boolean;
}

function Navbar({ colorNav }: navbarProps) {

  function activeItem(route: string) {
    if ($(`#navbarNav`).find('a.orangeColor')) {
      $(`#navbarNav`).find('a.orangeColor').addClass('defaultColorLink');
      $(`#navbarNav`).find('a.orangeColor').removeClass('orangeColor');
    }
    $(`#${route}`).addClass('orangeColor');
    $(`#${route}`).removeClass('defaultColorLink');
  }

  return (
    <>
      <div id="top"></div>
      <nav id="navbarTop" className="navbar fixed-top navbar-expand-lg">
        <a className={colorNav ? "navbar-brand hidden" : "navbar-brand"} onClick={() => activeItem('home')} href="/">
          <img src={logo} width="150" height="80" className="ml-4 d-inline-block align-top" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <VscThreeBars />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className={colorNav ? "navbar-nav ml-auto itemsNav" : "navbar-nav customMargin ml-auto"}>
            <li className={colorNav ? "nav-item" : "nav-item customMargin"}>
              <a id="home" onClick={() => activeItem('home')} className="weightFontBold orangeColor nav-link" href="#">Home</a>
            </li>
            <li className={colorNav ? "nav-item" : "nav-item customMargin"}>
              <a id="check" onClick={() => activeItem('check')} className="weightFontBold nav-link defaultColorLink" href="#">Cardápio</a>
            </li>
            <li className={colorNav ? "nav-item" : "nav-item customMargin"}>
              <a id="about" onClick={() => activeItem('about')} className="weightFontBold nav-link defaultColorLink" href="#divisionLine">Sobre</a>
            </li>
            <li className={colorNav ? "nav-item" : "nav-item customMargin"}>
              <a id="contact" onClick={() => activeItem('contact')} className="weightFontBold nav-link defaultColorLink" href="#contactUs">Contato</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}


export default Navbar;