/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from './styles';

export type ActionButtonProps = {
  background?: string;
  outline?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type: any;
  danger?: boolean;
  size?: any;
  text: string;
  handleClick: () => void;
};

export const ActionButton = ({
  type, // type - primary/secondary/outline
  size, // size - small/default
  danger = false, // danger - true/false
  text,
  handleClick,
}: ActionButtonProps) => (
  <Button
    onClick={handleClick}
    type={type}
    size={size}
    danger={danger}
  >
    {text}
  </Button>
);
