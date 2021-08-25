/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import './styles/Footer.css'

import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

import logo from '../../assets/logo.png'

function Footer() {
  return (
    <>
      <footer className="container">
        <div className="logoFooter">
          <img src={logo} alt="logo" />
        </div>
        <div className="socialMediaFooter">
          <a href="#"><AiFillInstagram className="iconInsta" /></a>
          <a href="#"><FaFacebookSquare className="iconFace" /></a>
          <a href="#"><IoLogoWhatsapp className="iconWhats" /></a>
        </div>
        <div className="copyright"><p>Developed by <a href="https://github.com/emerson1337" className="orangeColor strongLink">EMSCheck</a>.</p></div>
      </footer>
    </>
  )

}

export default Footer;