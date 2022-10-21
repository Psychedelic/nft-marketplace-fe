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
};

export const Tooltip = ({ children, text }: TooltipProps) => {
  const [, themeObject] = useTheme();

  const handleTooltipOpen = (status: boolean) => {
    const applicationBody = document.querySelector('body');

    if (!applicationBody) return;

    if (status) {
      applicationBody?.classList.add('tooltip-open');

      return;
    }

    if (applicationBody?.classList.contains('tooltip-open')) {
      applicationBody?.classList.remove('tooltip-open');
    }
  };

  return (
    <TooltipPrimitive.Root
      delayDuration={300}
      onOpenChange={handleTooltipOpen}
    >
      <TooltipPrimitive.Trigger asChild>
        <div>{children}</div>
      </TooltipPrimitive.Trigger>
      {text && (
        <StyledContent sideOffset={5} className={themeObject}>
          {text}
          <StyledArrow />
        </StyledContent>
      )}
    </TooltipPrimitive.Root>
  );
};
