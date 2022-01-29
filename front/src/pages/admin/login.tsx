import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import { Alert } from 'antd';

export default function Login() {

  const [hasError, setHasError] = useState(false);
  const [messageError, setMessageError] = useState([]);

  function login() {
    const email = $('#email').val();
    const password = $('#password').val();

    api.post('/api/login', { email, password }).then((response) => {
      setHasError(false);
      localStorage.setItem('Authorization', `${response.data}`);
      localStorage.setItem("gui", "1");
      window.location.href = "/dashboard";
    }).catch((error) => {
      try {
        setMessageError(error.response.data);
        setHasError(true);
      } catch (e) {
        setMessageError([]);
        setHasError(true);
      }
    })
  }

  const onEnter = (event: any) => {
    return event.key === 'Enter' ? login() : '';
  }

  return (
    <Container>
      <Form>
        <img src={logo} alt="Airbnb logo" />
        <Errors>
          {
            hasError ? <Alert message={messageError} type="error" showIcon /> : null
          }
        </Errors>
        <input
          onKeyDown={(event) => onEnter(event)}
          id="email"
          type="email"
          placeholder="Endereço de e-mail"
        />
        <input
          onKeyDown={(event) => onEnter(event)}
          id="password"
          type="password"
          placeholder="Senha"
        />
        <button onClick={() => login()} type="button">Entrar</button>
      </Form>
    </Container>
  );
}

export const Errors = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  height: 20px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

export const Form = styled.form`
  width: 400px;
  height: 450px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 200px;
    margin: 10px 0 40px;
  }
  p {
    color: #FA4A0C;
    margin-bottom: 15px;
    border: 1px solid #FA4A0C;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #FA4A0C;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;