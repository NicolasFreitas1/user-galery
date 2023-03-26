import React from "react";
import styled from "styled-components";

import left from "../../assets/left.svg";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  fieldset {
    padding: 24px;
    margin-left: 25%;
    margin-top: 30%;
    border: none;
    flex-direction: column;
    display: flex;
  }
  legend {
    font-size: 32px;
    font-weight: 700;
  }

  p {
    align-self: center;
    color: red;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    padding-bottom: 12px;
    -webkit-font-smoothing: antialiased;
  }
  .Text {
    color: #202020;
    align-self: center;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    font-family: "Roboto", sans-serif;

    -webkit-font-smoothing: antialiased;
    transition: 0.5s;
  }

  .Text:hover {
    color: #551a8b;
  }
  .DivImg {
    height: 100%;
    width: 60%;
    background-image: url(${left});
    background-size: cover;
  }
  .Geral {
    display: flex;
    width: 100vw;
    height: 100vh;
  }
`;
