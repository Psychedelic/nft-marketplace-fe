import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { StyledContent, StyledArrow } from './styles';

/* --------------------------------------------------------------------------
 * Tooltip Component
 * --------------------------------------------------------------------------*/

export type TooltipProps = {
  children?: React.ReactNode;
  text?: string;
};

export const Tooltip = ({ children, text }: TooltipProps) => (
  <TooltipPrimitive.Root>
    <TooltipPrimitive.Trigger asChild>
      <div>{children}</div>
    </TooltipPrimitive.Trigger>
    <StyledContent sideOffset={5}>
      {text}
      <StyledArrow />
    </StyledContent>
  </TooltipPrimitive.Root>
);
