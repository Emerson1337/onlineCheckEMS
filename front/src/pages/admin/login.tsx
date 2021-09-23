import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';

export default function Login() {

  return (
    <Container>
      <Form>
        <img src={logo} alt="Airbnb logo" />
        {/* {this.state.error && <p>{this.state.error}</p>} */}
        <input
          type="email"
          placeholder="Endereço de e-mail"
        />
        <input
          type="password"
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  width: 400px;
  height: 380px;
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