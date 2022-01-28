import React from 'react';
import { Button } from './styles';

export type ActionButtonProps = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  type: any;
  danger?: boolean;
  text: string;
  handleClick: () => void;
};

export const ActionButton = ({
  type, // type - primary/secondary
  danger = false, // danger - true/false
  text,
  handleClick,
}: ActionButtonProps) => (
  <Button onClick={handleClick} type={type} danger={danger}>
    {text}
  </Button>
);
