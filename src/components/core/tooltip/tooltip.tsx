import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { StyledContent, StyledArrow } from './styles';
import { useTheme } from '../../../hooks';

/* --------------------------------------------------------------------------
 * Tooltip Component
 * --------------------------------------------------------------------------*/

export type TooltipProps = {
  children?: React.ReactNode;
  text?: string;
  width?: number;
  type?: string;
};

export const Tooltip = ({ children, text, width, type }: TooltipProps) => {
  const [, themeObject] = useTheme();

  return (
    <TooltipPrimitive.Root delayDuration={300}>
      <TooltipPrimitive.Trigger asChild>
        <div>{children}</div>
      </TooltipPrimitive.Trigger>
      {text && (
        <StyledContent
          sideOffset={5}
          className={themeObject}
          style={{
            width: `${width}px`,
          }}
          type={type === "traits" ? "traits" : undefined}
        >
          {text}
          <StyledArrow />
        </StyledContent>
      )}
    </TooltipPrimitive.Root>
  );
};
