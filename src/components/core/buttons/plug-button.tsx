import React from 'react';
import { PlugButtonContainer, PlugButtonText } from './styles';

export type PlugButtonProps = {
  handleClick: () => void;
  text: string;
};

/* --------------------------------------------------------------------------
 * Plug Button Component
 * --------------------------------------------------------------------------*/

export const PlugButton = ({
  handleClick,
  text,
}: PlugButtonProps) => (
  <PlugButtonContainer onClick={handleClick} className="plug-button">
    <PlugButtonText>{text}</PlugButtonText>
  </PlugButtonContainer>
);
