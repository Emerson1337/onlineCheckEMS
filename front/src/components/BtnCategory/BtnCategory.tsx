/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import styled from 'styled-components';

interface CategoryProps {
  category: string;
}

export default function BtnCategory({ category }: CategoryProps) {
  return (
    <>
      <Button className="btn">{category}</Button>
    </>
  )
}

const Button = styled.button`
  font-size: 14px;
  margin: 5px;
  padding: 5px 20px;
  color: #fff;
  font-weight: bold;
  background: #FA4A0C;
  border-radius: 50px;
  
  :hover{
    background: #af360a;
  }
`;