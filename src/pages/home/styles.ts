import styled from "styled-components";

import carosseulToggle from "../../assets/Carrosselcon.svg";
import carosseulToggleGray from "../../assets/CarrosselToggleGray.svg";
import tableIconGray from "../../assets/TableIcon.svg";
import tableIcon from "../../assets/tabbleToggleGray.svg";
import imageImput from "../../assets/imageImput.svg";
import viewImage from "../../assets/olho.svg";
import deleteImage from "../../assets/LixoImg.svg";

interface ICAssorel {
  toggled: boolean;
}

export const Container = styled.div<ICAssorel>`
  display: flex;
  align-items: center;
  flex-direction: column;
  

  header {
    margin: 1%;
    align-self: end;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  header button {
    width: 280px;
    height: 63px;
    padding: 20px;
    font-weight: 700;

    background-color: #c7c7c7;
    color: #7d7d7d;

    border-radius: 5px;
    margin: 12px 0 10px;
    border: none;

    cursor: pointer;
    transition: 0.5s;

    font-size: 16px;
  }
  button:hover {
    background-color: #f63f60;
    color: #fff;
  }
  .Carousel {
    display: ${({ toggled })=> toggled ? "flex" : "none"};
  }
  .AddImages{
    display: ${({ toggled })=> !toggled ? "block" : "none"};
  }
  .tabelaImagens{
    display: ${({ toggled })=> !toggled ? "block" : "none"};
  }
  .Buttons {
    flex-direction: row;
  }
  .ImgButton1 {
    height: 50px;
    width: 75px;
    background-color: #c7c7c7;
    padding: 24px;
    border-radius: 0;
    border: 1px #7d7d7d;
    border-style: solid;
    background-image: url(${carosseulToggleGray});
    background-repeat: no-repeat;
    background-position: center;
    transition: none;
  }
  .ImgButton1:disabled {
    transition: none;
    transform: none;
    background-color: #fff;
    background-image: url(${carosseulToggle});
  }

  .ImgButton1:hover:enabled {
    background-color: #c7c7c7;
  }
  .ImgButton2 {
    height: 50px;
    width: 75px;
    background-color: #c7c7c7;
    padding: 24px;
    border-radius: 0;
    border: 1px #7d7d7d;
    border-style: solid;
    background-image: url(${tableIconGray});
    background-repeat: no-repeat;
    background-position: center;
    transition: none;
  }
  .ImgButton2:disabled {
    background-color: #fff;
    background-image: url(${tableIcon});
  }
  .ImgButton2:hover:enabled {
    background-color: #c7c7c7;
  }
  .AddImages {
    height: 63px;
    width: 280px;
    padding: 20px;
    font-weight: 700;

    background-color: #008ffb;
    color: #fff;

    border-radius: 5px;
    margin: 12px 0 10px;
    border: none;

    cursor: pointer;
    transition: 0.5s;

    font-size: 16px;
  }
  .AddImages:hover {
    background-color: #007ddc;
  }
  .Botaoooo{
    background-color: #f63f60;
    width: 25px;
    height: 25px;
    border-radius: 3px;

  }

  .ViewImage {
    background-color: #007ddc;
    background-image: url(${viewImage});
    background-repeat: no-repeat;
    background-position: center;
    width: 25px;
    height: 25px;
    border-radius: 3px;
    margin-right: 5px;
  }
  .ViewImage:hover{
    background-color: #007ddc;
  }
  .DeleteImage {
    background-color: #f63f60;
    background-image: url(${deleteImage});
    background-repeat: no-repeat;
    background-position: center;
    width: 25px;
    height: 25px;
    border-radius: 3px;
  }

  h1{
    font-weight: 700;
    font-family: "Montserrat", sans-serif;
    font-size: x-large;
  }
`;

export const Box = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;


.ModalButton {
    height: 57px;
    width: 179px;
    padding: 14px 34px;
    font-weight: 700;

    background-color: #008FFB;
    color: #FFF;

    border-radius: 3px;
    margin: 12px 0 10px;
    border: none;

    cursor: pointer;
    transition: 0.5s;
    align-items: center;
    font-size: 16px;
}
.ModalButton:hover{
    background-color: #0078D7;
}
.ModalButton:last-of-type{
    background-color: #7D7D7D;
}
.ModalButton:last-of-type:hover{
    background-color: #F63F60;
    color: #FFF;
}
.buttonsModal{
    margin-top: 1%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    
}
.fieldImage {
    background-image: url(${imageImput});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 15%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 2px dashed #1475cf;
    height: 200px;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;

}
.UploadedRow{
    width: auto;
    margin: 10px 0;
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-radius: 5px;
    background-color: #e9f0ff;
}
.UploadedContent{
    display: flex;
    align-items: center;
}
`;
