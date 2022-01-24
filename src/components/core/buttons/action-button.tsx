import React from 'react';
import { Button } from './styles';

export type ActionButtonProps = {
  background?: string;
  outline?: boolean;
  text?: string;
  children?: React.ReactNode;
  onClick: () => void;
};

export const ActionButton = ({
  background, // background = "filled"
  outline, // outline = "solid"
  text,
  children,
  onClick,
}: ActionButtonProps) => (
  <Button
    onClick={onClick}
    backgroundColor={background}
    outline={outline}
    text={text}
  >
    {children}
  </Button>
);
