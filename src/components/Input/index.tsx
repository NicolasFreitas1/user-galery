import React from "react";
import { InputText } from './styles'

interface Props {
    placeholder?: string;
    type?: string;
    children?: React.ReactNode;
    onChange: (str: string) => void;
    required?: boolean;
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
        required
    >
        {children}
    </InputText>
  );
}

export default Input;