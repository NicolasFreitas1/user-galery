import styled from 'styled-components';

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

        background-color: #C7C7C7;
        color: #7D7D7D;

        border-radius: 5px;
        margin: 12px 0 10px;
        border: none;

        cursor: pointer;
        transition: 0.5s;

        font-size: 16px;
    }
    button:hover{
        background-color: #F63F60;
        color: #FFF;
    };
    .buttons {
        flex-direction: row;
    }
    .ImgButton {
        height: 50px;
        width: 75px;
        background-color: #C7C7C7;
        padding: 24px;
        border-radius: 0;
        border: 1px #7D7D7D;
        border-style: solid;
        background-image: url(${tableIcon});
        background-repeat: no-repeat;
        background-position: center;
        
    }
    .ImgButton:disabled {
        background-color: #FFF;
    }
    .ImgButton:first-of-type {
        background-image: url(${carosseulToggle});
    }
    .ImgButton:hover:enabled{
        background-color: #C7C7C7;
    }
    .AddImages {
        height: 63px;
        width: 280px;
        padding: 20px;
        font-weight: 700;

        background-color: #008FFB;
        color: #FFF;

        border-radius: 5px;
        margin: 12px 0 10px;
        border: none;

        cursor: pointer;
        transition: 0.5s;

        font-size: 16px;
    }
    .AddImages:hover{
        background-color: #007DDC;
    }




`;



