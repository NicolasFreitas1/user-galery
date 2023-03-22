import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    header {
        margin: 1%;
        align-self: end;
        display: flex;
        flex-direction: column;
    }

    header button {
        height: 63;
        padding: 24px;
        font-weight: 700;

        background-color: #C7C7C7;
        color: #7D7D7D;

        border-radius: 5px;
        margin: 12px 0 30px;
        border: none;

        cursor: pointer;
        transition: 0.5s;

        font-size: 16px;
    }
    button:hover{
        background-color: #F63F60;
        color: #FFF;
    }
`;
