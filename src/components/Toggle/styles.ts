import styled from 'styled-components';

export const ToggleSwitch = styled.div`

  position: relative;
  width: 75px;
  display: inline-block;
  vertical-align: middle;
  user-select: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  text-align: left;

  input {
    display: none;
  }
  label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 0 solid #bbb;
    border-radius: 20px;
    margin: 0;
  };
  inner{
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
    :before, 
    :after{
        display: block;
        width: 200%;
        margin-left: -100%;
        transition: margin 0.3s ease-in 0s;
    }
    :before{
        display: block;
        width: 200%;
        margin-left: -100%;
        transition: margin 0.3s ease-in 0s;
    }
  }
    disabled {
        background-color: #ddd;
        cursor: not-allowed;
        :before {
            background-color: #ddd;
            cursor: not-allowed;
        }
  }
  inner:after{
    content: "No";
    text-transform: uppercase;
    padding-right: 10px;
    background-color: #bbb;
    color: #fff;
    text-align: right;
  }
  switch{
    display: block;
    width: 24px;
    margin: 5px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    border: 0 solid #bbb;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }
  checkbox:checkbox label{
    .toggle-switch-inner {
      margin-left: 0;
    }
    .toggle-switch-switch {
      right: 0px;
    }
  }
  
`;
