/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

import logo from '../../assets/logo.png'

function Footer() {

  return (
    <>
      <FooterStyle className="container">
        <DIVlogoFooter className="logoFooter">
          <img src={logo} alt="logo" />
        </DIVlogoFooter>
        <div className="socialMediaFooter">
          <a href="#"><AiFillInstagram className="iconInsta" /></a>
          <a href="#"><FaFacebookSquare className="iconFace" /></a>
          <a href="#"><IoLogoWhatsapp className="iconWhats" /></a>
        </div>
        <div className="copyright"><p>Developed by <a href="https://github.com/emerson1337" target="_blank" rel="github" className="orangeColor strongLink">EMSCheck</a>.</p></div>
      </FooterStyle>
    </>
  )
}

const FooterStyle = styled.footer`
    display: flex;
    justify-content: space;
    align-items: center;

    .orangeColor {
      color: #FA4A0C;
    }

    .socialMediaFooter, .logoFooter,
    .copyright {
      width: 33%;
      text-align: center;
    }
    
    .iconInsta, .iconFace, .iconWhats {
      margin: 0 10px;
      color: #FA4A0C;
      transition: all ease .2s;
    }
    .iconInsta:hover, .iconFace:hover, .iconWhats:hover {
      color: #a03007;
    }
    .socialMediaFooter {
      padding: 0 40px;
      font-size: 2rem;
    }
    .strongLink {
      font-weight: bold;
    }
    .copyright {
      font-size: 14px;
    }

    @media(max-width: 768px){
        display: none;
        flex-direction: column;
    }
  `;

const DIVlogoFooter = styled.div`
    img {
      width: 40%;
      margin-bottom: 20px;
    }

    @media(max-width: 768px){
      .logoFooter {
        display: none;
      }
  }
`;

export default Footer;