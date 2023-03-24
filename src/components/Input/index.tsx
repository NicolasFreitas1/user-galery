import React from "react";
import { InputText } from './styles'

interface Props {
    placeholder?: string;
    type?: string;
    children?: React.ReactNode;
    onChange: (str: string) => void;
}

const Input: React.FC<Props> = ({ 
    placeholder,
    type,
    children,
    onChange, 

  }) => { 
  return (
    <InputText 
        placeholder={placeholder}
        type={type}
        onChange={e => onChange(e.target.value)}
    >
        {children}
    </InputText>
  );
}

export default Input;