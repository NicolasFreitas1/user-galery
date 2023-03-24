import styled from "styled-components";

import carosseulToggle from "../../assets/Carrosselcon.svg";
import tableIcon from "../../assets/TableIcon.svg";

export const Container = styled.div`
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
  .buttons {
    flex-direction: row;
  }
  .ImgButton {
    height: 50px;
    width: 75px;
    background-color: #c7c7c7;
    padding: 24px;
    border-radius: 0;
    border: 1px #7d7d7d;
    border-style: solid;
    background-image: url(${tableIcon});
    background-repeat: no-repeat;
    background-position: center;
  }
  .ImgButton:disabled {
    background-color: #fff;
  }
  .ImgButton:first-of-type {
    background-image: url(${carosseulToggle});
  }
  .ImgButton:hover:enabled {
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
`;

export const Teste = styled.div`
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
.ButtonsModal{
    margin-top: 1%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    
}
.fieldImage {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 2px dashed #1475cf;
    height: 65%;
    width: 450px;
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
