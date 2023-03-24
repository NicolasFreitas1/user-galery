
import React from "react";
import { Button } from './styles'

interface Props {
    children?: React.ReactNode;
    onClick: () => void;
}

const ButtonSend: React.FC<Props> = ({ 
    children,
    onClick, 

  }) => { 
  return (
    <Button 
      onClick={onClick}
    >
        {children}
    </Button>
  );
}

export default ButtonSend;