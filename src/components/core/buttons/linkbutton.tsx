import React from 'react';
import { Button } from './styles';

export type LinkButtonProps = {
  background?;
  outline?;
  text?;
  children?: React.ReactNode;
  onClick: () => void;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  background,
  outline,
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
