/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from './styles';

export type ActionButtonProps = {
  onClick?: () => void;
  type: any;
  danger?: boolean;
  size?: any;
  text: string;
  disabled?: boolean;
  handleClick: () => void;
};

export const ActionButton = ({
  type, // type - primary/secondary/outline
  size, // size - small/default
  danger = false, // danger - true/false
  text,
  disabled = false,
  handleClick,
}: ActionButtonProps) => (
  <Button
    onClick={handleClick}
    type={type}
    size={size}
    danger={danger}
    disabled={disabled}
  >
    {text}
  </Button>
);
