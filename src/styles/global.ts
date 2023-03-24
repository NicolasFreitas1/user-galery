import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input,
button,
p {
  font-size: 16px;
  font-family: "Montserrat", sans-serif;

  -webkit-font-smoothing: antialiased;
}
a {
  text-decoration: none;
}

.react-modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;

  background: rgba(0, 0, 0, 0.75);
}

.react-modal-close {
  right: 1.5rem;
  top: 1.5rem;
  position: absolute;

  border: 0;
  background: transparent;

  transition: filter 0.2s;

  /* &:hover {
    filter: brightness(0.8);
  } */
}

.react-modal-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 2rem;
    width: 50rem;
    height: 35rem;
    background: white;
    border-radius: 0.5rem;
    }

`;
export default GlobalStyle;
