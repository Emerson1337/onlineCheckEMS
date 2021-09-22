/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import logo from '../../assets/logo.png';

import { VscThreeBars } from 'react-icons/vsc';
import styled from 'styled-components';

interface navbarProps {
  colorNav: boolean;
}
function Navbar({ colorNav }: navbarProps) {
  useEffect(() => {
    if (window.location.pathname === '/check') {
      $(`#navbarNav`).find('a.orangeColor').addClass('defaultColorLink');
      $(`#navbarNav`).find('a.orangeColor').removeClass('orangeColor');
      $('#check').addClass('orangeColor');
      $('#check').removeClass('defaultColorLink');

      $('#home').attr('href', '/');

    } else {
      const scrollListener = () => {

        if (window.scrollY >= 0 && window.scrollY < 500) {
          $(`#navbarNav`).find('a.orangeColor').addClass('defaultColorLink');
          $(`#navbarNav`).find('a.orangeColor').removeClass('orangeColor');
          $('#home').addClass('orangeColor');
          $('#home').removeClass('defaultColorLink');

        }
        if (window.scrollY >= 500 && window.scrollY < 1230) {
          $(`#navbarNav`).find('a.orangeColor').addClass('defaultColorLink');
          $(`#navbarNav`).find('a.orangeColor').removeClass('orangeColor');
          $('#about').addClass('orangeColor');
          $('#about').removeClass('defaultColorLink');
        }
        if (window.scrollY >= 1230) {
          $(`#navbarNav`).find('a.orangeColor').addClass('defaultColorLink');
          $(`#navbarNav`).find('a.orangeColor').removeClass('orangeColor');
          $('#contact').addClass('orangeColor');
          $('#contact').removeClass('defaultColorLink');
        }
      }

      window.addEventListener('scroll', scrollListener);
      return () => {
        window.removeEventListener('scroll', scrollListener);
      }
    }
  });

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
      <Top id="top"></Top>
      <Navigation id="navbarTop" className="navbar fixed-top navbar-expand-lg">
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
            {
              !(window.location.pathname === '/check') ?
                <>
                  <li className={colorNav ? "nav-item" : "nav-item customMargin"}>
                    <a id="about" onClick={() => activeItem('about')} className="weightFontBold nav-link defaultColorLink" href="#divisionLine">Sobre</a>
                  </li>
                  <li className={colorNav ? "nav-item" : "nav-item customMargin"}>
                    <a id="contact" onClick={() => activeItem('contact')} className="weightFontBold nav-link defaultColorLink" href="#contactUs">Contato</a>
                  </li>
                </>
                :
                ''
            }
            <li className={colorNav ? "nav-item" : "nav-item customMargin"}>
              <a id="check" onClick={() => activeItem('check')} className="weightFontBold nav-link defaultColorLink" href="/check">Cardápio</a>
            </li>
          </ul>
        </div>
      </Navigation>
    </>
  )
}

const Navigation = styled.div`
  background: #F7F7F7;
  .customMargin {
    transition: all ease .2s !important;
    margin: 10px;
  }
  .hidden {
    display: none;
    transition: all ease .2s !important;
  }
  .itemsNav {
    transition: all ease .2s !important;
    margin: 0 auto !important;
  }
  .weightFontBold {
    font-weight: bold;
  }

  .orangeColor {
    color: #FA4A0C;
    transition: all ease .2s;
    border-bottom: 2px solid #FA4A0C;
  }

  nav .orangeColor {
    color: #FA4A0C;
    border-bottom: 2px solid #FA4A0C;
    transition: all ease .2s;
  }
  .orangeColor:hover {
    color: #a03007;
  }
  .defaultColorLink {
    color: #252B42;
  }
  .defaultColorLink:hover {
    color: #4e5161;
    transition: all ease .2s;
  }
`;

const Top = styled.div`
    margin-bottom: 108px;
`;

export default Navbar;