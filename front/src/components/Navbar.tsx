/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from '../assets/logo.png';
import '../components/styles/Navbar.css';

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={logo} width="100" height="60" className="d-inline-block align-top" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-4">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}


export default Navbar;