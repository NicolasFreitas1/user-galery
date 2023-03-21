import React from 'react';
import styled from 'styled-components';

import left from "../../assets/left.svg"



export const Container = styled.div` 
    display: flex;
    align-items: center;
    flex-direction: column;

    button {
        height: 63;
        padding: 24px;
        font-weight: 700;

        background-color: #008FFB;
        color: #fff;

        border-radius: 5px;
        margin: 12px 0 84px;
        border: none;

        cursor: pointer;
        transition: filter 0.5s;

        font-size: 16px;

    }
    bottom:hover {
    
    };
    fieldset {
        padding: 24px;
        margin-left: 25%;    
        margin-top: 30%;
        border: none;
        flex-direction: column;
        display: flex;
    };
    legend {
        font-size: 32px;
        font-weight: 700;
    };
    input{
        height: 48px;
        width: 392px;
        padding: 24px;
        font-weight: 700;

        background: #E6E6E6;
        border-radius: 5px;
        border: none;
        margin-bottom: 5%;
        font-size: 16px;
    }
    .Text {
        margin-left: 20%;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;

        -webkit-font-smoothing: antialiased;
    };
    .DivImg {
        height: 100%;
        width: 60%;
        background-image: url(${left});   
        background-size: cover;

    };
    .Geral{
        display: flex;
        width:100vw;
        height: 100vh;
    }

`
  



