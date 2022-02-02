import React from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in/lib/FadeIn';
import ReactLoading from "react-loading";


export default function ThankYouModal() {
    return (
        <>
            <UIModalOverlay>
                <FadeIn>
                    <InfoBuy>
                        <h1><strong>Obrigado por comprar conosco!</strong></h1>
                        <div id="transition-modal-description">
                            <h3>Abraços e até a próxima, 😊</h3>
                        </div>
                        <ReactLoading type={'cylon'} color={'#FA4A0C'} />
                    </InfoBuy>
                </FadeIn>
            </UIModalOverlay >
        </>
    );
};

const UIModalOverlay = styled.div`
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: #252B42;
    padding: 2% 25% 5% 25%;
    background-color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
        border - radius: 20px;
    }

    #inputRest {
        width: 40%;
    }

    .switch {
        margin - bottom: 10px;
        padding-left: 0;
    }

    .input-group-text {
        border - radius: 20px 0 0 20px !important;
    }

    #notCashRest {
        margin - top: 10px;
        text-align: center;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    #cashRest {
        display: flex;
        margin-top: 10px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #buttonToClose {
        display: flex;
        align-items: center;
        justify-content: right;
    }

    @media(max-width: 768px){
        padding: 5% 15% 5% 15%;

    #inputRest {
        width: 70%;
    }
}
`;

const InfoBuy = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    #transition-modal-description p{
        line-height: 1rem;
    }

    h1 {
        color: #252B42;
    }

    h2 {
        color: #737373;
    }

    h2 {
        font-size: 2rem;
        margin: 10% 5% 5% 5%;
    }

    @media(max-width: 768px){
        h2 {
        font-size: 1rem;
        }
    }
`;
