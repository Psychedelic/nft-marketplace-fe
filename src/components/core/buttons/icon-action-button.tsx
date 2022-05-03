import React from 'react';
import { IconButtonStyles } from './styles';

export type IconActionButtonProps = {
  children?: React.ReactNode;
  handleClick: () => void;
};

/* --------------------------------------------------------------------------
 * Icon Action Button Component
 * --------------------------------------------------------------------------*/

export const IconActionButton = ({
  children,
  handleClick,
}: IconActionButtonProps) => (
  <IconButtonStyles onClick={handleClick}>
    {children}
  </IconButtonStyles>
);
