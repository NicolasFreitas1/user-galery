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
        margin: 12px 0 50px;
        border: none;

        cursor: pointer;
        transition: filter 0.5s;

        font-size: 16px;

    }
    button:hover {
        background-color: #007DDC;
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
    p{
        align-self: center;
        color: red;
        font-size: 16px;
        font-weight: 700;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        padding-bottom: 12px;
        -webkit-font-smoothing: antialiased;
    }
    .Text {
        color: #202020;
        align-self: center;
        font-size: 16px;
        font-weight: 700;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;

        -webkit-font-smoothing: antialiased;
        transition: 0.5s;
    };
    .Text:hover{
        color: #551A8B;
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
  



