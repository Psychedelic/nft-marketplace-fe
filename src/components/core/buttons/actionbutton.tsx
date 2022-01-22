import React from 'react';
import { Button } from './styles';

export type ActionButtonProps = {
  background?;
  outline?;
  text?;
  children?: React.ReactNode;
  onClick: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  background, // background = "filled"
  outline, // outline = "solid"
  text,
  children,
  onClick,
}) => (
  <Button
    onClick={onClick}
    backgroundColor={background}
    outline={outline}
    text={text}
  >
    {children}
  </Button>
);
