import React from 'react';
import styled from 'styled-components';

export default function FinishOrderModal({ children }: any) {
  return (
    <UIModalOverlay>
      <div className="ui-modal">
        <button type="button">X</button>
        {children}
      </div>
    </UIModalOverlay>
  );
};


const UIModalOverlay = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;